import React, { useState } from 'react';
import '../Style/Logout.css'

function Logout() {
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const handleLogout = () => {
        setIsLoggedOut(true);

    };

    return (
        <div className="logout-container">
            {!isLoggedOut ? (
                <>
                    <h2>Click the button to log out</h2>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>Successfully logged out!</p>
            )}
        </div>
    );
}

export default Logout;
