import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Style/Login.css';

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D';

const Login = ({ onLogin }) => {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password,
                    },
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                if (result.data && result.data.token) {
                    const authToken = result.data.token;
                    onLogin(authToken);
                    setIsLoggedIn(true);
                } else {
                    setError('Token not found in response.');
                }
            } else {
                const errorResponse = await response.json();
                setError(errorResponse.error.message || 'Authentication failed.');
            }
        } catch (err) {
            setError('An error occurred during login.');
            console.error(err);
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            {isLoggedIn ? ( // Conditional rendering for the success message
                <div className="success-message">Successfully logged in</div>
            ) : (
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
            )}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Login;
