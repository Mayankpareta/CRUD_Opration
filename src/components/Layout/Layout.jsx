import React, { useEffect, useState } from 'react';
import Form from '../Form/Form';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://192.168.0.7:8000/api/users';

function Layout() {
  const [users , setUsers ] = useState([]);
  const [editingUserData , setEditingUserData ] = useState(null)

  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  }


  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
    <Header />
    <Outlet context={{ users, fetchUsers, editingUserData, setEditingUserData, API_URL }} />
    <Footer />
    </>
  )
}

export default Layout