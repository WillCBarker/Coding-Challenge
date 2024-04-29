import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <body>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </body>
      </BrowserRouter>
    </>
  );
}

export default App;
