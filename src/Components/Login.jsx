import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Style/Login.css';

const Login = () => {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: { username, password } })
            });
            const result = await response.json();
            setSuccessMessage(result.message);
            setUserData(result.data);
            console.log(result);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <Link to="/signup">
                    <button className="signup-button">Sign Up</button>
                </Link>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default Login;
