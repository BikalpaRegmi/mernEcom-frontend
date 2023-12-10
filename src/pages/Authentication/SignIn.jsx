import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye ,FaEyeSlash} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../axiosConfig';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../../context/contextProvider';

axios.defaults.withCredentials = true;

function SignIn() {
    const[eye,setEye] = useState(true);
    const[icon,setIcon] = useState(<FaEyeSlash/>)
    const [type,setType] = useState('password')
    const [inputUser,setInputUser] = useState({
        email:'',
        password:'',
    })
    const {account,setAccount} = useContext(LoginContext)
    const navigate = useNavigate()

    const toggleEye = () =>{
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
  setInputUser({...inputUser , [event.target.name]:event.target.value})
}
const SignIn = async(event)=>{
  event.preventDefault();
  if(inputUser.email==='' || inputUser.password==='') toast.warn('Plz fill both fields')
  else{

try {
  const response = await axios.post('/signIn' , inputUser) ;

  if (response.data.error ==='Email not found plz Register') {
    toast.error(response.data.error)
  } 
  else if (response.data.error == 'Wrong password') {
    toast.error(response.data.error)
  } 
  else if (response.data.msg ==='Sign-in successful'){
    toast.success('Login sucessful')
    setAccount(response.data);
    setTimeout(() => {
      navigate('/')
      window.location.reload()
    }, 3000);
  }

}catch (error) {
  console.log(error)
}
  }
}
useEffect(()=>{
  console.log(document.cookie)
},[])
  return (
    <>
    <div className="wrapper w-96 mt-9 mx-auto ">
        <div className="image">
         <img src="download1.png" alt="" className='mx-auto w-40'/>
        </div>

        <div className="box shadow-lg shadow-red-300 font-bold mx-3">
          <h1 className='text-3xl text-center py-5 text-red-700'>Sign-In</h1>
           <p className='text-xl flex flex-col p-3'> Email :  <input type='text' name='email' onChange={handleChange} value={inputUser.email} className='border-2 h-12 focus:outline-red-500'/> </p> 
           <p className='text-xl flex flex-col p-3 f'> Password : <span className='flex justify-between'>
             <input type={type} name='password' onChange={handleChange} value={inputUser.password} className='border-2 h-12 focus:outline-red-500'/><span className='self-center' onClick={toggleEye}>{icon}</span>  </span></p> 
           
           <button className='bg-red-700 text-white px-7 py-2 rounded-3xl ml-3 hover:rounded-2xl ' onClick={SignIn}>SignIn</button>
           
        </div>

        <div className="bottom text-slate-500 mt-7 text-center">
         <p>New to Bikalpa E-commerce? </p>
        <Link to={'/register'}> <button className='border-2 border-red-700 bg-slate-100 text-red-900 px-3 py-1 font-semibold rounded-xl hover:border-red-500 mt-3'> Create an account</button></Link> 
        </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default SignIn
