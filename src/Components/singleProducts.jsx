import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CartState } from '../context/context';



const SingleProducts = ({prod}) => {
    const{state:{cart}, dispatch} = CartState();
  return (
    <Card key={prod.id} style={{ width: '18rem', marginTop:'10px'}} >
                <Card.Img variant="top" src={`${prod.imageUrl}`} alt={prod.name} />
                <Card.Body>
                  <Card.Title>{prod.name}</Card.Title>
                  {/* <Card.Text>{prod.description}</Card.Text> */}
                  <ListGroup variant="flush">
                        <ListGroup.Item>₹ {prod.price}</ListGroup.Item>
                        <ListGroup.Item>InStock: {prod.inStock}</ListGroup.Item>
                        <ListGroup.Item>Rating: {Array(5).fill().map((_,i)=>{
                            return(
                            <span key={i}>
                                    {prod.ratings > i ? (
                                        <AiFillStar fontSize="20px" />
                                    ) : (
                                        <AiOutlineStar fontSize="20px" />
                                    )}
                                    </span>
                            )
                            
                        })}</ListGroup.Item>
                        <ListGroup.Item>{prod.fastDelivery ? (
                            <div>Fast Delivery</div>
                        ):(
                            <div>4 days delivery</div>
                        )}</ListGroup.Item>
                  </ListGroup>
                  {cart.some((p) => p.id === prod.id) ? (
                                                        <Button variant="danger" onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: prod,})}>Remove from Cart</Button>
          ) : 
          (
            <Button onClick={() => dispatch({type: "ADD_TO_CART", payload: prod, }) } disabled={!prod.inStock} > {!prod.inStock ? "Out of Stock" : "Add to Cart"} </Button>
          )}
                </Card.Body>
              </Card>
  )
}

export default SingleProducts