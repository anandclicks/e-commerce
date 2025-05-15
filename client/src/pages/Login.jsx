import React, { useState } from 'react'
import LoadingDiv from '../components/LoadingDiv'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  // use state for display error if comes 
  const [errorMeaaege, seterrorMeaaege] = useState(null)

  
  // use state for loading div and login status 
  const [loadingDivState, setloadingDivState] = useState(null)
  const [loginStatus, setloginStatus] = useState(null)


  // usestate for login data handling 
  const [loginData, setloginData] = useState({
    emailAddress : '',
    password : ''
  })


  const handleInputData = (evt)=> {
    setloginData(prev => ({...prev, [evt.target.name] : evt.target.value}))
  }


  // handling api call 
  const apiCall = async(evt)=> {
    setloadingDivState(()=> true)
    evt.preventDefault()
    const response = await axios.post('http://localhost:3000/api/v1/user/login',loginData,{withCredentials : true})
    // if Credentials are wrong or erros comes becuase of any reason
    if(!response.data.sucess) {
      seterrorMeaaege(response.data.messege)
    }
    // if everthing is fine 
    if(response.data.sucess) {
      setloginStatus(()=> true)
    }
    setloadingDivState(()=> false)
  }


  const navigate = useNavigate()
  {loginStatus && (
    navigate('/dashbord')
  )}


  return (
    <div className='loginWrapper h-screen w-full bg-black '>
      {loadingDivState && (
        <LoadingDiv/>
      )}
        <div className="loginContainer flex justify-center items-center h-full">
        <form onSubmit={(evt)=> apiCall(evt)} className='border-[1px] border-stone-800 p-5 rounded-lg'>
        <h1 className='text-2xl'>Login to <span className='text-green-500'>Admin</span> Dashbord</h1>
        <div className='form'>
          <input onChange={(evt)=> handleInputData(evt)} required type="email" name='emailAddress'value={loginData.emailAddress} placeholder='Email Id' />
          <input onChange={(evt)=> handleInputData(evt)} required type="text" name='password' value={loginData.password} placeholder='Password' />
          {/* error messege  */}
          {errorMeaaege && (
            <div className='mt-2'><p className='text-red-600'>{errorMeaaege}</p></div>
          )}
        </div>
          <input type="submit" className='bg-green-600 cursor-pointer w-[400px] h-[50px] mt-5 rounded-md' value={'Submit'} />
        </form>
        </div>
    </div>
  )
}

export default Login