import React from 'react'
import { RingLoader } from 'react-spinners'

function Loader() {
  return (
    <div className='flex justify-center items-center'>
    <RingLoader color="#36d7b7" />
    </div>
    
  )
}

export default Loader