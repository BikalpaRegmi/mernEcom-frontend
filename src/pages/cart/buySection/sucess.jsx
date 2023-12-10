import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const Sucess = () => {
    const navigate = useNavigate()
    
  useEffect(()=>{
setTimeout(() => {
    navigate('/cart')
}, 3000);
  },[])
  
    return (
    <div className='text-3xl text-green-700 text-center'>
      Payment sucessfull redirecting to cart section ...
    </div>
  )
}

export default Sucess
