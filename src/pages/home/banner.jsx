import axios from '../../../axiosConfig';
import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';
import { ImSpinner } from "react-icons/im";


const Banner = () => {
  const [all,setAll] = useState([]) 
  const [loading,setLoading] = useState(true);

  const getAllProduct = async()=>{
   try {
     const res = await axios.get('/getAllProduct')
     setAll(res.data)   
     setLoading(false)
   } catch (error) {
    console.log('Error :', error);
   }
  }

  useEffect(()=>{
    getAllProduct();
  },[]) 
    return (
    <div>
    { !loading && all.length>0 ?
         <Carousel      
         showThumbs={false}
          autoPlay = {true}
          showArrows={true}
          stopOnHover={true}
          autoFocus={true}
          interval={2000}
          infiniteLoop = {true}
          showStatus = {false}
          swipeable={true}
          transitionTime={1000}
          emulateTouch={true}>
          
        {
            all.filter((product)=>product.category==='TopSales').map((curval,ind)=>{
         return  (
            <Link to={`/product/${curval._id}`}>
            <div key={ind} className=' w-[93%] mx-auto mt-1 relative cursor-pointer hover:scale-90 duration-300 ' >
            <img src={'https://ecommerceappmern.onrender.com/images/'+curval.image} alt="" className='w-full mx-auto mt-9 h-56 md:h-[421px] px-1 ' />
            <p className='absolute sm:text-2xl top-1 md:top-12 left-3 text-xl md:text-3xl capitalize font-bold text-red-700'> {curval.title}</p>
            <p className='absolute left-7 bottom-8 md:text-3xl text-xl '>$ {curval.price-((curval.discount/100)*curval.price)}</p>
            <strike className='absolute bottom-3 text-sm text-slate-700 left-9 '>$ {curval.price}</strike>
            <p className='text-sm md:block flex flex-col justify-between md:h-12 h-[205px] absolute right-1 bottom-3'>
            {new Date(curval.createdAt).toLocaleString()} <b className='text-right'>to</b> {new Date(new Date(curval.createdAt).getTime() +366 *24 *60 *60 *1000).toLocaleString()}
            </p>
            </div>
            </Link>
            )})
        }
         </Carousel> : <ImSpinner className='animate-spin text-5xl mx-auto mt-7'/>
    }
    </div>
  )
}

export default Banner
