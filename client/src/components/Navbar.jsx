import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CustomerContext } from '../../context/customerContext'

const Navbar = () => {
  // getting value of loggedin customer 
  const {loggedInCustomer} = useContext(CustomerContext)
  return (
   <div className="navbarWrapper">
     <div className='navbar'>
        {/* logo  */}
        <Link to={'/'} className="logo flex flex-col leading-3">
            <h1 className='text-[20px]'>ᗩᑎᗩᑎᗪ ᑕᒪIᑕKᔕ</h1>
            <p>_________________________</p>
        </Link>
        {/* search box  */}
    
        {/* cart and like item  */}
       <div className="allBtns flex items-center justify-end gap-3 w-[40%]">
      {loggedInCustomer ?  <Link to={'/my-cart'} className="cartBtn"><i className="ri-shopping-bag-4-fill"></i> Cart</Link> : ""}
       {/* {loggedInCustomer ? <Link to={'/like'} className="loginBtn"><i className="ri-heart-line"></i> Like</Link> : ''} */}
       {!loggedInCustomer ? <Link to={'/login'} className="loginBtn"><i className="ri-user-3-line"></i>Login</Link> : ''}
       {loggedInCustomer ? <Link to={'/my-profile'} className="profieBtn"><i className="ri-user-3-line"></i>{loggedInCustomer.fullName}</Link> : ""}
       </div>
       {/* <div onMouseEnter={()=> mouseEnterHandler(true)} onMouseLeave={()=> mouseLeaveHandler(false)}  className={`${searchBg ? 'searchResult' : 'hideSearchBG'}`}>
        <Link to={'/main'}>Click me to go to main</Link>
       </div> */}
    </div>
   </div>
  )
}

export default Navbar