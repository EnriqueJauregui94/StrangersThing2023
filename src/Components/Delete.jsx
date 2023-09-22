import React from 'react';
import '../Style/Delete.css';

const APIURL = 'https://strangers-things.herokuapp.com/api/2302-ACC-ET-WEB-PT-D';

const Delete = ({ postId, authToken, onDeleteSuccess, onDeleteError }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`${APIURL}/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                console.log('Post deleted successfully');
                onDeleteSuccess();
            } else {
                console.error('Failed to delete post');
                onDeleteError();
            }
        } catch (error) {
            console.error('Error:', error);
            onDeleteError();
        }
    };



    return (
        <button className="delete-button" onClick={handleDelete}>
            Delete
        </button>
    );
};

export default Delete;
