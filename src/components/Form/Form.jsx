import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import App from '../../App';

function Form() {
  const navigate = useNavigate()
  const { fetchUsers, editingUserData, setEditingUserData, API_URL } = useOutletContext();

    const [ error , setError ] = useState('')
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
        setError('');
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
            navigate("/login")
        } catch (error) {
            if(error.response) {
                setError(error.response.data.message || 'Something went wrong');
            } else {
                setError("Something went wrong");
            }
        }
        
    };


  return (
    <>
         <div className='g-[#899878] min-h-[470px] flex flex-col justify-center'>
        <div className='flex justify-center bg-white/10 w-6/12 mx-auto rounded-xl'>
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
              className='g-[#899878] bg-white/20 px-2 mx-7 '
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
              className='g-[#899878] bg-white/20 px-2  mx-7 '
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
              className='bg-white/20 px-2 ml-[63px] g-[#899878]'
               required
              />
            </div>
            {/* <div className='my-3'>
                <label>Specialist:</label>
                <select
                value={formData.specialist}
                className='ml-9 bg-white/20 text-black'
                name='specialist'
                onChange={(e) => {
                setFormData({
                    ...formData,
                    specialist: [e.target.value], 
                    });
                }}
                required
                >
                <option value=''>Select</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='Kid'>Kid</option>
                </select>
            </div> */}
            <div className='my-3'>
                <label>Gender:</label>
                <select
                value={formData.gender}
                name='gender'
                className='ml-12 bg-white/20 text-black'
                onChange={handleChange}
                required
                >
                <option className='' value=''>Select</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
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
              className='bg-white/20 px-2 ml-7 g-[#899878]'
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
              className='bg-white/20 px-2 mx-2 w-[197px] g-[#899878]'
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
                className='bg-white/20 px-2 ml-9 g-[#899878]'                
                />
              </div>          
            )}            
            <button 
            type='submit'
            className='g-[#6E7B65] bg-white/40 px-3 w-76 py-0.5 hover:text-black hover:bg-white/50'>{editingUserData ? "Update" : "Register"}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Form