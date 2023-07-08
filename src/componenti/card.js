import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare, faStar } from '@fortawesome/free-solid-svg-icons'
import "./card.css"

const API_URL = "https://striveschool-api.herokuapp.com/api";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRiZWM2ZDgyMDUyMDAwMTQ4ZDM2OWMiLCJpYXQiOjE2ODI2OTczMjUsImV4cCI6MTY4MzkwNjkyNX0.vi-LKFC6C1KjaDzficFz3ulRFOxPKJKZDfuxr5RNAco";

const Card = ({ imgUrl, title, price, asin, selected, setSelected, resetSelection }) => {

  const handleSelect = () => {
    resetSelection(); 
    setSelected(asin); 
  };

  const cardClass = selected === asin ? "selected" : "unselected";

  return (
    <div
      className={`col-xl-3 col-md-6 d-flex align-items-stretch mb-5 card ${cardClass}`}
      onClick={handleSelect}
    >
      <img className="card-img-top" src={imgUrl} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{price}</p>
        <p className="card-text">ASIN: {asin}</p>

      </div>
      {selected === asin && <CommentArea elementId={asin} />}
    </div>
  );
};

const CommentArea = (props) => {
  const [comments, setComments] = React.useState([]);
  const [review, setReview] = React.useState("");
  const [rating, setRating] = React.useState("");

  React.useEffect(() => {
    fetch(`${API_URL}/comments/${props.elementId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [props.elementId]);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      elementId: props.elementId,
      comment: review,
      rate: rating,
    };
    fetch(`${API_URL}/comments/`, {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setComments([...comments, data]);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (commentId) => {
    fetch(`${API_URL}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setComments(comments.filter((comment) => comment._id !== commentId));
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = (comment) => {
    fetch(`${API_URL}/comments/${comment._id}`, {
      method: "PUT",
      body: JSON.stringify(comment),
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const index = comments.findIndex((c) => c._id === data._id);
        const newComments = [...comments];
        newComments[index] = data;
        setComments(newComments);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Commenti</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <SingleComment
              comment={comment}
              key={comment._id}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </tbody>
      </table>
      <h5>Inserisci il tuo commento</h5>
      <form onSubmit={handleSubmit} className="form_submit">
        <div className="input_container">
          <div className="input_section">
            <label>
              <FontAwesomeIcon icon={faPenToSquare} />
            </label>
            <input
              type="text"
              name="review"
              value={review}
              onChange={handleReviewChange}
            />
          </div>
          <div className="input_section">
            <label>
              <FontAwesomeIcon icon={faStar} />
            </label>
            <input
              type="number"
              name="rating"
              value={rating}
              onChange={handleRatingChange}
            />
          </div>
        </div>
        <input className="modifica" type="submit" value="Inserisci" />
      </form>
    </div>
  );
};

const SingleComment = ({ comment, handleDelete, handleUpdate }) => {
  const [review, setReview] = React.useState(comment.comment);
  const [rating, setRating] = React.useState(comment.rate);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      ...comment,
      comment: review,
      rate: rating,
    };
    handleUpdate(newComment);
  };

  return (
    <tr>
      <td>
        <form className="form_container" onSubmit={handleSubmit}>
          <div className="input_container">
            <div className="input_section">
              <label>
                <FontAwesomeIcon icon={faPenToSquare} />
              </label>
              <input
                type="textarea"
                name="review"
                value={review}
                onChange={handleReviewChange}
              />
            </div>
            <div className="input_section">
              <label>
                <FontAwesomeIcon icon={faStar} />
              </label>
              <input
                type="number"
                name="rating"
                value={rating}
                onChange={handleRatingChange}
              />
            </div>
          </div>
          <input className="modifica" type="submit" value="Modifica" />
        </form>
      </td>
      <td>
        <button
          className="deletebtn"
          onClick={() => handleDelete(comment._id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default Card;