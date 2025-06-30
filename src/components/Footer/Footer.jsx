import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Footer() {
  const [ changePas, setChangePas ] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token');
    setChangePas(token)
  }, [])


  return (
    <>
        <div>
            <div className='bg-[#6E7B65] border-t border-black h-16 px-4 py-2 grid grid-cols-3'>
                <div>
                   <h1 className='text-3xl'>Footer</h1>
                </div>       
            </div>
        </div>
    </>
  )
}

export default Footer