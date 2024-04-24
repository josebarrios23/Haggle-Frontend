import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SingleItem from "./SingleItem";
import { Search } from "lucide-react";

const ItemsIndex = () => {
  const API = import.meta.env.VITE_API_URL;
  // const API = "https://coursquest-backend.onrender.com";
  // useState for All Items
  const [allItems, setAllItems] = useState([]);
  // useState for filtered items
  const [items, setItems] = useState([]);
  // useState for search bar inputs
  const [input, setInput] = useState("");
  // useState for selected filter
  const [selectedFilter, setSelectedFilter] = useState("");
  // useState for setting the filters
  const [filters, setFilters] = useState([]);

  // Function to filter items based on selected filter
  function filterItems(filter) {
    if (filter === "All") {
      setItems(allItems);
    } else {
      const filtered = allItems.filter(
        (item) =>
          item.name === filter || // Assuming "name" is the correct field in the backend
          (item.price === 0 && filter === "Free") // Assuming "price" is the correct field in the backend
      );
      setItems(filtered);
    }
  }

  // Function to handle filter change
  function handleFilterChange(event) {
    const filter = event.target.value;
    setSelectedFilter(filter);
    filterItems(filter);
  }

  // Function to handle search input change
  function handleSearchChange(event) {
    const search = event.target.value;
    const result = search.length
      ? allItems.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) // Assuming "name" is the correct field in the backend
        )
      : allItems;
    setInput(search);
    setItems(result);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/api/items`); // Update endpoint based on backend routes
        if (!response.ok) {
          throw new Error('Failed to fetch item data');
        }
        const data = await response.json();
        setAllItems(data);
        setItems(data);

        // Extracting unique item names for filters
        const itemNames = [...new Set(data.map((item) => item.name))];
        const filters = ["All", "Free", ...itemNames]; // Assuming "Free" is a valid filter option
        setFilters(filters);
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };
  
    fetchData();
  }, [API]);

  return (
    <>
      {items.length > 0 && (
        <div className="mx-16 pt-24 pb-36">
          <div className="flex items-center  h-12 mb-12">
            <div className="flex items-center flex-grow rounded-xl focus-within:shadow-lg bg-white  border-4 border-gray-300 hover:border-gray-400">
              <div className="mr-2 ">
                <Search className="h-6 w-6 text-gray-300 ml-2" />
              </div>
              <input
                className="h-full flex-grow outline-none text-sm text-black rounded-xl"
                type="text"
                id="search"
                placeholder="Search.."
                value={input}
                onChange={handleSearchChange}
              />
            </div>
            {/* <div className="ml-4">
              <select
                className="flex justify-center items-center h-9 rounded-xl border-4 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={selectedFilter}
                onChange={handleFilterChange}
              >
                {filters.length > 0 &&
                  filters.map((filter, index) => (
                    <option key={index} value={filter}>
                      {filter}
                    </option>
                  ))}
              </select>
            </div> */}
          </div>
          <div className="text-4xl font-extrabold">Items</div>
          <hr className="mt-1 mb-6 border-2" />
          <div>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
              {items.length > 0 &&
                items.map((item) => (
                  <SingleItem key={item.id} item={item} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemsIndex;
