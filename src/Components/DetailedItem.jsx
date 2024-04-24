import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OffersIndex from "./OffersIndex";

const API = import.meta.env.VITE_API_URL;

const DetailedItem = ({currentUser, value}) => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [seller, setSeller] = useState({})

  
  useEffect(() => {
    console.log(`Fetching item details for ID: ${id}`);
    fetch(`${API}/api/items/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log('Item data received:', data);
      setItem(data);
    })
    .catch(error => console.error('Error fetching item details:', error));
  }, [id]);
  
  useEffect(() => {
    if (item.user_id) {
      fetch(`${API}/api/users/${item.user_id}`)
        .then((res) => res.json())
        .then((data) => setSeller(data));
    }
  }, [API, item.user_id]);

  const { name, description, price, image_url } = item;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-1/2 h-full overflow-hidden">
        <img src={image_url} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="grid md:flex p-8">
        <div className="md:w-5/6">
          <div className="bg-twitter-blue">
            <h1 className="text-4xl font-bold">{name}</h1>
            <span className="flex flex-row gap-2 my-4">
              <p className="font-semibold">Seller: {seller.name}</p>
            </span>
            <span className="flex flex-row gap-2 my-4">
              <p className="font-semibold">${price}</p>
            </span>
            <span>
              <p className="pb-3 text-2xl font-semibold">Description:</p>
              <div className="text-md pb-3 mr-10">
                <span>{description}</span>
              </div>
            </span>
          </div>
        </div>
        <section className="md:w-1/2 bg-gray-200 rounded-xl mb-24">
          <OffersIndex itemId={item.id} currentUser={currentUser} value={value}/>
        </section>
      </div>
    </div>
  );
};

export default DetailedItem;