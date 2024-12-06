import React, { useContext, useEffect, useState } from 'react'
import AdminOrder from '../components/AdminOrderCard'
import AdminProductsCard from '../components/AdminProductsCard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AdminDashborContext } from '../../context/AdminDahbord'
const Dashbord = () => {
  const {setDashbordloggedInUser,DashbordloggedInUser,redirectState} = useContext(AdminDashborContext)

  // redirect emement 
  const navigate = useNavigate()
  {redirectState && (
    navigate('/login')
  )}
  return (
    <div className='dashbordWrapper'>
        <div className="adminContainer h-full">
        <div className="allProductsWrapper min-h-[50%]">
          <h2 className='dashBordTitle'>Your all Produts</h2>
          <div className="allProducts pt-5">
            <AdminProductsCard/>
          </div>
         </div>
        <div className="allOrdersWrapper ">
          <h2 className='dashBordTitle'>Your all Orders</h2>
          <div className="allOrders pt-5">
            <AdminOrder/>
          </div>
         </div>
        </div>
    </div>
  )
}

export default Dashbord