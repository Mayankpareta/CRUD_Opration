import axios from 'axios'
import React, { useState } from 'react'
import { useOutletContext, useNavigate, Link } from 'react-router-dom'

function Login() {
    const { API_URL , users } = useOutletContext();
    const Navigate = useNavigate()
    const [ loginData , setLoginData ] = useState({
        email: '',
        password: ''
    })
    
    const token = localStorage.getItem('token')

    const handleChange = (e) => { 
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/login`, {
              email: loginData.email,
              password: loginData.password
            },
            {
              headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
              }
            })
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userName', JSON.stringify(res.data.user.name));

          Navigate('/todo')
                        
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
              <span>Email :</span>
              <input 
              name='email'
              value={loginData.email}
              onChange={handleChange}
              type='email'
              placeholder='Enter Your Email'
              className='bg-[#899878] border border-gray-900 px-2 ml-[60px] '
               required
              />
            </div>            
            <div className='my-3'>
              <span>Password:</span>
              <input 
              value={loginData.password}              
              name='password'
              onChange={handleChange}
              type='password'
              placeholder='Password'
              className='bg-[#899878] border border-gray-900 px-2 ml-9 '
              required              
              />
            </div> 
            <div className='text-center my-2'>
              <Link to='/forgetPassword' className='hover:text-blue-950 ml-2'>Forget Password</Link>  
            </div>         
            <div className='text-center '>
              <button 
              type='submit'
              onChange={handleLogin}
              className='border bg-[#6E7B65] border[#727108] my-2 px-3 w-20 hover:bg-[#4b5446]'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login