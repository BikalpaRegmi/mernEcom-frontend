import React, { useState } from 'react'
import axios from '../../../axiosConfig';
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Seller = () => {
    const navigate = useNavigate()
    const [fields,setFields] = useState({
        image :'',
        title :'',
        price :'',
        discount :'',
        Description :'',
        category :'',
    })
    const [previewImage, setPreviewImage] = useState(null);

   

    const handleFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setFields({...fields,image: event.target.files[0]});
            const imageURL = URL.createObjectURL(event.target.files[0]);
            setPreviewImage(imageURL);
        } else {
            console.log("No file selected");
        }
    };
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', fields.image);
        formData.append('title', fields.title);
        formData.append('price', fields.price);
        formData.append('discount', fields.discount);
        formData.append('Description', fields.Description);
        formData.append('category', fields.category);

       

        try {
            const res = await axios.post('/createProduct', formData);
            console.log(res.data);

            if(fields.image ==='' || fields.title==='' || fields.price==='' || fields.Description===''){
                toast.error('Oops! a field is empty')
               }else {
                toast.success('Adding product...')
                setTimeout(() => {
                    navigate('/')         
                }, 3333);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        if (event.target.name === 'discount') {

            setFields({ ...fields, [event.target.name]: event.target.value.slice(0,2) });
        } else {

            setFields({ ...fields, [event.target.name]: event.target.value });
        }
    };
   
    return (
    <div>
      <div className="container m-auto ">
      <h1 className='text-5xl rounded-3xl bg-gradient-to-r text-white font-serif from-red-300 to-red-700 text-center md:mx-96 shadow-sm shadow-black mb-9 pb-2 pt-3 mx-7 my-3'><span className='text-green-800'>Sell</span> a Product</h1>
        <div className="image mx-auto font-semibold w-96 shadow-sm">
        <h1 className='text-5xl text-red-700 pb-16'>Create a Product</h1>
        <h1 className='text-3xl ml-7'>Product Image : </h1>
       {
           previewImage===null ?
        <img src="download3.png" alt="" className='ml-5 w-36'/> :  <img src={previewImage} alt="" className='ml-5 w-36'/> 
       }
         <input type="file" onChange={handleFile} className='ml-7 mt-3'/>       
 </div>
 <div className="others mx-auto font-semibold w-96 shadow-sm shadow-slate-300 pb-3"> 
    <p className='text-3xl my-5 ml-7'>Product Name : <input type='text' value={fields.title} onChange={handleChange} name='title' className='border-2 w-80 text-lg pl-3 capitalize'/></p>
    <p className='text-3xl my-5 ml-7'>Product Price $ : <input type='number' value={fields.price} onChange={handleChange} name='price' className='border-2 w-80 text-lg pl-3'/></p>
    <p className='text-3xl my-5 ml-7'>Product Discount % : <input type='number' maxLength='2' value={fields.discount} onChange={handleChange} name='discount' placeholder='(optional)' className='border-2 w-80 text-lg pl-3'/></p>
    <p className='text-3xl my-5 ml-7'>Product Description : <input type='text' value={fields.Description} onChange={handleChange} name='Description' className='border-2  w-80 text-lg pl-3'/></p>
    <p className='text-3xl my-5 ml-7'>Product Category : 
    <select name='category' className='text-xl mt-1 border-orange-500 border-2 p-3 font-bold cursor-pointer' onChange={handleChange}>
    <option value="" disabled selected hidden>Select category</option>
        <option value="Electronics" >Electronics</option>
        <option value="Groceries">Groceries</option>
        <option value="Fashions">Fashions</option>
        <option value="Toys">Toys</option>
        <option value="TopSales">Others</option>
    </select> </p>
 </div>
      </div>
         
           <button className='shadow-md md:ml-[450px] sm:ml-64 ml-16 mt-7 border-2 px-3 h-12 hover:shadow-lg bg-slate-300 rounded-3xl  w-64 text-3xl' onClick={handleSubmit}>Sell Product</button>
          
         <ToastContainer/>
    </div>
  )
}

export default Seller
