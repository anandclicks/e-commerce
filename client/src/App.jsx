import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductSpecificPage from './pages/ProductSpecificPage'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashbord from './pages/Dashbord'
import AdminNavbar from './components/AdminNavbar'
import AddNewProduct from './pages/AddNewProduct'
import CustomomerRegistration from './components/CustomomerRegistration'
import CustomomerLogin from './components/CustomomerLogin'
import MyCart from './pages/MyCart'
import Profile from './pages/Profile'
function App() {

  return (
   <>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.5.0/remixicon.css" integrity="sha512-6p+GTq7fjTHD/sdFPWHaFoALKeWOU9f9MPBoPnvJEWBkGS4PKVVbCpMps6IXnTiXghFbxlgDE8QRHc3MU91lJg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
  {/* Navbar  */}
   <Routes>
    <Route path='/' element={<><Navbar/><Home/></>}/>
    <Route path='/product/:id' element={<><Navbar/><ProductSpecificPage/></>}/>
    <Route path='/vandor/register' element={<Register/>}/>
    <Route path='/vandor/login' element={<Login/>}/>
    <Route path='/dashbord' element={<> <AdminNavbar/><Dashbord/></>}/>
    <Route path='/dashbord/upload-product' element={<><AdminNavbar/><AddNewProduct/></>}/>
    <Route path='/signup' element={<><CustomomerRegistration/></>}/>
    <Route path='/login' element={<><CustomomerLogin/></>}/>
    <Route path='/my-cart' element={<><Navbar/><MyCart/></>}/>
    <Route path='/my-profile' element={<><Navbar/><Profile/></>}/>
   </Routes>
   </>
  )
}

export default App
