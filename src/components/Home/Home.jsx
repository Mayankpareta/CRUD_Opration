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


    // const handleEdit = (user) => {
    //     setEditingUserData(user);
    //     Navigate('/form')
    // }



    // delete method
    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`${API_URL}/${id}`);
    //         fetchUsers();
    //     } catch (error) {
    //         console.error("deleting failed", error)
    //     }
    // }


    return (

        <div className='g-[#899878] py-5 min-h-[470px] flex justify-center items-center'>
            <div className='w-9/12 mx-auto py-2'>
                <h2 className='text-center text-4xl font-bold'>Welcome To TwickToDo</h2>
                    <p className='text-center text-sm text-gray-300 py-2'>Make Your Personal ToDo And Secure</p>
                <div className='text-center py-3'>
                    <Link to="/login" className='hover:bg-white/40 bg-white/30 text-sm text-white px-10  rounded-lg py-2'>Get Started</Link>
                </div>
            </div>  
        </div>

    )
}

export default Home