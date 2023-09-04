import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Rating from './rating';
import './style.css'
import { CartState } from '../context/context';



const Filter = () => {

    const {productState:{byStock, byFastDelivery, byrating,sort, bySearchQuery} , productDispatch} = CartState()

    console.log(byStock, byFastDelivery, byrating,sort, bySearchQuery);
    
  return (
    <div className='filter'>
        <div className='filter_container'>
            <div className='filter_heading'>Filter Products</div>
            <div className='filter_checks'>
                <div><Form.Check   type="radio" id = "default-radio" label="Asscending"  onChange={()=>{productDispatch({type:'SORT_BY_PRICE', payload: 'lowTOHigh'})}} checked={sort === 'lowTOHigh' ? true : false}/></div> 
                <div><Form.Check   type="radio" id = "default-radio" label="Descending" onChange={()=>{productDispatch({type:'SORT_BY_PRICE', payload: 'highToLow'})}} checked={sort === 'highToLow' ? true : false}/></div> 
                <div><Form.Check   type="checkbox" id = "default-radio" label="Include out of Stock" onChange={()=>{productDispatch({type:'FILTER_BY_STOCK'})}} checked={byStock}/></div>
                <div><Form.Check   type="checkbox" id = "default-radio"  label="Fast Delivery Only" onChange={()=>{productDispatch({type:'FILTER_BY_DELIVERY'})}} checked={byFastDelivery}/></div>
                <div>Rating:  <Rating  rating={byrating} style={{ cursor:'pointer'}} onClick={(i)=> productDispatch({type:'FILTER_BY_RATING', payload: i+1})} /></div>
            </div>
            <div className='filter_button'><Button onClick={()=>{productDispatch({type: 'CLEAR_FILTER'})}}>Clear the Cart</Button></div>
        </div>
    </div>
  )
}

export default Filter