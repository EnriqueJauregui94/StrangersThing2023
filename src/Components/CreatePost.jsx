import React, { useState } from 'react';
import '../Style/CreatePost.css';

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D/posts';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // Track success state

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authToken = 'TOKEN';

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
                        description: content, // Use content for description
                        price: "$480.00",
                        willDeliver: true
                    }
                })
            });

            if (response.ok) {
                // Post was successfully created
                console.log('Post created successfully');
                setTitle('');
                setContent('');
                setIsSuccess(true); // Set success state to true
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
