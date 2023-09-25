import React, { useState, useEffect } from 'react';
import '../Style/CreatePost.css';

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D/posts';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [authToken, setAuthToken] = useState(''); 
    useEffect(() => {
        fetchAuthToken();
    }, []);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const fetchAuthToken = async () => {
        try {
            const response = await fetch(`${BASE_URL}/authToken`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAuthToken(data.token); 
            } else {
                console.error('Failed to fetch authentication token.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`, 
                },
                body: JSON.stringify({
                    post: {
                        title,
                        description: content,
                        price: "$480.00",
                        willDeliver: true
                    }
                })
            });

            if (response.ok) {
                console.log('Post created successfully');
                setTitle('');
                setContent('');
                setIsSuccess(true);
            } else {
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

            {isSuccess && (
                <p style={{ color: 'green' }}>Post Created Successfully!</p>
            )}
        </div>
    );
}

export default CreatePost;
