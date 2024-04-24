import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Nav from "./Components/CommonComponents/Nav";
import Footer from "./Components/CommonComponents/Footer";
import LandingPage from "./Components/CommonComponents/LandingPage";
import ItemsIndex from "./Components/ItemsIndex"; 
import DetailedItem from "./Components/DetailedItem"; 
import OfferForm from "./Components/OfferForm"; 
import AboutTheDevs from "./Components/CommonComponents/AboutTheDevs";
import UserDetails from "./Components/UserDetails";
import NewItemForm from "./Components/NewItemForm";
import NotFoundAlert from "./Components/NotFoundAlert";
import { useLocation } from "react-router-dom";

const App = () => {
   const API = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value) {
      fetch(`${API}/api/users/${value}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, [API, value]);

  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  return (
    <div className="font-noto-sans">
      <div>
        {!isLandingPage && <Nav value={value}/>}
        <Routes>
          <Route path="/" element={<LandingPage setValue={setValue} />} />
          <Route path="/items" element={<ItemsIndex />} />
          <Route
            path="/items/:id"
            element={<DetailedItem currentUser={user} value={value} />}
          />
          <Route
            path="/items/account/newItem"
            element={<NewItemForm user={user} />}
          />
          <Route
            path="/items/:id/editItem"
            element={<NewItemForm user={user}/>}
          />
          <Route
            path="/items/:id/offers/:offerId/edit"
            element={<OfferForm user={user} />}
          />
          <Route
            path="/items/:id/offers/newOffer"
            element={<OfferForm user={user} />}
          />
          <Route path="/account" element={<UserDetails user={user} value={value}/>} />
          <Route path="/aboutthedevs" element={<AboutTheDevs />} />
          {/* Route for handling non-existent routes */}
          <Route path="*" element={<NotFoundAlert />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
