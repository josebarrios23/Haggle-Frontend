import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SingleOffer from "./SingleOffer";

const API = import.meta.env.VITE_API_URL;

const OffersIndex = ({ itemId, currentUser, value }) => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/offers`)
      .then(response => response.json())
      .then(offersData => {
        const filteredOffers = offersData.filter(offer => Number(offer.item_id) === Number(itemId));
        setOffers(filteredOffers);
      })
      .catch(error => console.error("Error fetching offers:", error));
  }, [itemId]);

  useEffect(() => {
    fetch(`${API}/api/users`)
      .then(response => response.json())
      .then(usersData => {
        setUsers(usersData);
      })
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleNewOffer = () => {
    if (value !== null) {
      navigate(`/items/${itemId}/offers/newOffer`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="px-4 border border-gray-300 rounded-xl shadow-md p-2">
      <div className="bg-white text-center rounded-lg py-4 m-2">
        <h2 className="font-bold py-2 text-3xl">Offers</h2>
        <button onClick={handleNewOffer} className="text-red-400">
          New Offer
        </button>
      </div>
      <div className="overflow-y-auto h-[400px]">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <SingleOffer key={offer.id} offer={offer} users={users} currentUser={currentUser} />
          ))
        ) : (
          <p>No offers available for this item.</p>
        )}
      </div>
    </div>
  );
};

export default OffersIndex;