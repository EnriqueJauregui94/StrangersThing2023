import React, { useState, useEffect } from 'react';
import '../Style/Messages.css'; // Import your CSS file

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D'; // Updated API endpoint

const Messages = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState('your-actual-auth-token-here'); // Add your actual auth token
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [messages, setMessages] = useState([]); // Store fetched messages
    const [showMessages, setShowMessages] = useState(false); // Initialize to false
    const [loggedInMessage, setLoggedInMessage] = useState('');
    const [postMessage, setPostMessage] = useState(''); // State for posted message

    const myData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}` // Use the stored token
                },
            });
            const result = await response.json();
            console.log(result);
            return result;
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${BASE_URL}/posts/5e8929ddd439160017553e06/messages`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}` // Use the stored token
                },
            });
            const result = await response.json();
            console.log(result);
            setMessages(result.data.messages);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogin = async () => {
        // Simulate a login action (set the authToken to your actual token)
        // For a real application, you would send the username and password to the server for authentication
        if (username && password) {
            setAuthToken('your-actual-auth-token-here');
            setIsLoggedIn(true);
            setShowMessages(true); // Show messages after successful login
            setLoginMessage('Successfully logged in');
            setLoggedInMessage('Successfully logged in'); // Set the logged-in message
            setPostMessage('Successfully logged in'); // Set the post-login message
            await myData();
            await fetchMessages(); // Fetch messages after login
        } else {
            setLoginMessage('Please enter both username and password');
        }
    };

    // Use useEffect to fetch data when isLoggedIn is true
    useEffect(() => {
        if (isLoggedIn) {
            fetchMessages(); // Fetch and display messages after login
        }
    }, [isLoggedIn]);

    return (
        <div>
            {!isLoggedIn ? (
                <div className="login-box">
                    <div className="login-content">
                        <p>Please sign in to view Messages</p>
                        <button onClick={() => setIsLoggedIn(true)}>Log In</button>
                    </div>
                </div>
            ) : (
                <div>
                    {showMessages && (
                        <div className="messages-container">
                            {messages.map((message) => (
                                <div key={message._id}>{message.content}</div>
                            ))}
                        </div>
                    )}
                    {loggedInMessage && <p>{loggedInMessage}</p>}
                </div>
            )}
            {isLoggedIn && !showMessages && (
                <div className="login-box">
                    <div className="login-content">
                        {loginMessage && <p>{loginMessage}</p>}
                        {postMessage && <p>{postMessage}</p>} {/* Display post-login message */}
                        <div className="input-container">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button onClick={handleLogin}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;
