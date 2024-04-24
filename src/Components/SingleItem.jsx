import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const SingleItem = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [deleted, setDeleted] = useState(false); // State to track deleted item

  function navigateItem(id) {
    navigate(`/items/${id}`);
  }

  const handleDeleteItem = (id) => {
    fetch(`${API}/api/items/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Item deleted successfully");
          setDeleted(true); // Update state upon successful deletion
        } else {
          throw new Error("Failed to delete item");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  function navigateEditForm(id) {
    navigate(`/items/${id}/editItem`);
  }

  // Render null if item is deleted
  if (deleted) return null;

  const isItemsPage = location.pathname === "/items";

  return (
    <div>
      <div
        className="shadow-2xl rounded-xl overflow-hidden bg-white hover:scale-105 transition-transform duration-300"
        onClick={() => navigateItem(item.id)}
      >
        <img
          className="rounded-t-xl w-full h-100 object-cover"
          src={item.image_url}
          alt="item image"
        />
        <div className="bg-white h-46 mb-2 rounded-b-xl p-3">
          <div className="text-2xl border-b-2 pb-1 mb-2 font-semibold">
            {item.name}
          </div>
          {item.price === "0.00" ? (
            <div className="text-green-500 font-bold mt-1">FREE</div>
          ) : (
            <div className="font-bold mt-1">${item.price} </div>
          )}
        </div>
      </div>
      {!isItemsPage && (
        <>
          <button
            className="bg-orange-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded-md w-1/6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4 mr-4"
            onClick={() => navigateEditForm(item.id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-1 rounded-md w-1/6 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mt-4 mr-4"
            onClick={() => handleDeleteItem(item.id)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default SingleItem;