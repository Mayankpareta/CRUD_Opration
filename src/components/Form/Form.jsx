import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import App from '../../App';

function Form() {
  const navigate = useNavigate()
  const { fetchUsers, editingUserData, setEditingUserData, API_URL } = useOutletContext();

    const [formData, setFormData] = useState({
        userName: '',
        full_name: '',
        email: '',
        specialist: [],
        gender: '',
        phone: '',
        dob: '',
        password: '',
        }); 


      useEffect(() => {
        if(editingUserData) {

          setFormData({
            userName: editingUserData.userName || '',
            full_name: editingUserData.full_name || '',
            email: editingUserData.email || '',
            specialist: editingUserData.specialist || [],
            gender: editingUserData.gender || '',
            phone: editingUserData.phone || '',
            dob: editingUserData.dob ? editingUserData.dob.substring(0, 10) : '',
            password: editingUserData.password || '',
          })
        }
      }, [editingUserData])

      
   
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
   
     
     const handleSubmitForm = async (e) => {
       e.preventDefault();
        const addEditUser =  {        
            ...formData,
            specialist : Array.isArray(formData.specialist) ? formData.specialist : 
            [formData.specialist]             
        }
        try {
            if (editingUserData) {           
                await axios.put(`${API_URL}/${editingUserData._id}`, addEditUser);
                alert('Edit succesfully')                         
                setEditingUserData(null);
            } else {
                // POST request
                await axios.post(API_URL, addEditUser);
                alert('Register successfully')
            }
    
            setFormData({
                userName: '',
                full_name: '',
                email: '',
                specialist: [],
                gender: '',
                phone: '',
                dob: '',
                password: '',
            });
            fetchUsers();
        } catch (error) {
            console.error('Adding/Updating user failed', error);
        }
        navigate("/login")
    };


  return (
    <>
         <div className='bg-[#899878] min-h-[513px]'>
        <div className='flex justify-center'>
          <form 
          onSubmit={handleSubmitForm}
          className='py-7 min-w-80'>
            <div className='my-3'>
              <span>UserName :</span>
              <input 
              name='userName'
              value={formData.userName}
              onChange={handleChange}
              type='text'
              placeholder='Enter Your UserName'
              className='bg-[#899878] border border-gray-900 px-2 mx-7 '
              required
              />
            </div>
            <div className='my-3'>
              <span>Full Name :</span>
              <input 
              value={formData.full_name}
              name='full_name'
              onChange={handleChange}
              type='text'
              placeholder='Enter Your Full Name'
              className='bg-[#899878] border border-gray-900 px-2  mx-7 '
              required
              />
            </div>
            <div className='my-3'>
              <span>Email :</span>
              <input 
              value={formData.email}
              name='email'
              onChange={handleChange}
              type='email'
              placeholder='Enter Your Email'
              className='border border-gray-900 px-2 ml-[63px] bg-[#899878]'
               required
              />
            </div>
            <div className='my-3'>
                <label>Specialist:</label>
                <select
                value={formData.specialist}
                className='ml-9'
                name='specialist'
                onChange={(e) => {
                setFormData({
                    ...formData,
                    specialist: [e.target.value], 
                    });
                }}
                required
                >
                <option value=''>--Select--</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='Kid'>Kid</option>
                </select>
            </div>
            <div className='my-3'>
                <label>Gender:</label>
                <select
                value={formData.gender}
                name='gender'
                className='ml-12'
                onChange={handleChange}
                required
                >
                <option value=''>--Select--</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                </select>
            </div>
            <div className='my-3'>
              <span>Phone No :</span>
              <input 
              value={formData.phone}
              name='phone'
              onChange={handleChange}
              type='number'
              placeholder='Enter Your Phone No'
              className='border border-gray-900 px-2 ml-7 bg-[#899878]'
               required
              />
            </div>
            <div className='my-3'>
              <span>Date Of Birth :</span>
              <input 
              value={formData.dob}
              name='dob'
              onChange={handleChange}
              type='date'
              placeholder='Date Of Birth'
              className='border border-gray-900 px-2 mx-2 w-[197px] bg-[#899878]'
               required
              />
            </div>
            {editingUserData ? '' : (
              <div className='my-3'>
                <span>Password:</span>
                <input 
                value={formData.password}
                minLength={6}
                name='password'
                onChange={handleChange}
                type='password'
                placeholder='Password'
                className='border border-gray-900 px-2 ml-9 bg-[#899878]'                
                />
              </div>          
            )}
            
            <button 
            type='submit'
            className='border bg-[#6E7B65] border[#727108] px-3 w-76 hover:bg-[#4b5446]'>{editingUserData ? "Update" : "Register"}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Form