import React, { useContext } from 'react'
import { AdminDashborContext } from '../../context/AdminDahbord'
import { Link } from 'react-router-dom'

const AdminOrder = () => {
  const {DashbordloggedInUser} = useContext(AdminDashborContext)
  // if (!seller || !Array.isArray(seller)) {
  //   return <p>No orders available</p>;
  // }
  return (
   <div>
    {DashbordloggedInUser?.Allorders?.map((item,index)=>(
       <Link to={`/dashbord/order/${item._id}`} key={index} className='orderGlamps p-2 flex justify-between mt-3'>
       <div className="imageAndDetails h-full flex gap-2 items-center">
       <img className='h-full object-cover rounded-lg' src={item.images[0]} alt="" />
       <div className="nameAndDips">
         <h2>{item.title}</h2>
         <p>Quentity : 1</p>
         <p>Price : ${item.price}</p>
       </div>
       </div>
       <div className="status flex items-center gap-1">
         <img className='h-[13px]' src="/greenDot.png" alt="" />{item.status}
       </div>
     </Link>
    ))}
   </div>
  )
}

export default AdminOrder