import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../context/productContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CustomerContext } from '../../context/customerContext'
import { ToastContainer, toast } from 'react-toastify'


const Product = () => {
    const navigate = useNavigate()
    // USE STATE FOR REDIRECT THE USER  
    const [redirectState, setredirectState] = useState(false)
    const {allProdcuts,category} = useContext(ProductContext)
    const [productData, setproductData] = useState(allProdcuts)

    // GETTING FUNCTION AND DATA OF LOGGEDIN CUSTOMER 
    const {loggedInCustomer,setloggedInCustomer} = useContext(CustomerContext)

    //SHOW RESPONSE 
       const showResponse = (msg, time) => {
        toast(msg,{
          theme : 'dark',
          autoClose : time
        })
       };

    // USESTATE FOR GETTING ALL PRODCUTAS 
    useEffect(()=> {
        const apiCall = async()=> {
            const response = await axios.get('http://localhost:3000/api/v1/product/all-product')
            if(response.data.sucess) {
                setproductData(()=> response.data.allProdcuts)
            }
        }
        apiCall()
    },[])


    // FUCTION FOR LIKE THE PRIDCUT 
        const apiCallForLikeProduct = async(itemId)=> {
            const response = await axios.post('http://localhost:3000/api/v1/customer/likeProduct',{itemId},{withCredentials : true})
            console.log(response)
            // SAVING LOGGEDIN CUSTOMER DATA INTO CUSTOMER CONTEXT FUNCTION 
            if(response.data.sucess) {
                setloggedInCustomer(response.data.data)
                showResponse(response.data.messege,1500)
            }
            if(!response.data.sucess) {
                setloggedInCustomer(response.data.data)
                 showResponse(response.data.messege,1500)
                setTimeout(() => {
                    setredirectState(true)
                }, 1500);
            }
        }



        
    // FUNCTION TO INTRACT WITH LIKE BTN 
    const handleLikedProdcut = (evt,itemId)=> {
        evt.target.classList.toggle('liked')
        apiCallForLikeProduct(itemId)
    }



    // REDIRECTION HANDLEING 
   useEffect(()=> {
    if(redirectState) {
        console.log(redirectState)
        navigate('/login')
    }
   },[redirectState])
  return (
   <div className='productsWrapper flex gap-2 flex-wrap justify-center'>
     {productData && (
        <div className='flex flex-wrap gap-5 '>
            {productData?.map((item,index)=> (
                <Link to={`/product/${item._id}`} key={index} className='product p-3 cursor-pointer'>
                <img className='h-[350px] w-full object-cover rounded-md prodcutImage' src={item.Images[0]} alt="" />
                {/* like icon  */}
                <i onClick={(e)=> {
                    e.preventDefault();
                    e.stopPropagation()
                    handleLikedProdcut(e,item._id)
                    }} className={`ri-heart-line likeIonOnProductCard ${loggedInCustomer?.likedProdcut.includes(item._id) ? "liked" : ""}`}></i>
                {/* best selller  */}
                {item.bestSeller && (
                    <div className="bestSeller">Best Seller <i className="ri-bard-fill"></i></div>
                )}
                <h4 className='productTitle h-[10%]'>{item.title}</h4>
                <div className="priceAndBtns flex w-full justify-between">
                    <div className="price">
                        <small className='leading-3 text-gray-300'>Price :</small>
                        <p className='leading-3 text-[18px]'>${item.salePrice}</p>
                    </div>
                    <div className="viewProdcutBtn ">
                        View <i className="ri-arrow-right-up-line"></i>
                    </div>
                </div>
            </Link>
            ))}
        </div>
     )}
    <ToastContainer/>
   </div>
  )
}

export default Product