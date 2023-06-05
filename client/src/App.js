import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { check, getUserProfileData } from './http/userAPI';
import { setUser, setIsAuth, setUserInfo, } from '../src/store/UserStore';
import LoadingSpin from './components/LoadingSpin/LoadingSpin';

function App() {
  const user = useSelector(state => state.user._user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const getAuthorizationCheck = async () => {
    try {
      const data = await check()
      dispatch(setUser(data))
      dispatch(setIsAuth(true))
    } finally {
      setLoading(false)
    }
  }

  const getUserInfo = async () => {
    try {
        let data = await getUserProfileData(user.id)
        console.log(data);
        dispatch(setUserInfo(data))
    } catch (e) {
        console.log(e)
    }
}

  useEffect(() => {
    getAuthorizationCheck()
  }, [])

  useEffect(() => {
    if (user.id) {
      getUserInfo();
    }
  }, [user.id])

  if (loading) {
    return <LoadingSpin type='fullpage'/>
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;