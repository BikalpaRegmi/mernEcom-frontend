import axios from '../../../../axiosConfig';
import React, { useEffect, useState } from 'react'
import { FaTrash } from "react-icons/fa";

const AdminProducts = () => {

    const [productData , setProductData] = useState([])

    const getAllProduct = async() =>{
        try {
            const res = await axios.get('/getAllProduct')
            const sortedData = res.data.sort((a, b) => a.category.localeCompare(b.category));
            setProductData(sortedData)
        } catch (error) {
            console.log(error)
        }
    }
useEffect(()=>{
 getAllProduct();
},[])

const handleDelete =async(id) =>{
    try {
        await axios.delete(`/deleteProduct/${id}`)
        getAllProduct();
        
    } catch (error) {
        console.log(error)
    }
}
    return (
    <div className=' mt-12'>
    <h1 className='text-5xl mb-5 font-mono text-center text-red-700'>Products</h1>
     <ul className='grid grid-cols-5'>
        <li className='bg-red-950 text-red-100 font-bold text-2xl text-center pb-2 pt-1'>Sn</li>
        <li className='bg-red-950 text-red-100 font-bold text-2xl text-center pb-2 pt-1'>Title</li>
        <li className='bg-red-950 text-red-100 font-bold text-2xl text-center pb-2 pt-1 col-span-2'>Category</li>
        <li className='bg-red-950 text-red-100 font-bold text-2xl text-center pb-2 pt-1'>Delete</li>
{
   productData.map((curval,ind)=>{
    return(
        <>
        <li className='text-center bg-red-100 text-red-950 text-lg'>{ind}</li>
            <li className='text-center  bg-red-100 text-red-950 text-lg capitalize'>{curval.title}</li>
            <li className='text-center bg-red-100 text-red-950 text-xl col-span-2 '>{curval.category}</li>
            <li className=' bg-red-100 text-red-950 text-lg flex justify-center'>
                    <FaTrash className='text-center hover:shadow-sm hover:shadow-slate-700 cursor-pointer' onClick={()=>handleDelete(curval._id)}/>
                  
                    </li>        
                    </>
    )
   })
}
        </ul>
    </div>
  )
}

export default AdminProducts
