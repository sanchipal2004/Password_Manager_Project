import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <div className='bg-slate-800 text-white font-serif p-4 mx-auto flex justify-between h-14 '>
        <div className="logo font-bold text-white text-2xl">
        <span className='text-green-700'> &lt;</span>
        <span>Password</span><span className='text-green-700'>Manager/&gt;</span>
</div>
       
      </div>
    </nav>
  )
}

export default Navbar
