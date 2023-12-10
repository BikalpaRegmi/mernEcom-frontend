import axios from '../../../../axiosConfig';
import React, { useContext, useEffect, useState } from 'react'
import { FaTrash } from "react-icons/fa";
import AdminProducts from './adminProducts';
import { LoginContext } from '../../../context/contextProvider';


const AdminProfile = () => {
const [userData , setUserData] = useState([])
const {account , setAccount} = useContext(LoginContext)

const fetchAllUsers = async()=>{
    try {
        const res = await axios.get('/getAllUser')
        setUserData(res.data)
    } catch (error) {
        console.log(error)
    }
}
const handleDelete = async(id)=>{
try {
    await axios.delete(`/deleteUser/${id}`)
    fetchAllUsers()
} catch (error) {
    console.log(error)
}
} 


useEffect(()=>{
    fetchAllUsers()
},[])
  return (
    <div>
     
     { account.isAdmin ?

      <div className="container">
        <div className="users">
        <h1 className='text-5xl mb-5 mt-3 font-mono text-center text-red-700'>Users</h1>

       <ul className='grid grid-cols-5'>
        <li className='bg-red-950 text-red-100 font-bold text-2xl text-center pb-2 pt-1'>Sn</li>
        <li className='bg-red-950 text-red-100 font-bold text-2xl text-center pb-2 pt-1'>Name</li>
        <li className='bg-red-950 text-red-100 font-bold text-2xl text-center pb-2 pt-1 col-span-2'>Email</li>
        <li className='bg-red-950 text-red-100 font-bold text-2xl text-center pb-2 pt-1'>Delete</li>
        
        {
            userData.map((curval,ind)=>{
                return ( 
                    <>
                    <li className='text-center bg-red-100 text-red-950 text-lg'>{ind}</li>
                    <li className='text-center  bg-red-100 text-red-950 text-lg'>{curval.name}</li>
                    <li className='text-center bg-red-100 text-red-950 text-lg col-span-2'>{curval.email}</li>
                    <li className=' bg-red-100 text-red-950 text-lg flex justify-center'>
                    <FaTrash className='text-center hover:shadow-sm hover:shadow-slate-700 cursor-pointer' onClick={()=>handleDelete(curval._id)}/>
                    </li>
                    
                    </>
                )
            })
        }
       </ul>
        </div>

       <div className='products'>
     <AdminProducts/>
       </div>
      </div> 
      : <p className='text-3xl text-center font-serif'> ! You must be an admin for this page !</p>
      }
    </div>
  )
}

export default AdminProfile
