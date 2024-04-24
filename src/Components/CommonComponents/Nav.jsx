import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

const Nav = ({ value }) => {
  return (
    <div>
      <div className="bg-gradient-to-r from-red-500 to-red-400 shadow-lg shadow-black-300">
        <div className="px-4 py-4 flex flex-row justify-between">
          <Link to={"/"}>
            <div className="font-bold text-2xl text-white inline-block">
              <span className="">H</span>aggle
              {/* <span className="">Q</span>uest */}
            </div>
          </Link>
          <div className="flex items-center">
            <Link to={"/items"} className="text-white w-7 h-7 mr-4 md:mr-12">
              Index
            </Link>
            <Link to={value !== null ? "/account" : "/"}>
              <User strokeWidth={3} className="text-white w-7 h-7" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;