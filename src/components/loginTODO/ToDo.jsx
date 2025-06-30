import React, { useEffect, useState } from 'react'
import axios from 'axios'
import App from '../../App';
import { useNavigate, useOutletContext } from 'react-router-dom';

function ToDo() {
    const navigate = useNavigate()
    // const { users } = useOutletContext()
    const [ todoData, setTodoData] = useState([]);
    const [ editingTodoId, setEditingTodoId] = useState(null);
    const [ todo, setTodo] = useState({
        title: '',
        // description: ''
    })
    
    
    const API_URL = 'http://192.168.0.7:8000/api/todo'


    const token = localStorage.getItem('token')

    // get method 
    const getMethod = async () => {
        try {   
            const res = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTodoData(res.data)  
            setUserName(res.data[0].user) 
            console.log("todoData", res.data);
            
        } catch (error) {
            console.error('error', error)
        }
    }
    useEffect(() => {
        if(!token) {
            navigate("/login")
            return;
        }
        getMethod()
    },[])

    useEffect(() => {
        getMethod()
    }, [])

    //input data save 
    const handleChange = (e) => {  
        setTodo({
            ...todo,
            [e.target.name] : e.target.value
        })
    }
    
    // put and post method
    const handleClick = async () => { 
        try {  
            if(editingTodoId) {                
                await axios.put(`${API_URL}/${editingTodoId}`, todo , {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })   
                setEditingTodoId(null)    
            } else {
                await axios.post(API_URL, todo, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
               
            }                    
            setTodo({
                title: ''
            })
            getMethod();
        } catch (error) {
            console.error("Error", error)
        }
    }    
    
    //Edit method
    const editHandleClick = (todo) => {
        
        setEditingTodoId(todo._id)
        setTodo({ title: todo.title })        
    }

    //delete method
    const deleteHandleChange = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            })
            getMethod()
        } catch (error) {
            console.error("delete data error", error)
        }
    }

    let userName = JSON.parse(localStorage.getItem('userName'))
    

  return (
    <div className='bg-[#899878] min-h-[513px] py-10'>
        <div>
            <div>
                <h2>{todoData.map(todo => {
                    todo
                })}</h2>
                <div>
                    <span className='text-start text-2xl pl-8'>Welcome { userName }</span>
                    <h2 className='text-3xl text-center'>TODO</h2>
                </div>
            </div>
            <div className='py-3 text-center'>
                <div className='my-3'>
                    <input 
                    name='title'
                    maxLength="20" 
                    value={todo.title}
                    onChange={handleChange}
                    className='border border-black px-2'
                    type='text'
                    placeholder='Enter Title'
                    />
                </div>
                
                {/* <div className='my-3'>
                    <input 
                    name='description'
                    onChange={handleChange}
                    className='border border-black px-2'
                    type='text'
                    placeholder='Enter TODO'
                    />
                </div> */}
                
                <button
                className='border border-gray mx-3 px-5 hover:bg-[#4b5446]'
                onClick={() => handleClick()}
                >{ editingTodoId ? "Edit" : "Add"}</button>
            </div>
            <div className='py-4 min-h-60 flex justify-center'>
                <div>
                    <ol >                        
                    {todoData.map((todo) => {
                       return <div key={todo._id} className='my-2 text-center'><li
                       className='bg-[#707C64] w-96 px-1 py-2 '
                       >
                        <span className='text-xl'>Title : </span>
                        <div className='inline max-w-52 text-xl font-bold'>{todo.title} </div>
                        <div className='inline w-40'>
                            <button
                            onClick={() => editHandleClick(todo)}
                            className='border border-black px-3 ml-2 hover:bg-[#4b5446]'
                            >Edit</button>
                            <button
                            onClick={() => deleteHandleChange(todo._id)}
                            className='border border-black px-3 ml-2 hover:bg-[#4b5446]'
                            >Delete</button>
                        </div>
                        </li>
                        </div>
                    })}
                    </ol>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ToDo