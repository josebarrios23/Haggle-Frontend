import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = ({setValue}) => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState("");
  

  const handleUserSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedUser(selectedValue);
    if (selectedValue === "demo") {
      setValue(2);
    }
  };

  const handleSubmit = () => {
    if (selectedUser === "demo") {
      navigate("/items");
    }
  };

  return (
    <div className="">
      <div>
        <section className="bg-white text-orange-400 py-20 px-5 md:px-20 h-screen">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-5">
                  Welcome to Haggle
                </h1>
                <select
                  value={selectedUser}
                  onChange={handleUserSelect}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded inline-block appearance-none h-12 mr-4"
                >
                  <option value="">Select User</option>
                  <option value="demo">Demo User</option>
                </select>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded inline-block mt-4 h-12"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              <div>
                <img
                  src="https://hips.hearstapps.com/hmg-prod/images/haggling-skills-1676974370.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=640:*"
                  className="w-4/5 h-auto pl-50 rounded shadow-xl"
                  alt="Haggling"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;