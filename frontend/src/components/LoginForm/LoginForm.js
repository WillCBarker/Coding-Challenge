import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/auth-context';
import './LoginForm.css';

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    console.log(response.status);
    if (response.status === 200) {
      const responseData = await response.json();
      auth.login(responseData.userId, responseData.token);
    } else {
      setErrorMessage("Invalid login credentials.");
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
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
        {errorMessage && (
          <p style={{ color: "red" }}>{errorMessage}</p>
        )}
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