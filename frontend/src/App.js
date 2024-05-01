import React, { useState, useCallback, useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import UserDetails from './pages/UserDetails/UserDetails';
import Navbar from './components/Navbar/Navbar';
import { AuthContext } from './context/auth-context';

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem("userData", JSON.stringify({userId: uid, token: token}));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <>
        <Route path="/" element={<Home />} /> 
        <Route path="/user" element={<UserDetails />} />
        <Route
          path="*"
          element={<Navigate to="/user" replace />}
        />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </>
    );
  }

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn: !!token,
        token: token,
        userId: userId, 
        login: login, 
        logout: logout 
      }}
    >
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>{routes}</Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
