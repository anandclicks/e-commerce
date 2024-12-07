import React, { useState } from 'react';
import axios from 'axios';

const AddNewAddress = ({setloggedinCustomerData}) => {
  // USESTATE FOR SAVING FORM DATA 
  const [formData, setformData] = useState({
    state: "",
    cityName: "",
    districtName: "",
    areaName: "",
    landmark: "",
    houseNumber: "",
    avatar: null // for file upload
  });

  // FUNCTION FOR HANDLING DATA OF INPUTS 
  const handleInputData = (evt) => {
    const { name, value, files } = evt.target;
    if (name === "avatar") {
      setformData(prev => ({ ...prev, [name]: files[0] })); // Set the file
    } else {
      setformData(prev => ({ ...prev, [name]: value })); // Set text inputs
    }
  };

  // FUNCTION FOR MAKING API CALL
  const handleSubmit = async(evt) => {
    evt.preventDefault();

    const finalData = new FormData();
    finalData.append("state", formData.state);
    finalData.append("cityName", formData.cityName);
    finalData.append("districtName", formData.districtName);
    finalData.append("areaName", formData.areaName);
    finalData.append("landmark", formData.landmark);
    finalData.append("houseNumber", formData.houseNumber);
    if (formData.avatar) {
      finalData.append("avatar", formData.avatar);
    }

    // API CALL FOR UPDATING ADDRESS 
      const response = await axios.post("http://localhost:3000/api/v1/customer/deleveryLocation-updtae", finalData,{withCredentials : true})
      console.log(response)
  };

  return (
    <form  onSubmit={(evt)=> handleSubmit(evt)} className='w-[600px] p-5 border-stone-800 border-[1px] rounded-md mt-5'>
      <input onChange={handleInputData} type="text" className='inputStyling' placeholder='State' name='state' value={formData.state} />
      <input onChange={handleInputData} type="text" className='inputStyling' placeholder='City name' name='cityName' value={formData.cityName} />
      <input onChange={handleInputData} type="text" className='inputStyling' placeholder='District' name='districtName' value={formData.districtName} />
      <input onChange={handleInputData} type="text" className='inputStyling' placeholder='Area name' name='areaName' value={formData.areaName} />
      <input onChange={handleInputData} type="text" className='inputStyling' placeholder='Landmark' name='landmark' value={formData.landmark} />
      <input onChange={handleInputData} type="text" className='inputStyling' placeholder='House number' name='houseNumber' value={formData.houseNumber} />
      <input onChange={handleInputData} type="file" name='avatar' className='mt-3' />
      <input type="submit" value="Save" className='bg-green-600 border-none rounded-md text-white flex justify-center items-center w-full h-[50px] mt-5' />
    </form>
  );
};

export default AddNewAddress;
