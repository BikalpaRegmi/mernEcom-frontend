import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Buy from './buySection/Buy.jsx'
import { LoginContext } from '../../context/contextProvider'
import axios from '../../../axiosConfig';

axios.defaults.withCredentials =true;

const Cart = () => {
const {account,setAccount} = useContext(LoginContext);
const [cart , setCart] = useState('')

const getCarts = async() =>{
  const res = await axios.get('/cartDetails') ;
   setCart(res.data)   
}

useEffect(()=>{
getCarts();
},[account])

const removeDataFromCart = async(id) =>{
 try {
  const res = await axios.delete(`/remove/${id}`)
  if(res.status === 200){
    getCarts();
  }
 } catch (error) {
  console.log(error)
 }
}

  return (
 <>
   {
     cart.carts?.length ?
        <h1 className='mt-3 mb-1 flex justify-between text-3xl bg-slate-50 md:text-left md:ml-5 text-center font-semibold py-5 text-red-900 border-b-2 md:w-[98%]'>Shopping Cart     <h1 className='mr-9 text-xl font-bold text-red-900 hidden md:block'>100% payment protection</h1></h1>
        : 
        <h1 className='mt-3 mb-1 flex justify-between text-3xl bg-slate-50 md:text-left md:ml-5 text-center font-semibold py-5 text-red-900 border-b-2 md:w-[98%]'>Shopping Cart (No items added to cart)   <h1 className='mr-9 text-xl font-bold text-red-900 hidden md:block'>100% payment protection</h1></h1>

   }
      <div className='md:flex  justify-between px-3'>
    <div className='md:w-[73%]'>
       {
        cart.carts?.map((data,ind)=>{
          return (
          
     <div className="left flex justify-around  bg-slate-50 mt-3 shadow-sm shadow-red-300 md:mr-3" key={ind}>
      <div className="left_left shadow-sm mt-9 ">
  <img className='p-7 w-56' src={`https://ecommerceappmern.onrender.com/images/${data.image}`} alt="" />
      </div>
      <div className="left_right md:text-xl w-80  mt-3 flex flex-col justify-around ">
      <p className='flex gap-3 capitalize'>{data.title} <span className='font-semibold mr-3 md:ml-7'>$ {(data.price-((data.discount/100)*data.price))}</span></p>
      <p>Type : {data.category}</p>
      <p className='text-green-700'> Delivery in 3-5 days</p>
      <div className="quantity flex w-28 justify-between text-2xl">
      </div>
        <p className='text-sm flex gap-3'> <i className='text-red-500 hover:underline cursor-pointer' onClick={()=>removeDataFromCart(data._id)}> Remove</i> <Link to={`/${data.category}`}> <i className='mr-3 text-blue-700 hover:underline cursor-pointer'>See More Like This</i></Link></p>
      </div>
     </div>
      
          )
        })
       }
    </div>
 <Buy account={account}/>
 </div>

    
    </>
  )
}

export default Cart
