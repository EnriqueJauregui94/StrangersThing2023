import React, { useState, useEffect } from 'react';
import Delete from './Delete'; // Import the Delete component

const APIURL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D';

function AuthProvider() {
    const [authToken, setAuthToken] = useState(null);

    const obtainAuthToken = async () => {
        try {
            const authData = {
                username: 'your_username',
                password: 'your_password',
            };

            const response = await fetch(`${APIURL}/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(authData),
            });

            if (response.ok) {
                const responseData = await response.json();
                const { token } = responseData.data;
                setAuthToken(token);
            } else {
                console.error('Authentication failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        obtainAuthToken();
    }, []);

    return (
        <div>
            <Delete postId="123" authToken={authToken} />
        </div>
    );
}

export default AuthProvider;
