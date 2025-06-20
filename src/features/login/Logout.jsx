// src/pages/Logout.jsx (or wherever your pages are)

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove('token');
    dispatch({ type: 'RESET_STORE' });
    window.location.replace('/login');
  }, [dispatch]);
  return null; 
};

export default Logout;
