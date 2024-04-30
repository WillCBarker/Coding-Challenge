import React, { useState, useCallback } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import UserDetails from './pages/UserDetails/UserDetails';
import Navbar from './components/Navbar/Navbar';
import { AuthContext } from './context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, []);

  let routes;

  if (isLoggedIn) {
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
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
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
