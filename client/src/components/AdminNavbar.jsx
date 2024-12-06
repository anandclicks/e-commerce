import React, { useContext, useEffect } from 'react'
import { AdminDashborContext } from '../../context/AdminDahbord'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminNavbar = () => {
      const navigate = useNavigate()
    const {DashbordloggedInUser,setredirectState,setDashbordloggedInUser,redirectState,handleRedirectState} = useContext(AdminDashborContext)
    const apiCall = async()=> {
      const response = await axios.get('http://localhost:3000/api/v1/user/userAuthetication', {withCredentials : true})
      console.log(response)
      // setting value to context provider \
      setDashbordloggedInUser(()=> response.data.user)
      if(!response.data.status) {
        handleRedirectState(true)
        console.log("it should have redirected")
      }
      else {
        handleRedirectState(false)
        console.log("it should'nt have redirected")
      }
    }
    useEffect(() => {
      apiCall()
    }, [])
    // redirect component if user is not logged in 
    useEffect(() => {
      if (redirectState) {
          navigate('/login');
      }
  }, [redirectState, navigate]);
  return (
  <div className='bg-black text-white'>
      <div className='max-w-[1400px] mx-auto h-[100px] flex items-center justify-between'>
        <div className="logo">
           <h1 className='leading-3 text-xl'> <p className='text-stone-500 text-sm'>Admin Dashbord</p> ᗩᑎᗩᑎᗪ ᑕᒪIᑕKᔕ</h1>
           <p className='leading-3'>_________________________</p>
        </div>
        <div className='flex items-center gap-3'>
        <div className="userIdInfo flex items-center gap-2 cursor-pointer bg-[#161616ba] p-2 rounded-lg">
            <img className='h-[50px] w-[50px] rounded-full' src={DashbordloggedInUser?.profilePicture} alt="" />
            <div className="nameAndEmial">
            <p className='leading-3'>{DashbordloggedInUser?.name}</p>
            <small>{DashbordloggedInUser?.emailAddress}</small>
            </div>
        </div>
        <Link to={'/dashbord/upload-product'} className="uploadBtn"><i className="ri-upload-cloud-2-fill"></i> Upload Product</Link>
        </div>
    </div>
  </div>
  )
}

export default AdminNavbar