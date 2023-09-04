import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsFillCartCheckFill } from "react-icons/bs";
import '../App.css'
import { CartState } from '../context/context';
import Card from 'react-bootstrap/Card';
import { MdDelete } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './style.css'


const Header = () => {
  const{state:{cart}, dispatch,productDispatch} = CartState();
  // const {productState:{bySearchQuery} , productDispatch} = CartState()

  return (
    <Navbar bg="dark"  variant='dark' style={{height:80, width:'100vw', position:'fixed', top:'0', left:'0', zIndex:'2'}}>
        <Container>
          <Navbar.Brand>
                <Link to="/">Shopping Cart</Link>
          </Navbar.Brand>
          <Navbar.Text className='search'>
                <Form.Control type="text" placeholder="Normal text" style={{width: 500}} className='m-auto' onChange={(e)=>{productDispatch({type:'FILTER_BY_SEARCH', payload: e.target.value})}} />
          </Navbar.Text>
            <Nav>
                    <Dropdown style={{marginRight:'200px'}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                <BsFillCartCheckFill fontSize="25px"/> {cart.length}
                        </Dropdown.Toggle>
                    
                        <Dropdown.Menu className='dropdownMenu'>
                            {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                            {
                              cart.length>0 ?(
                                <>
                                  {cart.map((prod,_)=>{
                                    return(
                                          <Dropdown.Item href="#/action-1">
                                            <Card><span><Card.Img variant="top" src={`${prod.imageUrl}`} alt={prod.name} style={{width:'50px', height:'50px', borderRadius:'50%'}} /> {prod.name}     <MdDelete onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: prod,})} style={{fontSize:'25px'}}/></span> <p>₹ {prod.price.split(".")[0]}</p> </Card>
                                          </Dropdown.Item>        
                                    )
                                  })}
                                </>
                              ):
                            (<Dropdown.Item href="#/action-1">Cart is Empty</Dropdown.Item>)
                            }
                            <Button style={{width:'90%' , marginLeft:'5%'}}><Link to='/cart'> Go to Cart</Link></Button>
                        </Dropdown.Menu>

                    </Dropdown>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default Header