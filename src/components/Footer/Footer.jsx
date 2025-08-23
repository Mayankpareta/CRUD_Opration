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
            <div className='g-[#6E7B65] bg-white/10 h-10 border-t border-white/30'>
                <div>
                   
                </div>       
            </div>
        </div>
    </>
  )
}

export default Footer