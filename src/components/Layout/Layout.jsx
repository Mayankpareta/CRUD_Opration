import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Galaxy from './BgAnimation';

const API_URL = 'http://localhost:8000/api/users';

function Layout() {
  const [users, setUsers] = useState([]);
  const [editingUserData, setEditingUserData] = useState(null)

  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  }



  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <div style={{ width: '100%', height: '600px', position: 'relative', backgroundColor: '#000000' }}>
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1}
          glowIntensity={0.2}
          saturation={0.4}
          hueShift={240}
        />
      </div>
      <div className='absolute -inset-0 text-white'>
        <Header />
        <Outlet context={{ users, fetchUsers, editingUserData, setEditingUserData, API_URL }} />
        <Footer />
      </div>
    </>
  )
}

export default Layout