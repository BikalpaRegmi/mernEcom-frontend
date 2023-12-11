import axios from '../../../axiosConfig';
import React, { useContext, useEffect, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../../context/contextProvider';




const SingleItem = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const {account,setAccount} = useContext(LoginContext)
  const [productData , setProductData] = useState([])
  const fetchSingleProduct = async()=>{
     const res =await axios.get(`/getProduct/${id}`)
     setProductData(res.data);
  }
 useEffect(()=>{
   fetchSingleProduct();
 },[id])
 
 const addToCart = async(id) =>{
  try {
    const res = await  axios.post(`/cart/${id}` , productData)
    if(!res) console.log('error while adding into cart at singleItem.jsx')
    else{
       setAccount(res.data)
       toast.success('Data added in your cart sucessfullly')         
       setTimeout(() => {
        navigate('/cart')
       }, 1999);
    }   
  } catch (error) {
    console.log(error)
  }

 }


  return (
   <>
   <div className="container md:flex justify-around">
 
    <div className="left md:w-1/3 md:ml-14  md:mt-14 md:flex flex-col justify-between ">
    <div className="image shadow-lg">
    <img src={`https://ecommerceappmern.onrender.com/images/${productData.image}`} alt="" className='w-full mx-auto h-96 p-9 md:w-72 md:h-64'/>
 </div>

  <div className="buttons flex justify-around mt-9">
  {
   account ?
    <button className='bg-red-700 text-3xl px-5 rounded-full text-slate-100 font-serif py-1 shadow-md flex justify-between hover:shadow-slate-700' onClick={()=>addToCart(productData._id)}>Add to <FaShoppingCart className='ml-2 text-3xl self-center'/></button>
    :
    <Link to={'/login'}> 
       <button className='bg-red-700 text-3xl px-5 rounded-full text-slate-100 font-serif py-1 shadow-md flex justify-between hover:shadow-slate-700'>Add to <FaShoppingCart className='ml-2 text-3xl self-center'/></button>
</Link>
  }
   {
   account ?
     <button className='bg-red-700 text-3xl px-3 rounded-full text-slate-100 font-serif py-1 shadow-md hover:shadow-slate-700' onClick={()=>addToCart(productData._id)}>Buy now</button> 
   :
   <Link to={'/login'}>  <button className='bg-red-700 text-3xl px-3 rounded-full text-slate-100 font-serif py-1 shadow-md hover:shadow-slate-700'>Buy now</button> </Link>

   }
  </div> 
    </div>

    <div className="right mt-7 pb-9 md:mt-14 shadow-sm font-serif shadow-red-900 md:w-1/3">
    <h1 className='text-3xl py-5 px-3 text-center capitalize'>{productData.title}</h1> <hr />
    <p className='mt-3 text-md ml-3'><b className='text-red-700'>  Price Before Discount </b>: $<strike> {productData.price} </strike></p>
    <p className='mt-3 text-md ml-3'><b className='text-red-700'>  Discount </b>: {productData.discount ? productData.discount : 'no discount available'}%</p>
    <p className='mt-3 text-md ml-3'><b className='text-red-700'>  Price After Discount </b>: $ {productData.price - ((productData.discount/100)*productData.price)}</p>
    <p className='mt-3 text-md ml-3'><b className='text-red-700'>  Delivery Time </b>: 3-5 days</p>
    <p className='mt-3 text-md ml-3'><b className='text-red-700'>  Being Selled Since </b>: {Date(productData.createdAt).toLocaleString()}</p>
    <p className='mt-7 text-md ml-3'><b className='text-red-700'>  Description </b>: {productData.Description}</p>
    </div>
    </div>
    <ToastContainer/>
   </>
  )
}

export default SingleItem
