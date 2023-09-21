import React, { useEffect, useState } from 'react';
import '../Style/Posts.css';
import Delete from './Delete';

const APIURL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch posts when the component mounts
        async function fetchPosts() {
            try {
                const response = await fetch(`${APIURL}/posts`);
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data.data.posts);
                } else {
                    console.error('Failed to fetch posts');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    const handleDeletePost = async (postId) => {
        try {
            const response = await fetch(`${APIURL}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary authentication headers here
                },
            });

            if (response.ok) {
                // Post deleted successfully, update the state to remove the deleted post
                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
            } else {
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="posts-container">
            <h2>Posts</h2>
            {loading ? (
                <p>Loading posts...</p>
            ) : (
                <ul className="post-list">
                    {posts.map((post) => (
                        <li key={post._id} className="post-item">
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                            <Delete handleDelete={() => handleDeletePost(post._id)} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Posts;
