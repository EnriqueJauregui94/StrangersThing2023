import React, { useState } from 'react';
import '../Style/Signup.css';

function SignupPage() {
    // State to hold user input
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    // State to store registration status and error message
    const [registrationStatus, setRegistrationStatus] = useState({
        success: false,
        error: '',
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle form submission
    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://api.example.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Successful registration
                setRegistrationStatus({ success: true, error: '' });
                // Redirect or perform other actions upon successful registration
            } else {
                // Failed registration, handle the error response
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
