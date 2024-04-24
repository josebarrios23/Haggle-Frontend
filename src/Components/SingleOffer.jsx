import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

const SingleOffer = ({ offer, users, currentUser, itemId }) => {
    const navigate = useNavigate();  
    const offerUser = users.find(user => user.id === offer.user_id);
    const [isDeleted, setIsDeleted] = useState(false); // State to track if the offer is deleted

    const handleDelete = () => {
        fetch(`${API}/api/offers/${offer.id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setIsDeleted(true); // Update state to mark offer as deleted
            } else {
                throw new Error('Failed to delete the offer');
            }
        })
        .catch(error => console.error('Error deleting offer:', error));
    };

    const handleEdit = () => {
        navigate(`/items/${itemId}/offers/${offer.id}/edit`);
    };

    if (isDeleted) {
        return null; // Don't render anything if the offer is deleted
    }

    return (
        <div className="bg-white border border-blue-950 rounded-lg shadow-md p-2 m-2">
            <div className="">
                <p className="text-lg font-bold">{offerUser ? offerUser.name : "Unknown"}:</p>
                <p className="text-lg text-orange-400 ml-2">${offer.amount}</p>
                <p className="text-lg ml-2">{offer.message}</p>
                <p className="text-lg text-orange-400 ml-2">{offerUser ? offerUser.email : "NO EMAIL"}</p>
                {Number(currentUser?.id) === Number(offer.user_id) && (
                    <>
                        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                        <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                            Edit
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SingleOffer;