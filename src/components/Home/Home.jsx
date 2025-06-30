import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

function Home() {

    const { fetchUsers, users, setEditingUserData, API_URL } = useOutletContext();
    const Navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        full_name: '',
        email: '',
        specialist: [],
        gender: '',
        dob: '',
        password: '',
        }); 
        
    
    const handleEdit = (user) => {
        setEditingUserData(user);
        Navigate('/form')
    }
    


    // delete method
    const handleDelete = async (id) => {        
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchUsers();            
        } catch (error) {
            console.error("deleting failed", error)
        }
    }
    
    
  return (
    <div>
        <div className='bg-[#899878] px-5 grid grid-cols-4 py-5 min-h-[530px]'>

            {/* options */}
            <div className='border-r-1 border-r-black'>
                <div className='px-5'>
                    <div className='my-5 text-lg bg-[#6E7B65] hover:bg-[#4b5446] text-center'>Home</div>
                    <div className='my-5 text-lg bg-[#6E7B65] hover:bg-[#4b5446] text-center'>Data</div>
                    <div className='my-5 text-lg bg-[#6E7B65] hover:bg-[#4b5446] text-center'>About</div>
                    <div className='my-5 text-lg bg-[#6E7B65] hover:bg-[#4b5446] text-center'>Contect</div>
                    <div className='my-5 text-lg bg-[#6E7B65] hover:bg-[#4b5446] text-center'>Policy</div>
                </div>
            </div>

            {/* search and table */}
            <div className='col-start-2 col-end-5 px-5 py-2'>
                <div className='flex justify-end'>                    
                  <Link to='/form'
                   
                    className='bg-slate-800 w-24 text-white mx-2 px-4 hover:bg-slate-900'
                    >Register</Link>
                  
                  <Link 
                  to='/login'
                  className='bg-slate-800 w-18 text-white mx-2 px-4 hover:bg-slate-900'
                    >Login</Link>
                </div> 

                {/* User Information */}
                <div>
                    <div className='py-4'>
                        <h3 className=' text-2xl text-center my-3'>User Information</h3>
                        <table>
                            <thead>
                            <tr>
                                {/* <th className='px-2 border border-black'>Id</th> */}
                                <th className='px-2 border border-black'>Username</th>
                                <th className='px-2 border border-black'>Full Name</th>
                                <th className='px-2 border border-black'>Email</th>
                                <th className='px-2 border border-black'>Specialist</th>
                                <th className='px-2 border border-black'>Gender</th>
                                <th className='px-2 border border-black'>Phone</th>
                                <th className='px-2 border border-black'>DOB</th>
                                <th className='px-2 border border-black'>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user => ( 
                                <tr key={user._id}>
                                <td className='px-2 border border-black'>{user.userName}</td>
                                <td className='px-2 border border-black '>{user.full_name} {user.lastName}</td>
                                <td className='px-2 border border-black'>{user.email}</td>
                                <td className='px-2 border border-black'>{user.specialist}</td>
                                <td className='px-2 border border-black'>{user.gender}</td>
                                <td className='px-2 border border-black'>{user.phone}</td>
                                <td className='px-1 border border-black'>{user.dob}</td>
                                <td className='px-2 border border-black'> 
                                    <button 
                                    onClick={() => handleEdit(user)}
                                    className='bg-[#6E7B65] w-12 text-sm mx-1 my-1 px-1 hover:bg-[#4b5446]'>Edit</button>
                                    <button
                                    onClick={() => handleDelete(user._id)}
                                    className='bg-[#6E7B65] text-sm w-12 mx-1 px-1 my-1 hover:bg-[#4b5446]'>Delete</button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>               
            </div>
        </div>
    </div>
  )
}

export default Home