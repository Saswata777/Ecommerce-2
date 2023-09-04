import React from 'react'
import './style.css'
import { Button, Col, Form } from 'react-bootstrap'
import { CartState } from '../context/context'
// import Card from 'react-bootstrap/Card';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from 'react';

const Cart = () => {
  const{state:{cart}, dispatch} = CartState();

  const [ total, setTotal] = useState()
  
  useEffect(()=>{
      setTotal(cart.reduce((accu,curr)=>{
        accu = accu + Number(curr.price)*(curr.qty);
        return accu;
      },0))
  },[cart])


  return (
    <div className='cart'>
      <div className='cartItems'>
            <>
            {
              cart.map((prod)=>{
                return(
                  <div className='items'>
                      <img variant="top" src={`${prod.imageUrl}`} alt={prod.name} style={{width:'200px', height:'100px', margin:'20px 0 20px 10px', display:'inline'}}/>
                      <div>{prod.name}</div>
                      <div>₹ {prod.price.split(".")[0]}</div>
                      <div>
                      {Array(5).fill().map((_,i)=>{
                            return(
                            <span key={i}>
                                    {prod.ratings > i ? (
                                        <AiFillStar fontSize="20px" />
                                    ) : (
                                        <AiOutlineStar fontSize="20px" />
                                    )}
                                    </span>
                            )
                            
                        })}
                      </div>
                      <div className='selectNo'>
                      <Col md={2}>
                            <Form.Group>
                              {/* <Form.Label>Quantity:{prod.qty}</Form.Label> */}
                              <Form.Control
                                as="select"
                                value={prod.qty}
                                onChange={(e) =>
                                  dispatch({
                                    type: "CHANGE_CART_QTY",
                                    payload: { id: prod.id, qty: e.target.value },
                                  })
                                }
                              >
                                {[...Array(prod.inStock).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                      </Col>
                      </div>
                      <div>
                      <MdDelete onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: prod,})} style={{fontSize:'25px'}}/>
                      </div>
                  </div>
                )
              })

            }
            </>
      </div>
      <div className='cartDetails'>
        <div className='heading'>Subtotal ({cart.length}) items</div>
        <div className='total'>Total:{total} </div>
        <div><Button>Proceed to Checkout</Button></div>
      </div>
    </div>
  )
}

export default Cart