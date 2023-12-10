import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/contextProvider'
import { IoLogOut } from "react-icons/io5";
import axios from '../../../axiosConfig';

const UserProfile = () => {
 
const {account,setAccount} = useContext(LoginContext)
const navigate = useNavigate();
    
const deleteUser = async()=>{
    const res = await axios.get('/logOut')
    alert('logout sucessfull')
    setAccount(false)
    setTimeout(() => {
      navigate('/')
      window.location.reload()    
    }, 1000);
}


    return (
    <div>
       <div className="top flex justify-around px-3 shadow-md shadow-red-900 py-3">
       <p className='capitalize mt-7 md:mt-14 text-3xl sm:text-4xl md:text-5xl text-slate-900'>Hello , {account.name}</p>
       <p className='text-7xl  w-40  md:h-40 h-38  py-9  bg-slate-700 text-white rounded-full text-center'>{account.name && account.name[0].toUpperCase()}</p>
       </div>
       <div className="bottom bg-red-900 text-white text-xl px-3 pb-7 mt-9 shadow-md shadow-red-300">
         <p className='capitalize md:mt-7 sm:mt-7 text-center pb-7 text-3xl pt-3 font-bold'>Your Details</p>
         <p className='capitalize md:mt-7 sm:mt-7'>Name : {account.name}</p>
         <p className='font-serif md:mt-7 sm:mt-7'>Email : {account.email}</p>
         <p className='capitalize md:mt-7 sm:mt-7'>PhoneNo : {account.phoneNo}</p>
         <p className='capitalize md:mt-7 sm:mt-7'>CreatedAt : {new Date(account.createdAt).toLocaleString()}</p>
         <p className='capitalize md:mt-7 sm:mt-7'>EditedAt : {new Date(account.updatedAt).toLocaleString() === new Date(account.createdAt).toLocaleString() ? 'Not edited till now' : new Date(account.updatedAt).toLocaleString()}</p>
        
       </div>
       <div className="signout">
       <button className='mt-7 bg-red-900 rounded-full px-3 mb-3 py-1 font-bold hover:bg-black w-1/2 h-12 ml-20 md:ml-80 text-3xl flex justify-center gap-3 pt-1 text-rose-100' onClick={deleteUser}>SignOut <IoLogOut className='text-4xl'/></button>

       </div>
    </div>
  )
}

export default UserProfile
