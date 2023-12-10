import React, { useContext } from 'react'
import { FaFacebook,FaInstagramSquare,FaLinkedin,FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter,FaLocationDot } from "react-icons/fa6";
import { IoCallSharp,IoMail } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { LoginContext } from '../context/contextProvider';



const Footer = () => {
    const {account} = useContext(LoginContext);

  return (
   <>
    <div className="footer bg-red-900 mt-24 pb-5 pl-3 text-white md:flex justify-around sm:text-sm">
        <div className="left pt-3">
            <p className='text-xl font-serif font-semibold'>Bikalpa <span className='text-red-600 text-2xl'>E-commerce</span></p>
            <ul className='mt-5 font-light'>
               <Link to={'/'}> <li className='cursor-pointer hover:underline w-36'>Home</li></Link>
               {
                account ?
               <Link to={'/sellers'}> <li className='cursor-pointer hover:underline w-36'>Become a seller</li></Link>
               :
               <Link to={'/login'}> <li className='cursor-pointer hover:underline w-36'>Become a seller</li></Link>

               }
                <li className='cursor-pointer hover:underline w-36'>Payment partner</li>
                <Link to={'/help'}><li className='cursor-pointer hover:underline w-36'>Help</li></Link>
            </ul>
            <p className='mt-3 text-sm hidden md:block'>Copyright &copy; 2023 <span className='font-bold'>Bikalpa E-commerce</span> All Right Reserved</p>
     </div>
     <div className="middle sm:pr-12 mt-3">
        <ul className='flex flex-col justify-around h-full'>
            <li className='flex gap-3 '><FaLocationDot className='text-3xl sm:text-md'/><span className='text-lg sm:text-sm mb-3'> Makwanpur , Nepal</span></li>
            <li className='flex gap-3 '><IoCallSharp className='text-3xl sm:text-md'/><span className='text-lg sm:text-sm mb-3'> +977 9812121212</span> </li>
            <li className='flex gap-3 '><IoMail className='text-3xl sm:text-md'/> <span className='text-md sm:text-sm mb-3'>BikalpaStore@gmail.com </span></li>
        </ul>
     </div>
     <div className="right pt-3 w-80 sm:w-64 ">
        <h1 className='font-sans text-lg font-semibold'>About Us</h1>
        <p className='text-sm mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium sunt soluta obcaecati accusamus, sint repellat eos.</p>
        <ul className='mt-5 text-xl sm:text-sm flex justify-between'>
            <a href="https://www.facebook.com/" target='blank'> <li><FaFacebook className='cursor-pointer hover:scale-125 ease-in duration-75'/></li> </a>
            <a href="https://www.instagram.com/" target='blank'> <li><FaInstagramSquare className='cursor-pointer hover:scale-125 ease-in duration-75'/></li> </a>
            <a href="https://www.linkedin.com/in/bikalpa-regmi-381544294/" target='blank'> <li><FaLinkedin className='cursor-pointer hover:scale-125 ease-in duration-75'/></li> </a>
            <a href="https://twitter.com/" target='blank'> <li><FaSquareXTwitter className='cursor-pointer hover:scale-125 ease-in duration-75'/></li> </a>
            <a href="https://youtu.be/dQw4w9WgXcQ?si=-BMISTTn5IfU1bkX"> <li><FaYoutube className='cursor-pointer hover:scale-125 ease-in duration-75'/></li> </a>
        </ul>
     </div>
     <p className='mt-7 text-sm md:hidden'>Copyright &copy; 2023 <span className='font-bold'>Bikalpa E-commerce</span> All Right Reserved</p>

    </div>
   </>
  )
}

export default Footer
