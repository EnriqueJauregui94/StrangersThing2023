import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Navbar.css'

function Navbar() {
    return (
        <nav id="Navbar">
            <div className="Navbar-Container">
                <ul className="Nav-list">
                    <li className="Nav-item">
                        <Link to="/signup">SignUp</Link>
                    </li>
                    <li className="Nav-item">
                        <Link to="/login">Login</Link>
                    </li>
                    <li className="Nav-item">
                        <Link to="/messages" className="button-link">Messages</Link>
                    </li>
                    <li className="Nav-item">
                        <Link to="/posts">Posts</Link>
                    </li>
                    <li className="Nav-item">
                        <Link to="/createpost">Create Post</Link>
                    </li>
                    <li className="Nav-item">
                        <Link to="/logout" className="button-link">Logout</Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
