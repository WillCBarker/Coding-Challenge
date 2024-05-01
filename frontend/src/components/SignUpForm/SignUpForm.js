import React, { useState, useContext } from 'react';

import { emailValidator, lenRequirement, letterRequirement, numberRequirement, specialCharRequirement } from '../../util/validators.js';
import { AuthContext } from '../../context/auth-context';

import './SignUpForm.css'

const SignUpForm = () => {
    const auth = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loginErrors, setLoginErrors] = useState({
      lengthError: "Password must be at least 8 characters long.",
      letterError: "Password must contain at least one letter.",
      numberError: "Password must contain at least one number.",
      specialCharError: "Password must contain at least one special character.",
      invalidEmailError: "Please provide a valid email address."
    });
    const hasErrors = Object.values(loginErrors).some((error) => error !== "");

    const handlePasswordChange = (event) => {
      const newPassword = event.target.value;
      setPassword(newPassword);
      validateLogin(newPassword, confirmPassword, email); // Pass confirm password to validate
    };
  
    const handleConfirmPasswordChange = (event) => {
      const newConfirmPassword = event.target.value;
      setConfirmPassword(newConfirmPassword);
      validateLogin(password, newConfirmPassword, email); // Pass password to validate
    };
    
    const validateLogin = (password, confirmPassword, email) => {
      let errors = { ...loginErrors };
      errors.lengthError = lenRequirement(password) ? "" : "Password must be at least 8 characters long.";
      errors.letterError = letterRequirement(password) ? "" : "Password must contain at least one letter.";
      errors.numberError = numberRequirement(password) ? "" : "Password must contain at least one number.";
      errors.specialCharError = specialCharRequirement(password) ? "" : "Password must contain at least one special character.";
      errors.misMatchError = password === confirmPassword ? "" : "Passwords do not match. "; // Check for mismatch
      errors.invalidEmailError = emailValidator(email) ? "" : "Please provide a valid email address.";
      setLoginErrors(errors);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
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
              {Object.values(loginErrors).map((error, index) => (
                error && <li key={index} className="error-message">{error}</li>
              ))}
            </ul>
            <button type="submit" disabled={hasErrors}>Sign up</button>
          </form>
        </div>
    )
}

export default SignUpForm;