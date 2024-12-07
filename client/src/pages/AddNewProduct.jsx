import React, { useState } from 'react'
import LoadingDiv from '../components/LoadingDiv'
import axios from 'axios'

const AddNewProduct = () => {

  // usestate for images 
  const [imagesForSend, setimagesForSend] = useState([])
    const [prodcutImages, setprodcutImages] = useState({
      mainImage : '',
      imageOne : '',
      imageTwo : '',
      imageThree : '',
      imageFour : ''
    })
    const handleProductImages = (evt)=> {
      let targetedImageFile = evt.target.files[0]
      let targetedInputName =evt.target.name
      let finalImageUrl = URL.createObjectURL(targetedImageFile)
      setprodcutImages(prev => ({...prev, [targetedInputName] : finalImageUrl}))
      setimagesForSend(prev => [...prev, evt.target.files[0]])
    }
    const [formData, setformData] = useState({
      title : '',
      dipscription : '',
      price : '',
      salePrice : '',
      quantity : '',
      bestSeller : false,
      returenPolicy : false,
      deleveryCharge : '',
      color : ''
    })
    const handleInputData = (evt)=> {
      setformData(prev => ({...prev, [evt.target.name] : evt.target.value}))
      console.log(formData)
    }
    const apiCall = async(evt)=> {
      evt.preventDefault()
      let finalData = new FormData()
      for (const key in formData) {
        finalData.append(`${key}`, `${formData[key]}`)
      }
      imagesForSend.forEach((item)=> {
        finalData.append('image', item)
      })

      // api call 
      const response = await axios.post('http://localhost:3000/api/v1/product/create-prodcut', finalData, {withCredentials : true})
      console.log(response)
    }

    // api call handing 
    const [loadingDivState, setloadingDivState] = useState(false)
 
  return (  
    <div className='addProdcutWrapper'>
      {loadingDivState && (
        <LoadingDiv/>
      )}
      <div className="addProdcut">
        <form onSubmit={(evt)=> apiCall(evt)} className='w-full flex gap-5' encType='multipart/form-data'>
         <div className="partOne w-[50%] border-stone-800 border-[1px] p-5 rounded-lg">
         <h1 className='text-2xl'>Fill in All the Details for your <span className='text-yellow-400'>Product</span></h1>
         <input onChange={(evt)=> handleInputData(evt)} type="text" placeholder='Title of Prodcut' name='title' className='inputStyling' />
          <textarea onChange={(evt)=> handleInputData(evt)} name="dipscription" placeholder='Dipscription' className='textAreaStyling'></textarea>
          <input onChange={(evt)=> handleInputData(evt)} type="text" name='price' placeholder='Before sale price' className='inputStyling' />
          <input onChange={(evt)=> handleInputData(evt)} type="text" name='salePrice' placeholder='Sale price' className='inputStyling' />
          <input onChange={(evt)=> handleInputData(evt)} type="text" name='quantity' placeholder='Quantity' className='inputStyling' />
          <select onChange={(evt)=> handleInputData(evt)} type="text" name='bestSeller'className='inputStyling'>
            <option value="" disabled selected={true} >Are you a Best seller</option>
            <option className='text-black' value="true">Yes</option>
            <option className='text-black' value="false">No</option>
          </select>
          <select onChange={(evt)=> handleInputData(evt)} type="text" name='returenPolicy'className='inputStyling'>
            <option value="" disabled selected={true} >7 Days Return Policy</option>
            <option className='text-black' value="true">Yes</option>
            <option className='text-black' value="false">No</option>
          </select>
          <input onChange={(evt)=> handleInputData(evt)} type="text" placeholder='Delevey Charge' name='deleveryCharge' className='inputStyling' />
          <input onChange={(evt)=> handleInputData(evt)} type="text" placeholder='Color' name='color' className='inputStyling' />
          <input type="submit" className='h-[50px] border-none w-full bg-green-600 mt-5 rounded-md cursor-pointer ' />
         </div>
         <div className="partTwo w-[50%] border-stone-800 border-[1px] p-5 rounded-lg">
          <div className="inputPart">
          <h2 className='text-2xl mb-5'>Select images for Your <span className='text-yellow-500'>Prodcut</span></h2>
          <label className='text-stone-400'>Select Main Image</label>
         <input onChange={(evt)=> handleProductImages(evt)} name='mainImage' type="file" className='inputStyling  mb-4' />
         {/* priview all images  */}
         <div className="allPriviewImages">
         <h2 className='text-2xl mb-5'>Privew The All <span className='text-yellow-500'>Images</span></h2>
         {/* main images  */}
         <div className="allImages flex gap-2">
         <img className='h-[310px] w-[220px] object-cover rounded-md' src={prodcutImages?.mainImage || '/productPlaceholder.png'} alt="" />
         {/* others four  */}
         <div className="fourImg w-[280px] h-[300px] flex flex-wrap gap-2 ">
          <img className='h-[150px] w-[110px] object-cover rounded-md' src={prodcutImages?.imageOne || '/productPlaceholder.png'} alt="" />
          <img className='h-[150px] w-[110px] object-cover rounded-md' src={prodcutImages?.imageTwo || '/productPlaceholder.png'} alt="" />
          <img className='h-[150px] w-[110px] object-cover rounded-md' src={prodcutImages?.imageThree || '/productPlaceholder.png'} alt="" />
          <img className='h-[150px] w-[110px] object-cover rounded-md' src={prodcutImages?.imageFour || '/productPlaceholder.png'} alt="" />
         </div>
         </div>
         </div>
         <div className="duoImage flex gap-3 mt-5">
         <div className='w-[50%] mb-4'>
          <label className='text-stone-400'>Select 1st image</label>
          <input onChange={(evt)=> handleProductImages(evt)} type="file" name='imageOne' className='inputStyling w-[100%]' />
          </div>
         <div className='w-[50%] mb-4'>
          <label className='text-stone-400'>Select 2st image</label>
          <input onChange={(evt)=> handleProductImages(evt)} type="file" name='imageTwo' className='inputStyling w-[100%]' />
          </div>
         </div>
         <div className="duoImage flex gap-3">
          <div className='w-[50%] mb-4'>
          <label className='text-stone-400'>Select 3st image</label>
          <input onChange={(evt)=> handleProductImages(evt)} type="file" name='imageThree' className='inputStyling w-[100%]' />
          </div>
          <div className='w-[50%] mb-4'>
          <label>Select 4st image</label>
          <input onChange={(evt)=> handleProductImages(evt)} type="file" name='imageFour' className='inputStyling w-[100%]' />
          </div>
         </div>
          </div>
         </div>
        </form>
      </div>
    </div>
  )
}

export default AddNewProduct