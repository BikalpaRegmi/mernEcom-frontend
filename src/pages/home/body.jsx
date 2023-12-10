import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import axios from '../../../axiosConfig';

const Body = () => {
  const [all,setAll] = useState([]) 

  const  Arrows = (props)=> {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#8B0000" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
      accessibility:true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay:true,
      autoplaySpeed: 9000,
      nextArrow:<Arrows/>,
      prevArrow:<Arrows/>   ,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }
      ]
    };

    const getAllProduct = async()=>{
    const res = await axios.get('/getAllProduct')
      setAll(res.data) 
    }

    useEffect(()=>{   
    getAllProduct();
    },[])

  return (
  <>
    <div className="container mx-auto">
      <div className=" text-black w-[85%] mx-auto bg-slate-50" >
      <span className='flex justify-between my-3 mt-3 pt-3'> <p className='text-3xl text-red-700'>Electronics</p> 
      <Link to={'/Electronics'}>
      <button className=' text-2xl border-2 hover:border-red-500 bg-red-700 text-white px-3'>View all </button>  
       </Link>
      
      </span>
      <Slider {...settings}>
   {
    all.filter((product)=>product.category==='Electronics').map((curval,key)=>{
   
      return ( 
       <Link to={`/product/${curval._id}`} key={key}>
        <div className='shadow-md   sm:mx-1 rounded-xl hover:scale-90 duration-300 cursor-pointer hover:shadow-lg hover:shadow-red-400' >
       <img src={`https://ecommerceappmern.onrender.com/images/${curval.image}`} alt="" className='md:h-40 h-36 w-48 m-auto shadow-sm'/>
        <p className='text-center font-semibold mt-3 capitalize'>{curval.title.length >18 ? `${curval.title.slice(0,18)} ...` : curval.title}</p>
        {
        curval.discount=null || curval.discount >0 ?
        (<>

          <p className='ml-3 text-green-700 font-semibold'>$ {curval.price-((curval.discount/100)*curval.price)}</p>
        <strike className='text-center text-red-300 text-sm ml-5'>${curval.price}</strike>
        </>
        )
        : (<>
          <p className='ml-3 text-green-700 font-semibold'>$ {curval.price}</p>
          <i className='text-center text-red-300 text-sm ml-5'>No discount available</i>

        </>)
        }
        </div>
        </Link>
      )
   })
   }
   </Slider>
      </div>

      <div className=" text-black w-[85%]  mx-auto mt-12 bg-slate-50 pt-1" >
      <span className='flex justify-between  my-3'> <p className='text-3xl text-red-700'>Fashions</p> 
      <Link to={'/Fashions'}>
      <button className='text-2xl border-2 hover:border-red-500 bg-red-700 text-white px-3'>View all </button>  
       </Link>
      
      </span>
      <Slider {...settings}>
   {
    all.filter((product)=>product.category==='Fashions').map((curval,key)=>{
      return ( 
        <Link to={`/product/${curval._id}`} key={key}>
        <div className='shadow-md  hover:scale-90 sm:mx-1 duration-300 cursor-pointer rounded-xl hover:shadow-lg hover:shadow-red-400'>
        <img src={'https://ecommerceappmern.onrender.com/images/'+curval.image} alt="" className='md:h-40 h-36 w-48 m-auto shadow-sm'/>
        <p className='text-center font-semibold mt-3'>{curval.title.length >18 ? `${curval.title.slice(0,18)} ...` : curval.title}</p>
        {
        curval.discount=null || curval.discount >0 ?
        (<>

          <p className='ml-3 text-green-700 font-semibold'>$ {curval.price-((curval.discount/100)*curval.price)}</p>
        <strike className='text-center text-red-300 text-sm ml-5'>${curval.price}</strike>
        </>
        )
        : (<>
          <p className='ml-3 text-green-700 font-semibold'>$ {curval.price}</p>
          <i className='text-center text-red-300 text-sm ml-5'>No discount available</i>

        </>)
        }        </div>
        </Link>
      )
   })
   }
   </Slider>
      </div>

      <div className=" text-black w-[85%] mx-auto mt-12 bg-slate-50 pt-1" >
      <span className='flex justify-between my-3'> <p className='text-3xl text-red-700'>Groceries</p> 
      <Link to={'/groceries'}>
      <button className='text-2xl border-2 hover:border-red-500 bg-red-700 text-white px-3'>View all </button>  
       </Link>
      
      </span>
      <Slider {...settings}>
   {
    all.filter((product)=>product.category==='Groceries').map((curval,key)=>{
      return ( 
        <Link to={`/product/${curval._id}`} key={key}>
        <div className='shadow-md rounded-xl  sm:mx-1 hover:scale-90 duration-300 cursor-pointer hover:shadow-lg hover:shadow-red-400'>
        <img src={'https://ecommerceappmern.onrender.com/images/'+curval.image} alt="" className='md:h-40 h-36 w-48 m-auto shadow-sm'/>
        <p className='text-center font-semibold mt-3'>{curval.title.length >18 ? `${curval.title.slice(0,18)} ...` : curval.title}</p>
        {
        curval.discount >0 ?
        (<>

          <p className='ml-3 text-green-700 font-semibold'>$ {curval.price-((curval.discount/100)*curval.price)}</p>
        <strike className='text-center text-red-300 text-sm ml-5'>${curval.price}</strike>
        </>
        )
        : (<>
          <p className='ml-3 text-green-700 font-semibold'>$ {curval.price}</p>
          <i className='text-center text-red-300 text-sm ml-5'>No discount available</i>

        </>)
        }        </div></Link>
      )
   })
   }
   </Slider>
      </div>

      <div className=" text-black w-[85%] mx-auto mt-12 bg-slate-50 pt-1 " >
      <span className='flex justify-between my-3'> <p className='text-3xl text-red-700'>Toys</p> 
      <Link to={'/toys'}>
      <button className='text-2xl border-2 hover:border-red-500 bg-red-700 text-white px-3'>View all </button>  
       </Link>
      
      </span>
      <Slider {...settings}>
   {
    all.filter((product)=>product.category==='Toys').map((curval,key)=>{
      return ( 
        <Link to={`/product/${curval._id}`} key={key}>
        <div className='shadow-md rounded-xl sm:mx-1 hover:scale-90 duration-300 cursor-pointer hover:shadow-lg hover:shadow-red-400'>
        <img src={'https://ecommerceappmern.onrender.com/images/'+curval.image} alt="" className='md:h-40 h-36 w-48 m-auto shadow-sm'/>
        <p className='text-center font-semibold mt-3'>{curval.title.length >18 ? `${curval.title.slice(0,18)} ...` : curval.title}</p>
        {
          curval.discount >= 1  ?
        (<>

          <p className='ml-3 text-green-700 font-semibold'>$ {curval.price-((curval.discount/100)*curval.price)}</p>
          <strike className='text-center text-red-300 text-sm ml-5'>${curval.price}</strike>

        </>
        )
        : (<>
          <p className='ml-3 text-green-700 font-semibold'>$ {curval.price}</p>
          <i className='text-center text-red-300 text-sm ml-5'>No discount available</i>

        </>)
        }        </div></Link>
      )
   })
   }
   </Slider>
      </div>
    </div>
  </>
  )
}

export default Body
