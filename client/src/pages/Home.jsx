import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Filter from '../components/Filter'
import ProductSection from '../components/ProductSection'
import axios from 'axios'
import { CustomerContext } from '../../context/customerContext'

const Home = () => {
  const {setloggedInCustomer} = useContext(CustomerContext)
  //  api call but this time to get updated data 
const apiCll = async()=> {
  const response = await axios.get('http://localhost:3000/api/v1/customer/get-cart-prodcut',{withCredentials : true})
  console.log(response)
  if(response.data.sucess) {
    setloggedInCustomer(response.data.user)
  }
}
useEffect(()=> {
  apiCll()
},[])

  return (
   <div className='homeWrapper mx-auto'>
   <div className="home mx-auto">
   {/* filter and products  */}
   <div className="filterAndProduct flex justify-between">
    {/* <Filter/> */}
    <ProductSection/>
   </div>
   </div>
   </div>
  )
}

export default Home