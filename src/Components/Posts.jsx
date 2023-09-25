import React, { useEffect, useState } from 'react';
import '../Style/Posts.css';
import Delete from './Delete';
import { Link } from 'react-router-dom';

const APIURL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${APIURL}/posts`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data.data.posts);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                }, 2000);
            } else {
                console.error('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            const response = await fetch(`${APIURL}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedPosts = posts.filter((post) => post._id !== postId);
                setPosts(updatedPosts);
            } else {
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Function to add a new post to the posts state
    const addNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="posts-container">
            <h2>Posts</h2>
            {isSuccess && <p style={{ color: 'green' }}>Post Successfully Rendered!</p>}

            {!loading && (
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            )}

            {loading ? (
                <p>Loading posts...</p>
            ) : (
                <ul className="post-list">
                    {filteredPosts.map((post) => (
                        <li key={post._id} className="post-item">
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                            <div className="post-buttons">
                                <Link to="/createpost">
                                    <button className="create-post-button">Create Post</button>
                                </Link>
                                <span className="button-gap" />
                                <Delete handleDelete={() => handleDeletePost(post._id)} />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Posts;
