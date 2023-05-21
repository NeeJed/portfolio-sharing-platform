import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';
import { useSelector, useDispatch } from 'react-redux';
import { check } from './http/userAPI';
import { setUser, setIsAuth, } from '../src/store/UserStore';
import LoadingSpin from './components/LoadingSpin/LoadingSpin';

function App() {
  const user = useSelector(state => state.user._user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      dispatch(setUser(data))
      dispatch(setIsAuth(true))
      setLoading(false)
    }).finally(() => setLoading(false))
  }, [])

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