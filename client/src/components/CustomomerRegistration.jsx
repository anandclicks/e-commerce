import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../components/LoadingDiv' 


const CustomomerRegistration = () => {
  // USESTATE FOR ERROR MESSEGE 
  const [errorMessege, seterrorMessege] = useState(null)
  const navigate = useNavigate()
  // USESTATE FOR REDIRECT TO LOGIN PAGE AFTER REGITRATION 
  const [redirect, setredirect] = useState(false)
  const [loading, setloading] = useState(false)
  const [formData, setformData] = useState({
    fullName : '',
    emailAddress : '',
    number : '',
    password : ''
  })
  const handleInputData = (evt)=> {
    setformData(prev => ({...prev, [evt.target.name] : evt.target.value}))
  }
  const callApi = async(evt)=> {
    evt.preventDefault()
    setloading(true)
    const response = await axios.post('http://localhost:3000/api/v1/customer/register',formData)
    setloading(false)
    // SEVING ERROR MESSEGE TO DIAPLAY 
    if(!response.data.sucess) {
      seterrorMessege(response.data.messege)
    }
    // IF RESPONSE IS OK 
    if(response.data.sucess) {
      setredirect(()=> true)
    }
  }
  // HANDLEING NAVIGATION PART 
  useEffect(()=> {
    if(redirect) {
      navigate('/login')
    }
  },[redirect])
  return (
    <div className='customerRegistraionWrapper'>
      {loading && (
        <Loading/>
      )}
      <div className="customerRegistraion flex flex-col items-center justify-center">
        <form onSubmit={(evt)=> callApi(evt)} className='costomerRegistrationForm p-5 border-[1px] border-stone-800 rounded-md'>
        <h1 className='text-2xl pb-5'><span className='text-green-500'>Sign-up</span> to Continue shopping! </h1>
          <input onChange={(evt)=> handleInputData(evt)} value={formData.fullName} type="text" className='inputStyling' name='fullName' placeholder='Enter Full Name' />
          <input onChange={(evt)=> handleInputData(evt)} value={formData.emailAddress} type="text" className='inputStyling' name='emailAddress' placeholder='Email id'  />
          <input onChange={(evt)=> handleInputData(evt)} value={formData.number} type="number" className='inputStyling' placeholder='Mobile number' name='number' />
          <input onChange={(evt)=> handleInputData(evt)} type="text" className='inputStyling' placeholder='Password' name='password' value={formData.password} />
          {errorMessege && (
            <div><p className='text-red-600 mt-3 text-sm'>{errorMessege}</p></div>
          )}
          <input type="submit" className='w-full h-[50px] border-none border-[1px] border-stone-700 bg-green-700 rounded-md my-5 cursor-pointer' value={"Sign-up"} />
        <small><Link to={'/login'}>Go for <span className='text-green-700'>Login</span></Link></small>
        </form>
      </div>
    </div>
  )
}

export default CustomomerRegistration