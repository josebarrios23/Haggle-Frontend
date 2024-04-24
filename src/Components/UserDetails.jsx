import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SingleItem from "./SingleItem";

const API = import.meta.env.VITE_API_URL;

const UserDetails = ({user, value}) => {

  const navigate = useNavigate();

  const [userItems, setUserItems] = useState([]);
  const URL = `${API}/api/items`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();

        const filteredItems = data.filter(item => item.user_id === user.id);

        setUserItems(filteredItems);
      } catch (error) {
        console.error("Error fetching user items:", error);
      }
    };

    fetchData();
  }, [user]);

  function navigateNewItemForm() {
    if (value !== null){
      navigate("/items/account/newItem");
    } else {
      navigate("/")
    }
  };
  

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl mb-8 pt-24 font-extrabold">{user ? `${user.name}'s Account` : "User Account"}</h2>

      <button className="bg-orange-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded-md w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4 mr-4" onClick={() => navigateNewItemForm()}>
                New Item
              </button>
      
      <h3 className="text-3xl font-bold mb-4"></h3>
      <hr className="mt-1 mb-6 border-2" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-36">
        {userItems.map(item => (
  <div key={item.id}>
    <SingleItem key={item.id} item={item} />
  </div>
))}
      </div>
    </div>
  );
};

export default UserDetails;