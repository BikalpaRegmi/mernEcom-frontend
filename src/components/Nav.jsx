import React, { useContext, useEffect, useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosCart } from "react-icons/io";
import { MdSearch } from "react-icons/md";
import { MdOutlineDisabledByDefault } from "react-icons/md";
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/contextProvider';
import axios from '../../axiosConfig';

axios.defaults.withCredentials = true;

const Nav = () => {
 const [ham , setHam] = useState(true)
 const navigate = useNavigate();
 const {account,setAccount} = useContext(LoginContext)
 const [text,setText] = useState('');
 const [products , setProducts] = useState([])
 const [liopen , setLiopen] = useState(false)

 function handleSearch(){
  if(text.length>0) toast.error('No result found matching your search')
  else toast.error('plz fill the search query')
 }

 const fetchAllProducts = async() =>{
  try {
     const res = await axios.get('/getAllProduct')
     setProducts(res.data)
  } catch (error) {
     console.log(error)
  }
 }
 useEffect(()=>{
 fetchAllProducts();
 },[])

const getText = (e)=>{
  setText(e)
  setLiopen(true)
}
 const getDetailValidUser = async()=>{
  const res = await axios.get('/validUser')
   setAccount(res.data)
 }
 useEffect(()=>{
  getDetailValidUser();
 },[account])

  return (
    <>
    <ul className='flex justify-between capitalize text-[13px] font-light md:w-80 text-slate-500 w-64 underline md:mt-1 ml-3 md:ml-5'>
    
  
    <li className='cursor-pointer hover:text-blue-700' onClick={() => navigate('/sellers')}>Become a seller</li>
   
     <a href="https://www.imepay.com.np/#/" target='blank'> <li className='cursor-pointer hover:text-blue-700'>Payment Partner</li> </a>
      <Link to={'/help'}><li className='cursor-pointer hover:text-blue-700'>help</li></Link>
    </ul>



   <div className="mobile md:hidden ">
   <div className="top flex justify-between px-1">
    {
     !ham ? 
     (<div>
    <MdOutlineDisabledByDefault className='text-5xl mt-16 cursor-pointer' onClick={()=>setHam(true)}/> 
    <div>
    <Link to={'/'}><p className='cursor-pointer hover:text-slate-300 text-xl mt-3 font-bold text-red-700 bg-slate-50' onClick={()=>setHam(true)} >All</p> <hr /></Link> 
   <Link to={'/topSales'}> <p className='cursor-pointer hover:text-slate-300 text-xl mt-3 font-bold text-red-700 bg-slate-50' onClick={()=>setHam(true)} >Top sales</p> <hr /></Link> 
   <Link to={'/Electronics'}> <p className='cursor-pointer hover:text-slate-300 text-xl mt-3 font-bold text-red-700 bg-slate-50' onClick={()=>setHam(true)} >Electronics</p> <hr /></Link>
   <Link to={'/Fashions'}> <p className='cursor-pointer hover:text-slate-300 text-xl mt-3 font-bold text-red-700 bg-slate-50' onClick={()=>setHam(true)} > Fashions</p> <hr /></Link>
   <Link to={'/groceries'}> <p className='cursor-pointer hover:text-slate-300 text-xl mt-3 font-bold text-red-700 bg-slate-50' onClick={()=>setHam(true)} > Groceries</p> <hr /></Link>
   <Link to={'/toys'}>  <p className='cursor-pointer hover:text-slate-300 text-xl mt-3 font-bold text-red-700 bg-slate-50' onClick={()=>setHam(true)} > Toys</p> <hr /> </Link>

    </div>
     </div>) : 
    <RxHamburgerMenu className='text-5xl mt-16 cursor-pointer' onClick={()=>setHam(false)}/>
    }
  <Link to={'/'}>
    <img src="download1.png" alt="" className='w-56 h-40'/>
  </Link>
{
  account ?
  <Link to={'/cart'}>  <span className='flex mr-3 hover:rounded-full'>  <IoIosCart className='text-5xl mt-16 cursor-pointer'/> <b className='mt-16 text-xl'>   {account.carts?.length}
 </b></span></Link>
  : 
  <Link to={'/login'}>  <span className='flex mr-3 hover:rounded-full'>  <IoIosCart className='text-5xl mt-16 cursor-pointer'/> <b className='mt-16 text-xl'> 0 </b></span></Link>
}

    { 
      account ?
     
      <Link to={'/profile'}><p  className='rounded-full  mt-[69px] h-9 pt-1 w-9 text-center font-bold text-lg bg-slate-700 cursor-pointer text-white' title='profile'> {account && account.name ? account.name[0].toUpperCase() : ''} </p> </Link>
     
     : <Link to={'/login'}><img src='download2.png' alt='' className='rounded-full  mt-[69px] h-9 w-9 text-center cursor-pointer text-white'/> </Link>
    }

   </div>
   <p className='flex  bg-red-500 gap-3 rounded-xl m-1 mb-0'>  <input type="text" placeholder='Search' value={text} onChange={(e)=>getText(e.target.value)} className='border-2 pl-3 w-10/12 h-12 rounded-xl text-xl'/> <MdSearch className='text-5xl text-white' onClick={handleSearch}/> </p>
   
{ liopen && text.length>0 ?
  products.filter(product=>product.title.toLowerCase().includes(text.toLowerCase())).map((curval,id)=>{
    return (
      <div className='bg-red-900 mx-3'>
      <Link to={`/product/${curval._id}`}>
      <p className='font-bold pb-5  text-white shadow-sm shadow-black px-3 capitalize hover:bg-red-800  cursor-pointer' onClick={()=>{setLiopen(false) ; setText('')}}> {curval.title} </p>
      </Link>
      </div>
  )
  })
   : ''
   }
   </div>







   <div className="pc hidden md:block pr-7">
   <div className='flex justify-between'>
   <Link to={'/'}><img src="download1.png" alt="" className='w-40 h-28 mt-8 cursor-pointer ' title='Home'/></Link>
   <p className='flex  bg-red-500 gap-3 rounded-xl w-1/2 h-12 mt-16'> 
    <input type="text" placeholder='Search' value={text} onChange={(e)=>getText(e.target.value)} className='border-2  w-10/12 h-12 rounded-xl pl-3 text-lg'/> 
    <MdSearch className='text-5xl text-white cursor-pointer' title='Search' onClick={handleSearch}/><div>
 
   </div>
    </p>
   
   
   {
    !account ?
   <Link to={'/login'}><p className='mt-[70px] text-red-700 text-2xl cursor-pointer hover:text-red-500 h-9' title='Sign in'>Sign in</p></Link>
   :
   ''
   }
   
   {
   account ?
   <Link to={'/cart'}> <span className='flex mr-3'> <IoIosCart className='text-5xl mt-16 cursor-pointer'/> <b className='mt-16 text-xl'> {account.carts && account.carts.length}</b></span> </Link>
   : 
   <Link to={'/login'}> <span className='flex mr-3'> <IoIosCart className='text-5xl mt-16 cursor-pointer'/> <b className='mt-16 text-xl'> 0 </b></span> </Link>
   }
   
   
   {
    account ? 
    
     <Link to={'/profile'}>  <p   className='rounded-full h-11 mt-16 w-14 bg-slate-700 text-3xl pt-1 text-white font-bold text-center cursor-pointer' title='profile'>{account && account.name ? account.name[0].toUpperCase() : ''} </p> </Link>
  
      :  <Link to={'/login'}>   <img src="download2.png" alt="" className='rounded-full h-12 mt-16 w-14 bg-slate-500 cursor-pointer' title='profile'/>  </Link>
} 
   </div>
   </div>
 
   {
    liopen && text.length>1 ?
    products.filter(curval=>curval.title.toLowerCase().includes(text.toLowerCase())).map((curval,id)=>{
      return(
        <div className='bg-red-900 w-10/12 mx-auto'>
        <Link to={`/product/${curval._id}`}>
      <p className='font-bold pb-5  text-white shadow-sm shadow-black px-3 capitalize hover:bg-red-800 cursor-pointer' onClick={()=>{setLiopen(false) ; setText('')}}> {curval.title} </p>
      </Link>
        </div>
      )
    }) :''
   }
 <div className='belowNav hidden md:block text-lg shadow-sm shadow-slate-700'>
 <div className='flex justify-around text-white bg-red-700 '>
 <Link to={'/'}> <p className='cursor-pointer hover:text-slate-300 font-bold'>All</p></Link>
   <Link to={'/topSales'}><p className='cursor-pointer hover:text-slate-300 font-bold'>Top sales</p></Link>
   <Link to={'/Electronics'}> <p className='cursor-pointer hover:text-slate-300 font-bold'>Electronics</p></Link>
   <Link to={'/Fashions'}> <p className='cursor-pointer hover:text-slate-300 font-bold'> Fashions</p></Link>
   <Link to={'/groceries'}> <p className='cursor-pointer hover:text-slate-300 font-bold'> Groceries</p></Link>
   <Link to={'/toys'}> <p className='cursor-pointer hover:text-slate-300 font-bold'> Toys</p></Link>
   <a href="https://youtu.be/dQw4w9WgXcQ?si=_uf2zREBa4Y4eJqQ" target='blank'><p className='text-gray-300 cursor-not-allowed'> |||  Offers</p> </a>
 </div>
 </div>
 <ToastContainer/>
    </>
  )
}

export default Nav
