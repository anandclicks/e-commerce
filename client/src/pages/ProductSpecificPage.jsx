import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../../context/productContext'
import axios from 'axios'

const ProductSpecificPage = () => {
    // this is for show avalable size 
    const avalableSize =  ["S","M","L", "XL", "XXL"]
    // getting product id for this page
    const {id} = useParams()
        // usestate for product details for this file 
        const [prodcutDetails, setprodcutDetails] = useState()
    // api call for prodcut details 
    useEffect(()=> {
       const apiCall = async()=> {
        const response = await axios.get(`http://localhost:3000/api/v1/product/details/${id}`)
        if(response.data.sucess) {
            setprodcutDetails(()=> response.data.product)
        }
       }
       apiCall()
    },[])
  return (
    <div className='productPageWrapper'>
        {/* if product data not found  */}
        { !prodcutDetails  && (
            <div>Product not found</div>
        )}
        {/* if i have product data  */}
        {prodcutDetails && (
            <div className="prodctuPage">
                {/* prodcur imageGallery side  */}
                <div className="leftSide">
                    <div className="imageGallery">
                        <div className="smallImages">
                            <div className="miniImg">
                                <img src={prodcutDetails.Images[4]} alt="" />
                            </div>
                            <div className="miniImg">
                            <img src={prodcutDetails.Images[1]} alt="" />
                            </div>
                            <div className="miniImg">
                            <img src={prodcutDetails.Images[2]} alt="" />
                            </div>
                            <div className="miniImg">
                            <img src={prodcutDetails.Images[3]} alt="" />
                            </div>
                        </div>
                        <div className="bigImage mt-2">
                        <img src={prodcutDetails.Images[0]} alt="" />
                        </div>
                    </div>
                    <div className="ctaButtons mt-10 flex gap-5">
                        <div className="buyNow ctaBtns"><i className="ri-shopping-cart-fill"></i> Buy now</div>
                        <div className="addToCart ctaBtns"><i className="ri-shopping-bag-fill"></i>Add to Cart</div>
                    </div>
                </div>
                {/* prodcut details side  */}
                <div className="rightSide">
                    {/* product details  */}
                    <div className="titleAndPrice">
                        <h2 className='titleOfProduct'>{prodcutDetails.title}</h2>
                        <h3 className='salePrice'>${prodcutDetails.salePrice} <small className='text-red-600 line-through'>{prodcutDetails.price}</small></h3>
                        <div className='mt-3'>{prodcutDetails.bestSeller && (
                            <div className='bestSellr '>Best Seller<i className="ri-bard-fill"></i></div>
                        )}</div>
                        <p>{prodcutDetails.deleveryCharge>0 ? <div className='text-sm mt-2'><i className="ri-truck-fill"></i> Delevey chareg :  ${prodcutDetails.deleveryCharge}</div> : <div className='text-sm mt-2'><i className="ri-truck-fill"></i> Free Delevery</div>}</p>
                    </div>
                    <div className="sizesAvalable">
                        <div className="allSize flex items-center gap-3">
                        {/* {prodcutDetails.avalableSize?.map((item,index)=> (
                            <div key={index} className='size'>{item}</div>
                        ))} */}
                         {avalableSize.map((item,index)=> (
                            <div key={index} className='size'>{item}</div>
                        ))}
                        </div>
                    </div>
                    <div className="productDetails">
                        <h3><i className="ri-gift-fill"></i> Product Details</h3>
                        <div>
                            <ul className='text-[16px]'>
                                <li>Name : {prodcutDetails.title}</li>
                                <li>Fabric : {prodcutDetails.fabric}</li>
                                <li>Design : {prodcutDetails.design}</li>
                                <li>Net Quantity : 1</li>
                                <li>Pirce : ${prodcutDetails.salePrice}</li>
                                <li>Off : {100 - Math.round(prodcutDetails.salePrice/prodcutDetails.price*100)}%</li>
                            </ul>
                        </div>
                    </div>
                    <div className="policyDetails flex gap-5 items-center">
                        <div className='flex flex-col items-center'><i className="ri-calendar-check-line text-2xl bg-white text-black rounded-full h-[40px] w-[40px] flex items-center justify-center"></i>
                        <p className='text-sm'>Delever By <br /> {(new Date().getDate() + 7) > 31 ? '3' : (new Date().getDate() + 7)}/{(new Date().getDate() + 7) > 31 ? (new Date().getMonth() + 1) : (new Date().getMonth())}/{new Date().getFullYear()}</p>
                        </div>
                        {prodcutDetails.caseOnDelevery && (
                            <div className='inline-flex flex-col items-center text-sm'>
                                <i className="ri-wallet-3-line text-2xl bg-white text-black rounded-full h-[40px] w-[40px] flex items-center justify-center"></i>
                                Case on Delevery
                            </div>
                        )}
                         {prodcutDetails.returenPolicy && (
                            <div className='inline-flex flex-col items-center text-sm'>
                                <i className="ri-refresh-line text-2xl bg-white text-black rounded-full h-[40px] w-[40px] flex items-center justify-center"></i>
                                7 Days Replace
                            </div>
                        )}
                    </div>
                    <div className="sildBy">
                        <h3 className='text-[17px]'><i className="ri-store-fill"></i> Sold by</h3>
                        <div className="storeDetails">
                            <div className="storeImage flex items-center gap-5 mt-3">
                                <img className='w-[40px] h-[40px] object-cover rounded-full' src={prodcutDetails.seller.profilePicture} alt="" />
                                <div className="nameAndEmail">
                                    <p>{prodcutDetails.seller.name}</p>
                                    <p className='text-slate-500 leading-3'>{prodcutDetails.seller.emailAddress}</p>
                                </div>
                                <div className="originCountry flex gap-2 items-center">
                                <i className="ri-global-line text-lg"></i> <p>{prodcutDetails.seller.counrtyOrigin}</p>
                                </div>
                                <div className="originCountry flex gap-2 items-center">
                                <i className="ri-customer-service-line"></i> <p>{prodcutDetails.seller.businessNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default ProductSpecificPage