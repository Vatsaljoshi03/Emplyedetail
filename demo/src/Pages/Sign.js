import { useState } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sign.css'; 


const Sign = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const navigate = useNavigate();

  const check = () => {
    let isValid = true;

    // Name Validation
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    // Email Validation
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password Validation
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = check(); 

    if (isValid) {
      const formData =  {name , email , password};
      localStorage.setItem('formData', JSON.stringify(formData));
      console.log(formData);
      navigate('/login');
    }
  };

  return (
    <div className="sign-container">
      <h2>Sign here</h2>

      <form onSubmit={handleSubmit} className="sign-form">

        <div className="form-group">
          <input type='text' value={name} placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
          {nameError && <p className="error">{nameError}</p>}
        </div>

        <div className="form-group">
          <input type='email' value={email} placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
          {emailError && <p className="error">{emailError}</p>}
        </div>

        <div className="form-group">
          <input type={showPassword ? 'text' : 'password'} value={password} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>

        <div className="form-group">
          <input type={showPassword ? 'text' : 'password'} value={confirmPassword} placeholder='Confirm your password' onChange={(e) => setConfirmPassword(e.target.value)} />
          {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
          <label>
            <input
              type='checkbox'
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show password
          </label>
        </div>

        <button type='submit' className="submit-button">Login</button>

      </form>
    </div>
  );
};

export default Sign;
