import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";

const Navbar = (props) => {
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown
  const navigate = useNavigate(); // For navigation after logout

  const logOutHandler = async () => {
    // Clear session or user data
    // const response = await fetch("http://localhost:3000/blinkit/logout", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    // });

    // if (response.ok) {
    //   setIsLoggedIn(false);
    //   toast.success("Logged Out");
    // }
    
    console.log("logout");
    setIsLoggedIn(false); // Log out locally
    toast.success("Logged Out");
    navigate("/"); // Redirect to the home page after logout
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto">
      <Link to="/">
        <p className="text-zinc-100 font-bold">Car-Management-App</p>
      </Link>
      <nav>
        <ul className="text-white flex gap-x-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Navbar right section */}
      <div className="flex items-center gap-x-4 text-white">
        {!isLoggedIn && (
          <>
            <Link to="/login">
              <button className="bg-gray-600 py-[8px] px-[12px] rounded-[8px] border border-gray-600">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-gray-600 py-[8px] px-[12px] rounded-[8px] border border-gray-600">
                Signup
              </button>
            </Link>
          </>
        )}

        {isLoggedIn && (
          <div className="flex items-center gap-7">
            {/* Profile Icon and Dropdown */}
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center gap-2">
                <CgProfile size={34} />
                <span>Owner</span> {/* Replace with dynamic user name if needed */}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg">
                  <div className="px-4 py-2 text-gray-700">Owner Name</div> {/* Replace with dynamic name */}
                  <hr />
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-200"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={logOutHandler}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Additional Links */}
            <Link to="/dashboard">
              <button className="bg-gray-600 py-[8px] px-[12px] rounded-[8px] border border-gray-600">
                Dashboard
              </button>
            </Link>
            <Link to="/upload">
              <FaCloudUploadAlt size={34} />
            </Link>
          </div>
        )}
      </div>

      {/* Search bar input */}
      <div className="ml-4 flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-[8px] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-200 text-black"
        />
      </div>
    </div>
  );
};

export default Navbar;
