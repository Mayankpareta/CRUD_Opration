import axios from 'axios'
import React, { useState } from 'react'
import { useOutletContext, useNavigate, Link } from 'react-router-dom'

function Login() {
    const { API_URL , users } = useOutletContext();
    const Navigate = useNavigate()
    const [ error , setError ] = useState('')
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
        setError('');
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
            if(error.response) {
              setError(error.response.data.message || 'Invalid credentials')
            }
            else {
              setError("Login Failed. Please try again.")
            }
        }
    }
    
  return (
    <>
        <div className='g-[#899878] text-white min-h-[470px] flex flex-col justify-center'>
        <div className='flex justify-center py-10 bg-white/10 w-6/12 mx-auto rounded-xl'>
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
              className='bg-white/20 px-2 ml-[60px] '
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
              className='bg-white/20 px-2 ml-9 '
              required              
              />
            </div> 
            <div className='text-center text-red-500 ml-10 text-[13px]'><p>{error}</p></div>
            <div className='text-center my-2'>
              <Link to='/forgetPassword' className='hover:text-green-200 ml-2'>Forget Password</Link>  
            </div>         
            <div className='text-center '>
              <button 
              type='submit'
              onChange={handleLogin}
              className='bg-white/40 my-2 px-3 w-60 hover:bg-white/30'>Login</button>
            </div>
            <div className='text-center my-2'>
              <Link to='/form' className='hover:text-green-200 text-gray-400 ml-2'>Register New User</Link>  
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login