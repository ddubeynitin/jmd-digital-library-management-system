import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <div className='w-full border border-b-amber-400 flex items-center justify-between px-6 overflow-hidden' >
        <div className='py-0' >
          <img src="images/JMD_logo_2.png" alt="JMD Logo" className='h-30 w-30'/>
        </div>
        <div className='flex text-black space-x-4' >
          <Link to="/" className='hover:text-amber-400' >Home</Link>
          <Link to="/student/dashboard" className='hover:text-amber-400' >Student Dashboard</Link>
        </div>
      </div>
    </>
  )
}

export default Header