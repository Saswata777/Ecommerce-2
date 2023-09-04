import React from 'react'
import { CartState } from '../context/context'
import SingleProducts from './singleProducts';
import Filter from './filter';
import './style.css'




const Home = () => {
  const {state : {products}, productState:{byStock, byFastDelivery, byrating,sort, bySearchQuery}} = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "highToLow" ? b.price - a.price : a.price - b.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byrating > 0) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings === byrating
      );
    }

    if (bySearchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(bySearchQuery)
      );
    }

    return sortedProducts;
  };
  // console.log(products);
  // const{state:{cart}, dispatch} = CartState();

  return (
    <div className='home'>
      <Filter />
      <div className="productsContainer" style={{display:'flex', position:'relative',top:'100px' , flexFlow:'wrap',justifyContent:'space-around'}}>
        {
          transformProducts().map((prod)=>{
            return (
              <SingleProducts prod={prod} key={prod.id}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home