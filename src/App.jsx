import {React , useLayoutEffect} from 'react'
import './App.css'
import Nav from './components/Nav'
import Home from './pages/home/home.jsx'
import Footer from './components/footer.jsx'
import { Routes,Route, useLocation } from 'react-router-dom'
import SignIn from './pages/Authentication/SignIn.jsx'
import Register from './pages/Authentication/Register.jsx'
import SingleItem from './pages/individualProduct/SingleItem.jsx'
import Cart from './pages/cart/cart.jsx'
import Seller from './pages/sellers/Seller.jsx'
import TopSales from './pages/hamBurger pages/TopSales.jsx'
import Groceries from './pages/hamBurger pages/Groceries.jsx'
import Toys from './pages/hamBurger pages/Toys.jsx'
import Fashion from './pages/hamBurger pages/Fashion.jsx'
import Electronics from './pages/hamBurger pages/Electronics.jsx'
import Help from './help & payment/Help.jsx'
import UserProfile from './pages/profiles/userProfile.jsx'
import AdminProfile from './pages/profiles//admin/admin.jsx'
import Sucess from './pages/cart/buySection/sucess.jsx'
import Cancel from './pages/cart/buySection/cancel.jsx'



const App = () => {
const {pathname} = useLocation();

useLayoutEffect(()=>{
  window.scrollTo({top:1 , behavior:'smooth'})
},[pathname])
  
  return (
    <>
      <Nav/>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/login' Component={SignIn}/>
        <Route path='/register' Component={Register}/>
        <Route path='/product/:id' Component={SingleItem}/>
        <Route path='/cart' Component={Cart}/>
        <Route path='/sellers' element={<Seller/>}/>
        <Route path='/topSales' Component={TopSales}/>
        <Route path='/groceries' Component={Groceries}/>
        <Route path='/toys' Component={Toys}/>
        <Route path='/Fashions' Component={Fashion}/>
        <Route path='/Electronics' Component={Electronics}/>
        <Route path='/help' Component={Help}/>
        <Route path='/profile' Component={UserProfile}/>
        <Route path='/admin' Component={AdminProfile}/>
        <Route path='/payment/sucess' Component={Sucess}/>
        <Route path='/payment/cancel' Component={Cancel}/>
        
      </Routes>
      <Footer/>
    </>
  )
}

export default App
