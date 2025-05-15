import React, { useContext, useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import { CustomerContext } from '../../context/customerContext'
import axios from 'axios'
import AddNewAddress from '../components/AddNewAddress'

const Profile = () => {
  // API CALL FOR GETTING DATA OF LOGGEDIN CUSTOMER 
  const [loggedinCustomerData, setloggedinCustomerData] = useState(null)
  const {setloggedInCustomer} = useContext(CustomerContext)
  const apiCall = async()=> {
    const response = await axios.get('http://localhost:3000/api/v1/customer/loggedinCustomer', {withCredentials : true})
    if(response.data.sucess) {
      setloggedinCustomerData(response.data.user)
      setloggedInCustomer(response.data.user)
    }
  }
  console.log(loggedinCustomerData)
  useEffect(()=> {
    apiCall()
  },[])

  // LOGGEDIN IN USER FINAL ADDRESS 
  const [deleveryAddress, setdeleveryAddress] = useState('')
  useEffect(()=> {
    const address = `${loggedinCustomerData?.houseNumber}, ${loggedinCustomerData?.fullName}, ${loggedinCustomerData?.landmark}, ${loggedinCustomerData?.areaName}, ${loggedinCustomerData?.cityName}, ${loggedinCustomerData?.district}, ${loggedinCustomerData?.state}`
    setdeleveryAddress(address)
  },[loggedinCustomerData])
  return (
    <div className='myProfileWrapper'>
      <div className="myProfile">
        <div className="information">
          {/* image and name  */}
          <div className="imageAndIfnfo flex gap-2 items-center ">
            <img className='w-[100px] h-[100px] object-cover rounded-full border-[3px] border-white' src={loggedinCustomerData?.profilePicture} alt="" />
           <div>
           <div className="info">
              <h2 className='text-xl'>{loggedinCustomerData?.fullName}</h2>
              <p className='text-sm leading-3'>{loggedinCustomerData?.emailAddress} </p>
            </div>
             {/* CurrentAddress  */}
          <div className='text-sm mt-1'>
            {/* <h2 className='text-lg'><i class="ri-home-line"></i> Home </h2> */}
            {loggedinCustomerData?.houseNumber &&
 loggedinCustomerData?.fullName &&
 loggedinCustomerData?.landmark &&
 loggedinCustomerData?.areaName &&
 loggedinCustomerData?.cityName &&
 loggedinCustomerData?.state && (
   <p className="capitalize"><i class="ri-focus-3-line"></i> {deleveryAddress}</p>
)}

          </div>
           </div>
          </div>
          <Link to={'/login'} className="logoutBtn mt-2"><i class="ri-logout-circle-r-line"></i> Logut</Link>
          {/* address adding form  */}
          <AddNewAddress setloggedinCustomerData={setloggedinCustomerData}/>
        </div>

      </div>
    </div>
  )
}

export default Profile