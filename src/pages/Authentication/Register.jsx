import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { FaEye ,FaEyeSlash} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../../axiosConfig';

const Register = () => {
  const navigate = useNavigate()
  const[eye,setEye] = useState(true);
  const[icon,setIcon] = useState(<FaEyeSlash/>)
  const [type,setType] = useState('password')
  const[inputUser,setInputUser] = useState({
    name:'',
    phoneNo:'98',
    email:'',
    password:'',
    confPassword:'',
  })

 const toggleEye = ()=>{
 if(eye ===true){
  setIcon(<FaEye className='cursor-pointer'/>)
  setType('text')
  setEye(false)
 }
 else{
  setIcon(<FaEyeSlash className='cursor-pointer'/>)
  setType('password')
  setEye(true)
 }
 }
const handleChange = (event) =>{
  setInputUser({...inputUser , [event.target.name] : event.target.value})
}
const register = async(event)=>{
  event.preventDefault()
  try {
   const response =  await axios.post('/register' , inputUser);
    if(inputUser.confPassword !== inputUser.password){
      toast.error(`password didn't matched`)
    } else if (inputUser.name ==='' || inputUser.confPassword==='' || inputUser.password==='' || inputUser.email===''){
      toast.warn('Every field must be filled')
    } else if (response.data === 'E-mail already exists') {
      toast.warning(response.data) 
    }
  else if (inputUser.password.length < 7) toast.error('password must be atleast 7 character ')
    else if (response.data.name ==='ValidationError'){
      toast.error('Invalid email')
    } else if (response.data.msg ==='User registered sucessfully') {
      toast.success('Registeration sucessfull now login')
    setTimeout(() => {
      navigate('/login')
    }, 3000);
    }
       
  } catch (error) {
  
     console.log(error)
  }
}

  return (

   <>
     <div className="wrapper w-96 mx-auto ">
        <div className="image">
         <img src="download1.png" alt="" className='mx-auto w-40'/>
        </div>

        <div className="box shadow-lg shadow-red-300 font-bold mx-3">
          <h1 className='text-3xl text-center py-5 text-red-700'>Register</h1>
          <p className='text-xl flex flex-col p-3'> Full Name :  <input type='text' onChange={handleChange} value={inputUser.name} name='name' className='border-2 h-12 focus:outline-red-500'/> </p> 
          <p className='text-xl flex flex-col p-3'> Phone no :  <input type='Number' onChange={handleChange} value={inputUser.phoneNo} name='phoneNo' className='border-2 h-12 focus:outline-red-500'/> </p> 
           <p className='text-xl flex flex-col p-3'> Email :  <input type='email' onChange={handleChange} value={inputUser.email} name='email' className='border-2 h-12 focus:outline-red-500'/> </p> 
           <p className='text-xl flex flex-col p-3 f'> Password : <span className='flex justify-between'>  <input type={type} onChange={handleChange} value={inputUser.password} name='password' className='border-2 h-12 focus:outline-red-500'/><span className='self-center' onClick={toggleEye}>{icon}</span>  </span></p> 
           <p className='text-xl flex flex-col p-3 f'> Confirm Password : <span className='flex justify-between'>  <input type={type} onChange={handleChange} value={inputUser.confPassword} name='confPassword' className='border-2 h-12 focus:outline-red-500'/> <span className='self-center' onClick={toggleEye}>{icon}</span> </span></p> 
           <button className='bg-red-700 text-white px-7 py-2 rounded-3xl ml-3 hover:rounded-2xl ' onClick={register}>Create account</button>
        </div>

        <div className="bottom text-slate-500 mt-7 text-center">
         <p>Already have an account? </p>
        <Link to={'/login'}> <button className='border-2 border-red-700 bg-slate-100 text-red-900 px-3 py-1 font-semibold rounded-xl hover:border-red-500 mt-3'> Login to account</button></Link> 
        </div>
    </div>
    <ToastContainer/>
   </>
  )
}

export default Register
