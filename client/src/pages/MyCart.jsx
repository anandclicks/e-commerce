import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CustomerContext } from '../../context/customerContext'

const MyCart = () => {
  // usestate for redirect customer in case of unautherized customer 
  const [redirect, setredirect] = useState(false)
  const navigate = useNavigate()

  // api call to set loggedin customer data into customer context 
  const {setloggedInCustomer} = useContext(CustomerContext)
useEffect(()=> {
  const apiCall = async()=> {
    const response = await axios.get('http://localhost:3000/api/v1/customer/loggedinCustomer', {withCredentials : true})
    if(response.data.sucess) {
      setloggedInCustomer(response.data.user)
    }
  }
  apiCall()
},[])


  // usestate for saving user's data 
  const [loggedInCustomerCartData, setloggedInCustomerCartData] = useState([])
console.log(loggedInCustomerCartData)
  // cnst api call 
 useEffect(()=> {
  const apiCll = async()=> {
    const response = await axios.get('http://localhost:3000/api/v1/customer/get-cart-prodcut',{withCredentials : true})
    console.log(response.data.user.cartItem)
    if(!response.data.sucess) {
      setredirect(true)
    }
    if(response.data.sucess) {
      setloggedInCustomerCartData(response.data.user.cartItem)
    }
  }
  apiCll()
 },[])

//  api call but this time to get updated data 
const apiCll = async()=> {
  const response = await axios.get('http://localhost:3000/api/v1/customer/get-cart-prodcut',{withCredentials : true})
  if(!response.data.sucess) {
    setredirect(true)
  }
  if(response.data.sucess) {
    setloggedInCustomerCartData(response.data.user.cartItem)
  }
}

//  function for redirection in case of unautherized customer 
if(redirect) {
  navigate('/login')
}


// api call for adding this prodcut into loggedin in customer cart 
const addToCartApiCall = async(id)=> {
  console.log(id)
  const response = await axios.post("http://localhost:3000/api/v1/customer/add-to-cart",{id},{withCredentials : true})
  apiCll()
  console.log(response.data.messege)
}
console.log(loggedInCustomerCartData)

  return (
    <div className='cartWrapper'>
      <div className="cartPage flex">
        {/* itenms wrapper  */}
        <div className="cartLeftSide">
          <h1 className='text-2xl mb-3'>Your cart item</h1>
         {loggedInCustomerCartData?.map((item,index)=> (
           <Link to={`/product/${item._id}`} key={index} className="specificProdcutCartOfCartArray mb-3 rounded-md p-1 flex justify-between items-center">
           {/* image and title  */}
           <div className="imageAndTitle w-[300px] h-full flex gap-2 items-center">
           <img className='h-[100%] object-cover rounded-md' src={item?.Images[0]} alt="" />
           <div>
             <h2>{item.title}</h2>
           </div>
           </div>
           {/* price  */}
           <p>$ {item.salePrice}</p>
           {/* remvoe icon  */}
           <div onClick={(evt)=> {
            evt.stopPropagation()
            evt.preventDefault()
            addToCartApiCall(item._id)}
            } className='cursor-pointer bg-black p-3 rounded-lg'>Remove <i className="ri-close-line"></i></div>
         </Link>
         ))}
         {!loggedInCustomerCartData && (
          <div>You dont have any item in your cart!</div>
         )}
        </div>
        {/* total amount  */}
        <div className="cartRightSide p-3 pt-0">
          <h2 className='text-2xl'>Total</h2>
          <div className="calculation h-[430px] p-2 w-full bg-black border-[1px] border-stone-700 mt-3 rounded-2xl">
            {loggedInCustomerCartData?.map((item,index)=>  (
            <div className='flex justify-between'>
                <div key={index} className='flex w-[60%]'>
                <p className='text-[14px] mt-2  ps-2 px-3 bg-slate-900 py-2 rounded-md'>{item.title}</p>
                </div>
                 <div key={index} className='w-[20%]'> 
                 <p className='text-[14px] p-2  mt-2 bg-slate-900 p rounded-md'>$ {item.salePrice}</p>
                </div>
           </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCart