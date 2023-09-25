import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/Navbar';
import CreatePost from './Components/CreatePost';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Posts from './Components/Posts';
import Logout from './Components/Logout';
import Messages from './Components/Messages';
import './Style/Messages.css';
import './Style/Logout.css';
import './Style/Posts.css';
import './Style/Signup.css';
import './App.css';
import './Style/Navbar.css';
import './Style/Login.css';
import './Style/CreatePost.css';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;