import React, { useContext, useState } from 'react'
import { ProductContext } from '../../context/productContext'

const Filter = () => {
    // getting category Filter handler and array 
    const {handleCategory,handleDesign,handleColor,} = useContext(ProductContext)
    
  return (
    <div className='filterWrapper flex flex-col h-[75vh]'>
        <div className="caregory w-full">
            <h2>Category</h2>
            <div className='categoryWrapper'>
                <div className="selectBox">
                <input onChange={(evt)=> handleCategory(evt)} type="checkbox" name='T-Shirt'  /> T-shirt
            </div>
            <div className="selectBox">
                <input onChange={(evt)=> handleCategory(evt)} type="checkbox" name='Sweatshirt' /> Sweatshirt
            </div>
            <div className="selectBox">
                <input onChange={(evt)=> handleCategory(evt)} type="checkbox" name='Dress' /> Dress
            </div>
            <div className="selectBox">
                <input onChange={(evt)=> handleCategory(evt)} type="checkbox" name='Pant' /> Pant
            </div>
            <div className="selectBox">
                <input onChange={(evt)=> handleCategory(evt)} type="checkbox" name='Skirt' /> Skirt
            </div>
            </div>
        </div>
        <hr className='my-3 ' />
        <div className="filrerBy w-full">
            <h2>Design</h2>
            <div className="designsWrapper">
            <div className="selectBox">
                <input onChange={(evt)=> handleDesign(evt)} type="checkbox" name='Basic' /> Basic
            </div>
            <div className="selectBox">
                <input onChange={(evt)=> handleDesign(evt)} type="checkbox" name='Pattern' /> Pattern
            </div>
            <div className="selectBox">
                <input onChange={(evt)=> handleDesign(evt)} type="checkbox" name='Hoodie' /> Hoodie
            </div>
            <div className="selectBox">
                <input onChange={(evt)=> handleDesign(evt)} type="checkbox" name='Oversize' /> Oversize
            </div>
            </div>
        </div>
        <hr className='my-3 ' />
        <div className="color w-full">
            <h2>Colors</h2>
        <div className="colorsWrapper">
        <div className="selectBox">
                <input onChange={(evt)=> handleColor(evt)} type="checkbox" name='Red' /> Red
            </div>
            <div className="selectBox">
                <input onChange={(evt)=> handleColor(evt)} type="checkbox" name='Black' /> Black
            </div>
            <div className="selectBox">
                <input onChange={(evt)=> handleColor(evt)} type="checkbox" name='White' /> White
            </div>
            <div className="selectBox">
                <input onChange={(evt)=> handleColor(evt)} type="checkbox" name='Basic' /> Basic
            </div>
        <div className="selectBox">
                <input onChange={(evt)=> handleColor(evt)} type="checkbox" name='Blue' /> Blue
            </div>
        </div>
        </div>
        <hr className='my-3 ' />
    </div>
  )
}

export default Filter