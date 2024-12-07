import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingDiv from '../components/LoadingDiv'
import { data } from 'autoprefixer'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  // usestaet for hanlde handle messeges if it comes 
  const [errorMeaaege, seterrorMeaaege] = useState(null)
  // usestate for api call 
  const [registrationData, setRegistrationData] = useState({
    name : '',
    shopeName : '',
    businessNumber : '',
    emailAddress : '',
    counrtyOrigin : '',
    password : ''
  })
  // input fields data handling 
  const handleFormData = (evt)=> {
    setRegistrationData(prev => ({...prev, [evt.target.name] : evt.target.value}))
  }
  // api call 
  const [loadingDivSatus, setloadingDivSatus] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const callApi = async(evt)=> {
    evt.preventDefault()
    setloadingDivSatus(true)
    const response = await axios.post('http://localhost:3000/api/v1/user/registration',registrationData)
    // saving error messege if error occurs 
    if(!response.data.sucess) {
      seterrorMeaaege(response.data.messege)
    } 
    // if everyting is okay 
    if(response.data.sucess) {
      setRegistrationComplete(true)
    }
    setloadingDivSatus(false)
    console.log(response)
  }
//  navigate to login page 
const navigate = useNavigate()
useEffect(()=> {
  if(registrationComplete) {
    navigate('/vandor/login')
  }
},[registrationComplete])
  return (
    <>
     {loadingDivSatus && ( 
        <LoadingDiv/>
      )}
        <div className='registerFormWrapper h-screen w-full bg-black'>
      <div className="registerFormContainer flex justify-center items-center h-full">
        <form onSubmit={(evt)=> callApi(evt)} className='border-[1px] border-stone-800 p-5 rounded-lg'>
        <h1 className='text-2xl'>Register to Sale your <span className='text-green-500'>Product</span> to <br /> World!</h1>
        <div className='form'>
          <input required onChange={(evt)=> handleFormData(evt)} type="text" name='name' value={registrationData.name} placeholder='Your Full name' />
          <input required onChange={(evt)=> handleFormData(evt)} type="text" name='shopeName' value={registrationData.shopeName} placeholder='Your Company name' />
          <input required onChange={(evt)=> handleFormData(evt)} type="text" name='businessNumber' value={registrationData.businessNumber} placeholder='Business Number' />
          <input required onChange={(evt)=> handleFormData(evt)} type="email" name='emailAddress' value={registrationData.emailAddress} placeholder='Email Id' />
          <input required onChange={(evt)=> handleFormData(evt)} type="text" name='counrtyOrigin' value={registrationData.counrtyOrigin} placeholder='Your Country' />
          <input required onChange={(evt)=> handleFormData(evt)} type="text" name='password' value={registrationData.password} placeholder='Your password' />
          {/* error messeg  */}
          {errorMeaaege && (
            <div className='mt-2'><p className='text-red-600'>{errorMeaaege}</p></div>
          )}
        </div>
          <input type="submit" className='bg-green-600 w-full cursor-pointer h-[50px] mt-5 rounded-md' value={'Submit'} />
        </form>
      </div>
    </div>
    </>
  
  )
}

export default Register