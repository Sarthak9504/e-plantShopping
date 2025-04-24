import React, { useState } from 'react';
import './AuthForm.css';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isRegistering ? 'register' : 'signin';

        const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch(login({ username, token: data.token }));
            navigate('/');
        } else {
            alert(data.message || 'Something went wrong');
        }
    };

    return (
        <div className="auth-form">
            <h2 style={{ color: 'black' }}>{isRegistering ? 'Register' : 'Sign In'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isRegistering ? 'Register' : 'Sign In'}</button>
            </form>
            <p>
                {isRegistering ? 'Already registered?' : 'New here?'}{' '}
                <button onClick={() => setIsRegistering(!isRegistering)} className="toggle-button">
                    {isRegistering ? 'Sign In' : 'Register'}
                </button>
            </p>
        </div>
    );
}

export default AuthForm;
