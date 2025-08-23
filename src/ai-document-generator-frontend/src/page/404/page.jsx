import React from 'react'

const page = () => {
  return (
    <>
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        <h5 className=' text-center items-center text-gray-900 text-3xl'> 404 — Not Found</h5>
        <button className='mb-5 hover:underline text-blue-800'>
            <a href="/">more</a>
        </button>
    </div>
    </>
  )
}

export default page