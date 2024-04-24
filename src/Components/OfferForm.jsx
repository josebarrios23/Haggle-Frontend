import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OfferForm = ({user}) => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id, offerId } = useParams();  // Assuming 'offerId' is the param name

  const [offer, setOffer] = useState({
    user_id: user.id,
    item_id: id,  // Link this to the item being offered on, or manage separately
    amount: "",
    message: "",
    created_at: new Date().toISOString()
  });

  useEffect(() => {
    if (offerId) {
      fetch(`${API}/api/offers/${offerId}`)
        .then(response => response.json())
        .then(data => {
          setOffer({ ...offer, ...data });
        })
        .catch(error => console.error("Error fetching offer details:", error));
    }
  }, [offerId]);

  const handleChange = (event) => {
    setOffer({
      ...offer,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = offerId ? `${API}/api/offers/${offerId}` : `${API}/api/offers`;
    const method = offerId ? "PUT" : "POST";
  
    // Only log details when making a POST request
    if (!offerId) {
      console.log("Starting POST request...");
      console.log("POST URL:", url);
      console.log("Data being sent:", offer);
    }
  
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offer)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to submit offer");
      }
      return response.json();
    })
    .then(data => {
      if (!offerId) {
        console.log("POST response data:", data);
      }
    })
    .catch(error => {
      if (!offerId) {
        console.error("Error during POST request:", error);
      }
    })
    .finally(() => {
      navigate(-1); // Navigate back regardless of success or failure
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full z-10 relative border-4 border-gray-300 rounded-xl shadow-xl p-3 bg-gray-100">
        <div className="text-2xl text-center font-bold pb-4">
          {offerId ? "Update your Offer" : "Create a New Offer"}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center">
              <label htmlFor="amount" className="mr-2">Amount:</label>
              <input
                id="amount"
                type="number"
                name="amount"
                value={offer.amount}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="message" className="mr-2">Message:</label>
              <textarea
                id="message"
                name="message"
                value={offer.message}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4">
              {offerId ? "Update" : "Submit"}
            </button>
            <button type="button" onClick={() => navigate(-1)} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferForm;
