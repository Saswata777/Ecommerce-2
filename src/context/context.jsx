import React, { createContext, useReducer, useContext } from 'react'
import { faker } from '@faker-js/faker';
import { cartReducer } from './reducer';

const Cart = createContext();

const Context = ({children}) => {

    // const [cart, setCart] = useState([])

    
    /*
    The output you're seeing, (20) [empty × 20], indicates that your array has been created with a length of 20,
    but each element within the array is empty. This is because when you create an array using Array(20), it creates
    an array with a length of 20, but the elements within it are uninitialized, so they appear as "empty" slots.
    
    If you try to access the elements in the array, you'll see that they are indeed empty or undefined. This is why you 
    might be experiencing unexpected behavior. If you intend to populate the array using the map function, you should avoid 
    using the Array(20) approach, as it creates uninitialized slots.

    In this code, the new Array(20).fill() part creates an array with 20 undefined elements, and then the map function populates
    those elements based on the provided callback. This should give you the desired output with 20 product objects instead of 
    empty slots.
    */ 

   const products = Array(80).fill().map((_, index)=>({
     id: index+1,
     name: faker.commerce.productName(),
     price: faker.commerce.price(),
     description: faker.commerce.productDescription(),
     imageUrl: faker.image.url(),
     inStock : faker.helpers.arrayElement([0, 3, 5, 6, 7]),
     fastDelivery : faker.datatype.boolean(),
     ratings : faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    }))

    faker.seed(100)

    // console.log(products);
    
    const [state, dispatch] = useReducer(cartReducer , {
      products: products,
      cart: [],
    })

    const [productState , productDispatch] = useReducer(productReducer,{
      byStock:false,
      byFastDelivery: false,
      byrating :0,
      bySearchQuery:''

    })


    /*In this modified code, I used the underscore _ as the parameter for
     the map function to indicate that we're not using the value from the array. 
     Instead, we're only interested in the index. The id is then set to index + 1 to 
     create a unique identifier for each product. The rest of the properties are populated 
     using the faker library as before.*/ 

    /*
        faker.helpers.arrayElement() is a function provided by the faker library in JavaScript 
        that helps you randomly pick an element from an array. It's like reaching into a bag of
        items and pulling one out randomly.
    */  


  return (
    <Cart.Provider value={{state, dispatch, productState , productDispatch}}>{children}</Cart.Provider>
  )
}

export default Context

export const CartState = ()=>{
  return useContext(Cart);
}


export const productReducer = (state, action)=>{
    switch (action.type) {
      
        case 'SORT_BY_PRICE':
        return {...state, sort: action.payload};
      
        case 'FILTER_BY_STOCK':
        return {...state, byStock : !state.byStock};  
      
        case 'FILTER_BY_DELIVERY':
        return {...state, byFastDelivery : !state.byFastDelivery};  
      
        case 'FILTER_BY_RATING':
        return {...state,  byrating: action.payload};  
      
        case 'FILTER_BY_SEARCH':
        return {...state,  bySearchQuery: action.payload};  

        case 'CLEAR_FILTER':
          return {
            byStock:false,
            byFastDelivery: false,
            byrating : 0,
            bySearchQuery:''
      
          }
      
    
      default:
        return state;
    }
}