import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../../context/productContext';
import axios from 'axios';
import { CustomerContext } from '../../context/customerContext';

const ProductSpecificPage = () => {
  
    // api call to set loggedin customer data into customer context 
  const {setloggedInCustomer, loggedInCustomer} = useContext(CustomerContext)
  useEffect(()=> {
    const apiCall = async()=> {
      const response = await axios.get('http://localhost:3000/api/v1/customer/loggedinCustomer', {withCredentials : true})
      if(response.data.sucess) {
        setloggedInCustomer(response.data.user)
      }
    }
    apiCall()
  },[])


    // useState for checking whether this product is already in the cart or not 
    const [alreadyInCart, setalreadyInCart] = useState(false);
    
    const checking = () => {
        const result = loggedInCustomer?.cartItem?.some((item) => item === id);
        if (result) {
            setalreadyInCart(true);
        } else {
            setalreadyInCart(false);
        }
    };
    
    useEffect(() => {
        checking();
    }, [loggedInCustomer]); // Recheck the cart when logged-in customer data changes

    // useState for redirecting unauthorized users to the login page 
    const navigate = useNavigate();
    const [redirect, setredirect] = useState(false);

    // This is for showing available sizes
    const avalableSize = ["S", "M", "L", "XL", "XXL"];

    // useState for product details
    const [prodcutDetails, setprodcutDetails] = useState();

    // Getting product id for this page
    const { id } = useParams();

    // API call for product details 
    useEffect(() => {
        const apiCall = async () => {
            checking(); // Check cart state initially
            const response = await axios.get(`http://localhost:3000/api/v1/product/details/${id}`);
            if (response.data.sucess) {
                setprodcutDetails(response.data.product);
            }
        };
        apiCall();
    }, [id]); // Dependency array contains the product ID

    // API call for adding this product into logged-in customer's cart 
    const addToCartApiCall = async () => {
        const response = await axios.post("http://localhost:3000/api/v1/customer/add-to-cart", { id }, { withCredentials: true });
        if (!response.data.sucess) {
            setredirect(true); // Redirect to login if the response is unsuccessful
        }
        if (response.data.sucess) {
            setloggedInCustomer(response.data.user); // Update logged-in customer state
            checking(); // Recheck the cart state after adding/removing an item
        }
    };

    // Redirect process for unauthorized users 
    useEffect(() => {
        if (redirect) {
            navigate('/login');
        }
    }, [redirect]);

    return (
        <div className='productPageWrapper'>
            {/* If product data is not found */}
            { !prodcutDetails  && (
                <div>Product not found</div>
            )}
            {/* If product data is found */}
            {prodcutDetails && (
                <div className="prodctuPage">
                    {/* Product imageGallery side */}
                    <div className="leftSide">
                        <div className="imageGallery">
                            <div className="smallImages">
                                {prodcutDetails.Images.slice(0, 4).map((img, index) => (
                                    <div className="miniImg" key={index}>
                                        <img src={img} alt={`product-thumbnail-${index}`} />
                                    </div>
                                ))}
                            </div>
                            <div className="bigImage mt-2">
                                <img src={prodcutDetails.Images[0]} alt="main-product" />
                            </div>
                        </div>
                        <div className="ctaButtons mt-10 flex gap-5">
                            <div className="buyNow ctaBtns"><i className="ri-shopping-cart-fill"></i> Buy now</div>
                            {!alreadyInCart && (
                                <div onClick={() => addToCartApiCall()} className="addToCart ctaBtns">
                                    <i className="ri-shopping-bag-fill"></i> Add to Cart
                                </div>
                            )}
                            {alreadyInCart && (
                                <div onClick={() => addToCartApiCall()} className="addToCart ctaBtns">
                                    <i className="ri-close-line"></i> Remove from cart
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product details side */}
                    <div className="rightSide">
                        {/* Product details */}
                        <div className="titleAndPrice">
                            <h2 className='titleOfProduct'>{prodcutDetails.title}</h2>
                            <h3 className='salePrice'>
                                ${prodcutDetails.salePrice} 
                                <small className='text-red-600 line-through'>{prodcutDetails.price}</small>
                            </h3>
                            <div className='mt-3'>{prodcutDetails.bestSeller && (
                                <div className='bestSellr '>Best Seller<i className="ri-bard-fill"></i></div>
                            )}</div>
                            <p>{prodcutDetails.deleveryCharge > 0 
                                ? <div className='text-sm mt-2'><i className="ri-truck-fill"></i> Delivery charge: ${prodcutDetails.deleveryCharge}</div> 
                                : <div className='text-sm mt-2'><i className="ri-truck-fill"></i> Free Delivery</div>}
                            </p>
                        </div>
                        
                        <div className="sizesAvalable">
                            <div className="allSize flex items-center gap-3">
                                {avalableSize.map((item, index) => (
                                    <div key={index} className='size'>{item}</div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="productDetails">
                            <h3><i className="ri-gift-fill"></i> Product Details</h3>
                            <div>
                                <ul className='text-[16px]'>
                                    <li>Name: {prodcutDetails.title}</li>
                                    <li>Fabric: {prodcutDetails.fabric}</li>
                                    <li>Design: {prodcutDetails.design}</li>
                                    <li>Net Quantity: 1</li>
                                    <li>Price: ${prodcutDetails.salePrice}</li>
                                    <li>Off: {100 - Math.round(prodcutDetails.salePrice / prodcutDetails.price * 100)}%</li>
                                </ul>
                            </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="policyDetails flex gap-5 items-center">
                            <div className='flex flex-col items-center'>
                                <i className="ri-calendar-check-line text-2xl bg-white text-black rounded-full h-[40px] w-[40px] flex items-center justify-center"></i>
                                <p className='text-sm'>Deliver By <br /> {(new Date().getDate() + 7) > 31 ? '3' : (new Date().getDate() + 7)}/{(new Date().getMonth() + 1) > 11 ? '12' : (new Date().getMonth())}/{new Date().getFullYear()}</p>
                            </div>
                            {prodcutDetails.caseOnDelevery && (
                                <div className='inline-flex flex-col items-center text-sm'>
                                    <i className="ri-wallet-3-line text-2xl bg-white text-black rounded-full h-[40px] w-[40px] flex items-center justify-center"></i>
                                    Case on Delivery
                                </div>
                            )}
                            {prodcutDetails.returenPolicy && (
                                <div className='inline-flex flex-col items-center text-sm'>
                                    <i className="ri-refresh-line text-2xl bg-white text-black rounded-full h-[40px] w-[40px] flex items-center justify-center"></i>
                                    7 Days Replace
                                </div>
                            )}
                        </div>

                        {/* Sold By */}
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
    );
};

export default ProductSpecificPage;
