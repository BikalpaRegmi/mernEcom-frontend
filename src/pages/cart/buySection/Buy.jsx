import React, { useEffect, useState } from 'react'
import {loadStripe} from '@stripe/stripe-js';
import axios from '../../../../axiosConfig';

const Buy = ({account}) => {
 const [price,setPrice] = useState(0)

 
 
 const totalAmt = () =>{
   let price = 0 ;
  
  account.carts?.map((curval)=>{ //instead of account.carts && account.carts.map you can write account.cart?.map
     price = price + curval.price-((curval.discount/100)*curval.price)  ;
  })
  setPrice(price)
}

//payment integration using stripe
const makePayment = async()=>{
  try {
    const stripe = await loadStripe('pk_test_51OLFUdSEvGRe73IhgHwUSN0RAaFDUp79RgBxdKtsYw72n3GtbxumssrBSLjaaXNoe6ETMtOhpCmWb83n3FZVip4500YNshhYbI');
   
    const res = await axios.post('/createBuyNow',{product:account.carts})
    const result = stripe.redirectToCheckout({
      sessionId:res.data.id
    })
    if(result.error){
      console.log(result.error)
    }
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
totalAmt()
},[account])

  return (
    <div>
    <h1 className='flex justify-between text-3xl bg-slate-50 text-center font-semibold py-5 text-red-900 border-b-2 md:w-[99%] md:hidden mt-5 ml-2'>100% payment protection  &#10003; </h1>
    <div className='bg-slate-50 ml-3 shadow-md pb-7'>

    <p className='ml-4 flex justify-between mr-3 md:text-lg mt-3 bg-slate-50 md:w-80 text-lg'><b>Total items :</b> {account.carts && account.carts.length} Products</p>
    <p className='ml-4 flex justify-between mr-3 md:text-lg  bg-slate-50 md:w-80 mt-9 text-lg'><b>SubTotal items :</b>  $ {price.toFixed(2)}</p>
        <p className='ml-4 flex justify-between mr-3 md:text-lg bg-slate-50 md:w-80 text-lg mt-9'><b>  Shipping Charge : </b> $ 5</p>
        <p className='ml-4 flex justify-between mr-3 md:text-lg bg-slate-50 md:w-80 text-lg mt-9'><b>  Total :</b> $ {(price + 5).toFixed(2) }</p>
   <button className='bg-red-700 text-white w-64 ml-14 mt-7 cursor-pointer hover:bg-red-900 md:mt-28 py-3 text-xl font-bold rounded-full' onClick={makePayment}>Proceed To Buy</button>
    </div>
    </div>
  )
}

export default Buy
