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
            <div className='bg-white/10 text-white h-16 px-4 py-2 border-b border-white/30 grid grid-cols-3'>
                <div>
                   <h1 className='text-3xl font-semibold '>TwickToDo</h1>
                </div>
                <div className='col-start-2 col-end-4 w-80'>
                  <div className='text-xl flex justify-evenly items-center py-2'>
                    <NavLink
                    className={({isActive}) => `hover:border-b border-b-white`}
                    to='/'>Home</NavLink>
                    <NavLink
                    className={({isActive}) => `hover:border-b border-b-white`}
                    to='/form'>Register</NavLink>
                    {logoutToken ? (
                      <Link 
                      className='hover:border-b border-b-white'
                      to='/'
                      onClick={logOutHandleClick}
                      >Logout</Link>
                    ) : (
                      <Link
                      className={`hover:border-b border-b-white`}
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