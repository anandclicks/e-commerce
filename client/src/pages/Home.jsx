import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Filter from '../components/Filter'
import ProductSection from '../components/ProductSection'
import axios from 'axios'

const Home = () => {

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