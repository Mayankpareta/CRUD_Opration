import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate,  useParams } from 'react-router-dom'

function NewPass() {
    const [ password , setPassword ] = useState('')
    const { token } = useParams();
    const navigate = useNavigate()
    
    const API_URL = 'http://192.168.0.7:8000/api/forgetpassword/reset-password'


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/${token}`, { 
                newPassword: password })      
            alert(res.data.message); 
            navigate('/login')                       
        } catch (error) {
            console.error("fetching data error" , error)
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
              <span>New Password:</span>
              <input 
              value={password}              
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='New Password'
              className='bg-[#899878] border border-gray-900 px-2 mx-2 '
              required              
              />
            </div>                  
            <div className='text-center '>
              <button 
              type='submit'
              onChange={handleLogin}
              className='border bg-[#6E7B65] border[#727108] my-2 px-3 w-20 hover:bg-[#4b5446]'>Change</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewPass