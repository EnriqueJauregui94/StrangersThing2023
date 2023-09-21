import React, { useState } from 'react';
import '../Style/CreatePost.css';

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Replace 'YOUR_AUTH_TOKEN_HERE' with the actual authentication token
        const authToken = 'TOKEN';

        try {
            const response = await fetch(`${BASE_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Token}`, // Include the token here
                },
                body: JSON.stringify({ title, content }),
            });

            if (response.ok) {
                // Post was successfully created
                console.log('Post created successfully');
                // You can reset the form fields here if needed
                setTitle('');
                setContent('');
            } else {
                // Handle error cases
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="create-post-container">
            <h2>Create a New Post</h2>
            <form className="create-post-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <button type="submit">Create Post</button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
