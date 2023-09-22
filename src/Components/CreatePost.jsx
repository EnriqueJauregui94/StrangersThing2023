import React, { useState } from 'react';
import '../Style/CreatePost.css';

const APIURL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D/posts';

function CreatePost({ authToken }) {
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

        try {
            const response = await fetch(`${APIURL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    post: {
                        title: "My favorite stuffed animal",
                        description: "This is a pooh doll from 1973. It has been carefully taken care of since I first got it.",
                        price: "$480.00",
                        willDeliver: true
                    }
                })
            });
            const result = await response.json();
            console.log('API Response:', response);


            if (response.ok) {
                console.log('Post created successfully');
                setTitle('');
                setContent('');
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
        </div>
    );
}

export default CreatePost;
