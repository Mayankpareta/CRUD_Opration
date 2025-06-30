import React, { useEffect, useState } from 'react'
import { Link, Links, NavLink } from 'react-router-dom'

function Header() {
  const [ logoutToken, setLogoutToken ] = useState(localStorage.getItem("token"))

  
  
  const logOutHandleClick = () => {
    localStorage.removeItem('token')
    setLogoutToken(null)
  }

  useEffect(() => {
    const tokenStore = localStorage.getItem('token')
    setLogoutToken(tokenStore)
  },[])

  return (
    <>
        <div>
            <div className='bg-[#6E7B65] h-16 px-4 py-2 border-b border-black grid grid-cols-3'>
                <div>
                   <h1 className='text-3xl'>Information</h1>
                </div>
                <div className='col-start-2 col-end-4 w-80'>
                  <div className='text-xl flex justify-evenly items-center py-2'>
                    <NavLink
                    className={({isActive}) => `hover:border-b border-b-black`}
                    to='/'>Home</NavLink>
                    <NavLink
                    className={({isActive}) => `hover:border-b border-b-black`}
                    to='/form'>Register</NavLink>
                    {logoutToken ? (
                      <Link 
                      to='/'
                      onClick={logOutHandleClick}
                      >Logout</Link>
                    ) : (
                      <Link
                      className={`hover:border-b border-b-black`}
                      to='/login'>Login</Link>
                    )}
                  </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header