import axios from 'axios'
import React, { useState } from 'react'
import { useOutletContext, useNavigate, Link } from 'react-router-dom'

function ForgetPass() {
    const [ email , setEmail ] = useState('')    
    const navigate = useNavigate()
    
    const API_URL = 'http://192.168.0.7:8000/api/forgetpassword/forgot-password'

    const handleLogin = async (e) => {
        e.preventDefault();       
        try {
            const res = await axios.post(`${API_URL}`, { email })
            alert(res.data.message); 
            let token = res.data.token                   
            navigate(`/newPassword/${token}`)
        } catch (error) {
            console.error("Forget password error" , error)
        }
    }

  return (
    <>
        <div className='bg-[#899878] min-h-[513px]'>
        <div className='flex justify-center py-10'>
          <form 
          onSubmit={handleLogin}
          className='py-7 min-w-80'>            
            <div className='my-3'>
              <span>Email :</span>
              <input 
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Enter Your Email'
              className='bg-[#899878] border border-gray-900 px-2 ml-5 '
               required
              />
            </div>                        
            <div className='text-center '>
              <button 
              type='submit'
              className='border bg-[#6E7B65] border[#727108] my-2 px-3 min-w-20 hover:bg-[#4b5446]'>Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgetPass