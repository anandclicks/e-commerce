import React, { useContext } from 'react'
import { AdminDashborContext } from '../../context/AdminDahbord'
import { Link } from 'react-router-dom'

const AdminProductsCard = () => {
  const {DashbordloggedInUser} = useContext(AdminDashborContext)
  return (
    <div>
  {DashbordloggedInUser?.porducts?.map((item,index)=> (
     <Link to={`/product/${item._id}`} key={index} className='orderGlamps p-2 flex justify-between mt-3'>
     <div className="imageAndDetails h-full flex gap-2 items-center">
     <img className='h-full object-cover rounded-lg' src={item.Images?.[0]} alt="" />
     <div className="nameAndDips">
       <h2>{item.title}</h2>
       <p>Quentity : 1</p>
       <p>Price : ${item.salePrice}</p>
     </div>
     </div>
     <div className="status flex items-center gap-1">
         <img className='h-[13px]' src="/redDot.png" alt="" />Live
       </div>
   </Link>
  ))}   
    </div>
  )
}

export default AdminProductsCard