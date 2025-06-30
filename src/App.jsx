import { useState } from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import './App.css'
import Layout from './components/Layout/Layout'
import Form from './components/Form/Form'
import Login from './components/Login/Login'
import ToDo from './components/loginTODO/ToDo'
import ForgetPass from './components/ForgetPassword/ForgetPass'
import NewPass from './components/ForgetPassword/NewPass'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path:'/form',
          element: <Form />
        },
        {
          path:'/login',
          element: <Login />
        },
        {
          path:'/forgetPassword',
          element: <ForgetPass />
        },
        {
          path:'/newPassword/:token',
          element: <NewPass />
        },
        {
          path:'/todo',
          element: <ToDo />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
