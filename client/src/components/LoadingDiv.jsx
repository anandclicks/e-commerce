import React from 'react'

const LoadingDiv = () => {
  return (
    <div className='loadingDiv'>
      <div className="loader text-white"></div>
      <p className='text-white'>Wait for a minut! <span className='text-yellow-500'>Uploading..</span></p>
    </div>
  )
}

export default LoadingDiv