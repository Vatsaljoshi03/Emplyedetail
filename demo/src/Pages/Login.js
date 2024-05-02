import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        const storedFormData = localStorage.getItem('formData');
            
        if (storedFormData) {
            const formData = JSON.parse(storedFormData);
        
            if (email === formData.email && password === formData.password) {
                const token = 222;
                localStorage.setItem('token', JSON.stringify(token));
                navigate('/details');
            } else {
                setError('Invalid email or password');
            }
        } else {
            setError('Please sign up first');
        }
    };

    const handleSignUp = () => {
        navigate('/sign'); 
    };

    const isLoggedIn = localStorage.getItem('token');

    if (isLoggedIn) {
        navigate('/form');
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input 
                        type='text' 
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input 
                        type='password' 
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button type='submit' className="login-button">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
            <button onClick={handleSignUp} className="sign-button">Sign Up</button>
        </div>
    );
}
export default Login;
