import React from 'react'
import { PulseLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <div id='spinner' className='fixed hidden z-[9999999999] inset-0 bg-opacity-50 bg-black  min-h-screen  justify-center items-center'>
      <PulseLoader className="text-white" color='white' />
    </div>
  )
}

export default Spinner