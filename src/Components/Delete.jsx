import React from 'react';
import '../Style/Delete.css';

const APIURL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D/delete';

const Delete = ({ postId, authToken }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`${APIURL}/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            console.log('Response Status:', response.status);


            if (response.ok) {
                console.log('Post deleted successfully');
            } else {
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <button className="delete-button" onClick={handleDelete}>
            Delete
        </button>
    );
};

export default Delete;
