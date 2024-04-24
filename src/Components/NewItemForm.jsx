import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NewItemForm = ({user}) => {
  const API = import.meta.env.VITE_API_URL;
  const currentDate = new Date();
  const navigate = useNavigate();
  const { id } = useParams();

  const [newOrUpdatedItem, setNewOrUpdatedItem] = useState({
    user_id: user.id,
    name: "",
    description: "",
    price: "",
    image_url: "",
    created_at: currentDate.toISOString()
  });

  useEffect(() => {
    if (id) {
      fetch(`${API}/api/items/${id}`)
        .then(response => response.json())
        .then((item) => {
          setNewOrUpdatedItem({ ...newOrUpdatedItem, ...item });
        })
        .catch(error => {
          console.error("Error fetching item details:", error.message);
        });
    }
  }, [id]);

  const handleTextChange = (event) => {
    setNewOrUpdatedItem({
      ...newOrUpdatedItem,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = id
      ? `${API}/api/items/${id}`
      : `${API}/api/items`;

    fetch(url, {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrUpdatedItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            id ? "Failed to update item" : "Failed to submit item"
          );
        }
        console.log(
          id
            ? "Item updated successfully"
            : "Item submitted successfully"
        );
        setNewOrUpdatedItem({
            user_id: user.id,
            name: "",
            description: "",
            price: "",
            image_url: "",
            created_at: currentDate.toISOString()
          });
      })
      .then(() => {
        navigate(`/account`);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        {/* Your background image styling */}
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-80 min-w-72 z-10 relative border-4 border-gray-300 rounded-xl shadow-xl p-3 bg-gray-100">
          <div className="text-2xl text-center font-bold pb-4">
            Add your new item here!
          </div>
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="flex flex-col items-center space-y-3">
              {/* Name input */}
              <div className="flex justify-center items-center">
                <label htmlFor="name" className="mr-2">
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={newOrUpdatedItem.name}
                  onChange={handleTextChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter item name"
                  required
                />
              </div>
              {/* Description input */}
              <div className="flex justify-center items-center">
                <label htmlFor="description" className="mr-2">
                  Description:
                </label>
                <textarea
                  style={{ resize: "none" }}
                  id="description"
                  type="text"
                  name="description"
                  value={newOrUpdatedItem.description}
                  onChange={handleTextChange}
                  className="w-full border border-gray-300 p-2 rounded-md h-40 focus:outline-none focus:border-blue-500 shadow"
                  placeholder="Enter item description"
                  required
                />
              </div>
              {/* Price input */}
              <div className="flex justify-center items-center">
                <label htmlFor="price" className="mr-2">
                  Price:
                </label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={newOrUpdatedItem.price}
                  onChange={handleTextChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter item price"
                  required
                />
              </div>
              {/* Image URL input */}
              <div className="flex justify-center items-center">
                <label htmlFor="image_url" className="mr-2">
                  Image URL:
                </label>
                <input
                  id="image_url"
                  type="text"
                  name="image_url"
                  value={newOrUpdatedItem.image_url}
                  onChange={handleTextChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Enter image URL"
                  required
                />
              </div>
            </div>
  
            {/* Submit and cancel buttons */}
            <div className="flex justify-start">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
              >
                {id ? "Update" : "Submit"}
              </button>
              <button
                onClick={() => navigate(-1)}
                type="submit"
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4 ml-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewItemForm;
