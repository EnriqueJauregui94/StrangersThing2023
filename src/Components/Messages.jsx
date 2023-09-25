import React, { useState, useEffect } from 'react';
import '../Style/Messages.css'; // Import your CSS file

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D'; // Updated API endpoint

const Messages = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState('your-actual-auth-token-here'); // Add your actual auth token
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showMessages, setShowMessages] = useState(false);
    const [loggedInMessage, setLoggedInMessage] = useState('');
    const [postMessage, setPostMessage] = useState('');

    const myData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
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
                    'Authorization': `Bearer ${authToken}`
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
        if (username && password) {
            setAuthToken('${BASE_URL}/posts/5e8929ddd439160017553e06/messages');
            setIsLoggedIn(true);
            setShowMessages(true);
            setLoginMessage('Successfully logged in');
            setLoggedInMessage('Successfully logged in');
            setPostMessage('Successfully logged in');
            await myData();
            await fetchMessages();
        } else {
            setLoginMessage('Please enter both username and password');
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchMessages();
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
