import React, { useContext, useEffect, useState } from 'react'
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
  return (
    <div className='myProfileWrapper'>
      <div className="myProfile">
        <div className="information">
          {/* image and name  */}
          <div className="imageAndIfnfo flex gap-2">
            <img className='w-[50px] rounded-full' src={loggedinCustomerData?.profilePicture} alt="" />
            <div className="info">
              <h2 className='text-xl'>{loggedinCustomerData?.fullName}</h2>
              <p className='text-sm leading-3'>{loggedinCustomerData?.emailAddress} </p>
            </div>
          </div>
          {/* address adding for  */}
          <AddNewAddress setloggedinCustomerData={setloggedinCustomerData}/>
        </div>

      </div>
    </div>
  )
}

export default Profile