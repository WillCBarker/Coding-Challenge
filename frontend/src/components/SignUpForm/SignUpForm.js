import React, { useState, useContext } from 'react';

import { lenRequirement, letterRequirement, numberRequirement, specialCharRequirement } from '../../util/validators.js';
import { AuthContext } from '../../context/auth-context';

import './SignUpForm.css'

const SignUpForm = () => {
    const auth = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordErrors, setPasswordErrors] = useState({
      lengthError: "Password must be at least 8 characters long.",
      letterError: "Password must contain at least one letter.",
      numberError: "Password must contain at least one number.",
      specialCharError: "Password must contain at least one special character.",
    });
    const hasErrors = Object.values(passwordErrors).some((error) => error !== "");

    const handlePasswordChange = (event) => {
      const newPassword = event.target.value;
      setPassword(newPassword);
      validatePassword(newPassword, confirmPassword); // Pass confirm password to validate
    };
  
    const handleConfirmPasswordChange = (event) => {
      const newConfirmPassword = event.target.value;
      setConfirmPassword(newConfirmPassword);
      validatePassword(password, newConfirmPassword); // Pass password to validate
    };
  
    const validatePassword = (password, confirmPassword) => {
      let errors = { ...passwordErrors };
      errors.lengthError = lenRequirement(password) ? "" : "Password must be at least 8 characters long.";
      errors.letterError = letterRequirement(password) ? "" : "Password must contain at least one letter.";
      errors.numberError = numberRequirement(password) ? "" : "Password must contain at least one number.";
      errors.specialCharError = specialCharRequirement(password) ? "" : "Password must contain at least one special character.";
      errors.misMatchError = password === confirmPassword ? "" : "Passwords do not match"; // Check for mismatch
      setPasswordErrors(errors);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("SUBMITTED");
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        if (response.status === 201) {
          const responseData = await response.json();
          auth.login(responseData.userId, responseData.token);
        }
    };
  
    return (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
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
                onChange={handlePasswordChange}
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <ul>
              {Object.values(passwordErrors).map((error, index) => (
                error && <li key={index} className="error-message">{error}</li>
              ))}
            </ul>
            <button type="submit" disabled={hasErrors}>Sign up</button>
          </form>
        </div>
    )
}

export default SignUpForm;