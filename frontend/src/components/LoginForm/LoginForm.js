import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/auth-context';
import './LoginForm.css';

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    if (response.status === 200) {
      auth.login();
    }
  };

  let navigate = useNavigate(); 
  const signupRoute = () =>{ 
    let path = "/signup"; 
    navigate(path);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <div className="separator">
            <hr />
            <p>or</p>
            <hr />
        </div>
        <button onClick={signupRoute}>Sign up</button>
      </form>
    </div>
  );
};

export default LoginForm;