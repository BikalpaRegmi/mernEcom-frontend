import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

const Cancel = () => {
    const navigate = useNavigate()

   
    useEffect(()=>{
        setTimeout(() => {
            navigate('/cart')
            window.location.reload()
        }, 3000);
          },[])
    return (
     <div className='text-3xl text-red-700 text-center'>
        Payment Cancelled redirecting to cart section ...
      </div>
  )
}

export default Cancel
