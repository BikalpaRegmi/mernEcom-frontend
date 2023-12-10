import axios from '../../../axiosConfig';
import React, { useEffect, useState } from 'react'
import Item from '../../components/item';

const Groceries = () => {
    const [products , setProducts] = useState([]);

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
      return (
        <>
                  <p className='text-red text-3xl font-mono text-red-900 text-center bg-gray-100 w-10/12 mx-auto shadow-md shadow-purple-300 mt-5'>Groceries items</p>

        <div className='grid md:grid-cols-3 sm:grid-cols-2'>
        {
            products.filter((curval)=>curval.category==='Groceries').map((curval,id)=>{
                return(
        
                    <div>
                <Item data={curval}/>
                </div>
                )
            })
        }
         
        </div>
                    </>
      )
}

export default Groceries
