import axios from 'axios'
import React, { useState } from 'react'
import { useOutletContext, useNavigate, Link } from 'react-router-dom'

function ForgetPass() {
    const [ email , setEmail ] = useState('')    
    const navigate = useNavigate()
    
    const API_URL = 'http://localhost/api/forgetpassword/forgot-password'

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
        <div className='g-[#899878] min-h-[470px] flex flex-col justify-center'>
        <div className='flex justify-center bg-white/10 w-6/12 mx-auto rounded-xl'>
          <form 
          onSubmit={handleLogin}
          className='py-7 min-w-80'>            
          <h2 className='text-center text-lg font-bold'>Forget Password</h2>
            <div className='my-3'>
              <span>Email :</span>
              <input 
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Enter Your Email'
              className='bg-white/20 px-2 ml-5 '
               required
              />
            </div>                        
            <div className='text-center '>
              <button 
              type='submit'
              className='bg-white/30 my-2 px-3 min-w-20 hover:bg-white/50 hover:text-black'>Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgetPass