import React, { useState } from 'react';


const SignUpForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
          alert("Passwords don't match");
        }
        // TBD: Validate input, authenticate credentials, etc.
    };
  
    return (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
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
            <div className="input-box">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <button type="submit">Sign up</button>
          </form>
        </div>
    )
}

export default SignUpForm;