import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingDiv from './LoadingDiv'
import { CustomerContext } from '../../context/customerContext'

const CustomomerLogin = () => {
  // GETTING METHOD FROM CUSTOMER CONTEXT 
  const {setloggedInCustomer} = useContext(CustomerContext)
  // USE STAET FOR DIAPLAY ERROR MESSEG 
  const [errorMessege, seterrorMessege] = useState(null)
  // USESTAE FOR REDIRECTION IN CASE OF SUCESS MESSEG 
  const navigate = useNavigate()
  const [redirect, setredirect] = useState(false)
  const [loading, setloading] = useState(false)
  const [formData, setformData] = useState({
    emailAddress : '',
    password : ''
  })
  const handleInputData = (evt)=> {
    setformData(prev => ({...prev, [evt.target.name] : evt.target.value}))
  }

  const callApi = async(evt)=> {
    evt.preventDefault()
    setloading(true)
    const response = await axios.post('http://localhost:3000/api/v1/customer/login',formData,{withCredentials : true})
    setloading(false)
    // IF ERROR OCCURS 
    if(!response.data.sucess) {
      seterrorMessege(response.data.messege)
    }
    // IF CUSTOMER LOGGED IN SUCCESFULLY 
    if(response.data.sucess) {
      setloggedInCustomer(response.data.customer)
      setredirect(()=> true)
    }
  }
  // HANDLEING NAVIGATION PART 
  useEffect(()=> {
    if(redirect) {
      navigate('/')
    }
  },[redirect])
  return (
    <div className='customerloginWrapper'>
      {loading && (
        <LoadingDiv/>
      )}
    <div className="customerLogin flex flex-col items-center justify-center">
      <form onSubmit={(evt)=> callApi(evt)} className='costomerLoginForm p-5 border-[1px] border-stone-800 rounded-md w-[400px]'>
      <h1 className='text-2xl pb-5'><span className='text-green-500'>Loin to</span> Continue shopping! </h1>
        <input onChange={(evt)=> handleInputData(evt)} value={formData.emailAddress} type="text" className='inputStyling' name='emailAddress' placeholder='Email address' />
        <input onChange={(evt)=> handleInputData(evt) } type="text" className='inputStyling' name='password' placeholder='Password' value={formData.password} />
        {errorMessege && (
          <div><p className='text-red-600 mt-2 text-sm'>{errorMessege}</p></div>
        )}
        <input type="submit" className='w-full h-[50px] border-none border-[1px] border-stone-700 bg-green-700 rounded-md my-5 cursor-pointer' value={"Sign-in"} />
      <small><Link to={'/signup'}>Go for <span className='text-green-700'>Sign-up</span></Link></small>
      </form>
    </div>
  </div>
  )
}

export default CustomomerLogin