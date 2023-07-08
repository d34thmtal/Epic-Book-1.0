import React from "react";

const CommentForm = ({ elementId, onCommentAdded }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState("");
  
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
  
    const handleRatingChange = (event) => {
      setRating(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      const newComment = {
        elementId,
        comment,
        rate: rating,
      };
  
      fetch(`${API_URL}/comments/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      })
        .then((response) => response.json())
        .then((data) => {
          onCommentAdded();
        })
        .catch((error) => console.log(error));
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="comment">Commento:</label>
          <textarea className="form-control" id="comment" value={comment} onChange={handleCommentChange} />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Valutazione:</label>
          <input type="number" className="form-control" id="rating" value={rating} onChange={handleRatingChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Invia
        </button>
      </form>
    );
  };