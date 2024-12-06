import React, { useContext } from 'react'
import { ProductContext } from '../../context/productContext'
import Product from './Product'

const ProductSection = () => {
    // getting category array for show 
    const {category,color, design} = useContext(ProductContext)
    // console.log(category)
  return (
    <div className='prodcuts p-5'>
        {/* <h3 className='text-[19px] mb-2'>Filters</h3> */}
       <div className='flex gap-2'>
       {category.length !== 0 &&  (
            <div className='flex gap-2 flex-wrap '>
                {category.map((item,index)=> (
                    <div key={index} className='selectedCategory flex gap-3 cursor-pointer '>{item}<i className="ri-close-line"></i></div>
                ))}
            </div>
        )}
        {design.length !== 0 && (
          <div className='flex gap-2 flex-wrap'>
               {design.map((item,index)=> (
                    <div key={index} className='selectedCategory flex gap-3 cursor-pointer '>{item}<i className="ri-close-line"></i></div>
                ))}
          </div>
        )}
        {color.length !== 0 && (
          <div className='flex gap-2 flex-wrap'>
             {color.map((item,index)=> (
                    <div key={index} className='selectedCategory flex gap-3 cursor-pointer '>{item}<i className="ri-close-line"></i></div>
                ))}
          </div>
        )}
       </div>

       <div className="allProducts pt-5">
         <Product/>
       </div>
    </div>
  )
}

export default ProductSection