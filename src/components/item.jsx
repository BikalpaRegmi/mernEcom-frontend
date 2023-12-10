import React from 'react';
import {Link} from 'react-router-dom';
const Item = ({data}) => {
const {_id,image,title, price, discount} = data ;
    
    return (
    <div>
    <Link to={`/product/${_id}`}>
      <div className="container rounded-xl mt-12 w-10/12 mx-auto shadow-lg shadow-red-300 hover:scale-90 duration-300 delay-100 cursor-pointer hover:shadow-red-700">
        <div className="image w-40 mx-auto">
       <img src={`https://ecommerceappmern.onrender.com/images/${image}`} alt="" className='w-full pt-3 h-44'/>
        </div>
       
       <div className="title">
         <p className='text-center font-semibold mt-3 text-xl px-1'>{title}</p>
        </div>
        
        <div className="price_discount">
        <p className='ml-7 text-lg font-semibold mt-3'>$ {price - (discount/100)*price}</p>
       <span className='flex justify-between md:justify-around  w-48'> 
        <strike className='ml-9'>$ {price} </strike>
         <p className=''>-{discount}%</p>
       </span>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default Item
