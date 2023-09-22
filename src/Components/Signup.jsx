import React, { useState } from 'react';
import '../Style/Signup.css';

const APIURL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D/users/register';

function SignupPage() {
    // State to hold user input
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [registrationStatus, setRegistrationStatus] = useState({
        success: false,
        error: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${APIURL}users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: formData })
            });

            if (response.ok) {
                setRegistrationStatus({ success: true, error: '' });
            } else {
                const errorData = await response.json();
                setRegistrationStatus({ success: false, error: errorData.message });
            }
        } catch (error) {
            console.error('Registration error:', error);
            setRegistrationStatus({ success: false, error: 'An error occurred during registration.' });
        }
    };

    return (
        <div className="signup-page">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {registrationStatus.error && <div className="error-message">{registrationStatus.error}</div>}
            {registrationStatus.success && (
                <div className="success-message">Registration successful! You can now log in.</div>
            )}
        </div>
    );
}

export default SignupPage;
