import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
// import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";

const API = `https://striveschool-api.herokuapp.com/api/comments/`;
const AutoApi = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2ZjI0YzMzYjE1MjAwMTQ3NjE3OWEiLCJpYXQiOjE2ODI5NDE1MTcsImV4cCI6MTY4NDE1MTExN30.JCmS6k00h2pNtBy7OJWqblAc9clw-QNEQ-mtv5ayRK8`

function SingleBook(props) {
    const [selected, setSelected] = useState(false);

    function SelectedBook() { 
        setSelected(!selected)
    }
    return (
        <Col xs={12} md={4} lg={3} >
            <Card className={`shadow, my-3 ${selected ? "border border-3 border-danger" : ""}`} id="card-body" >
                <Card.Img className="p-3 h-50"  onClick={SelectedBook} variant="top" src={props.book.img} />
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="p-1 my-5" style={{ minHeight: '6rem', maxHeight: '6rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '6', WebkitBoxOrient: 'vertical' }}>
                        {props.book.title.length > 100
                            ? `${props.book.title.substring(0, 100)}...`
                            : props.book.title}
                        <hr />
                    </Card.Title>
                    <div className="mt-3">
                        <Card.Text className="d-flex justify-content-between mx-5"> <strong>Categoria:</strong> {props.book.category}</Card.Text>
                        <hr />
                        <Card.Text className="d-flex justify-content-between mx-5"> <strong>Id:</strong> {props.book.asin}</Card.Text>
                        <hr />
                        <Card.Text className="mx-5">{selected && <CommentArea elementId={props.book.asin} />}</Card.Text>
                        <hr />
                        <Card.Text id='pricefield'><strong>€ {props.book.price}</strong></Card.Text>
                        <Button className="w-50" variant="dark">Acquista</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
};

const CommentArea = (props) =>  {
    const [data, setData] = useState([]);
    const [review, setReview] = React.useState("");
    const [rating, setRating] = React.useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `${API}${props.elementId}`,
                {
                    method: 'GET',
                    headers: {
                    Authorization: `Bearer ${AutoApi}`,
                    },
                }
            );
            const json = await response.json();
            setData(json);
        }
        fetchData();
    }, [props.elementId]);

    const handleDelete = (commentId) => {
        fetch(`${API}${commentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${AutoApi}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setData(data.filter((comment) => comment._id !== commentId));
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <Row className="pb-3">
            <hr></hr>

            <p className="text-secondary mb-0">Commenti:</p>
            
            {props.data.map((item, index) => (
                <SingleComment item={item} key={index} handleDelete={handleDelete}/>
            ))}
            </Row>
            <AddComment />
        </>
    );
}

function SingleComment(props) {
    return (
    <div key={props.index}>
        <p className="mb-0 mt-3">
            Autore: <b className="text-secondary">{props.item.author}</b>
        </p>
        <Row>
            <Col>
                <b className="text-secondary">"{props.item.comment}"</b>
            </Col>
            <Col>
                Rate: <b className="text-body">{props.item.rate}</b>
            </Col>
            <button className="btn btn-danger" onClick={()=> handleDelete(props.item._id)}>Elimina</button>
            <button className="btn btn-primary">Modifica</button>
        </Row>
    </div>
    );
};

// add comment


// function AddComment(props) {
//     const [comments, setComments] = useState({ author: "", comment: "", rate: 1 });
//     const [show, setShow] = useState(false);
//     // CHIUSURA MODALE
//     function handleClose(e) {
//         setShow(false);
//         e.preventDefault();
//         e.stopPropagation();
//     }
//     //APERTURA DEL MODALE
//     function handleShow(e) {
//         setShow(true);
//         e.preventDefault();
//         e.stopPropagation();
//     }
//     // GESTISCI INVIO FORM
//     function handleSubmit(e) {
//         e.preventDefault();
//         const newComment = { elementId: props.elementId, comments: review, rate: rating }
//         fetch(API, {
//             Method: "POST",
//             Headers: { Authorization: `Bearer ${AutoApi}` }
//         })
//             .then(response => response.json())
//             .then(data => { setComments([...comments, data]) })
//         e.stopPropagation();
//         // fai qualcosa con i dati del form
//         handleClose();
//     }
//     // GESTISCI RATE e REVIEW

//     const CommentSingle = ({ comment }) => {
//         const [review, setReview] = React.useState(comment.comment);
//         const [rating, setRating] = React.useState(comment.rate);

//         const handleChange = (e) => {
//             if (e.target.name === "review") {
//                 setReview(e.target.value);
//             } else {
//                 setRating(e.target.value);
//             }
//         };
//         return (
//             <div>
//                 <Button variant="primary" onClick={handleShow}>
//                     Aggiungi commento
//                 </Button>
//                 <Modal show={show} onClick={(e) => e.stopPropagation()} >
//                     <Modal.Header>
//                         <Modal.Title>Inserisci recensione</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body onClick={(e) => e.stopPropagation()}>
//                         <Form onSubmit={handleSubmit} >
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Email address</Form.Label>
//                                 <Form.Control type="textarea" placeholder="Scrivi recensione" onChange={handleChange} />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Valutazione (da 1 a 5)</Form.Label>
//                                 <Form.Control type="number" placeholder="" onChange={handleChange} />
//                             </Form.Group>
//                             <Button variant="primary" type="submit" onClick={handleSubmit}>
//                                 Invia recensione
//                             </Button>
//                         </Form>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose}>
//                             Chiudi
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             </div>
//         );
//     }
// };





export default {SingleBook, handleDelete};