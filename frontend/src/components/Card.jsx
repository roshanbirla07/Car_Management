import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ car }) => {
  const navigate = useNavigate();

  // Handle navigation to the car details page
  const handleClick = () => {
    console.log(car.id);
    navigate(`/car-details/${car.id}`);
  // Use the car id to route correctly
  };

  return (
    <div 
      className="max-w-xs rounded overflow-hidden shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      {/* Ensure imageLinks exists and has at least one link */}
      {car.imageLinks && car.imageLinks.length > 0 ? (
        <img className="w-full" src={car.imageLinks[0]} alt={car.title} />
      ) : (
        <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
          <span className="text-white">No Image Available</span>
        </div>
      )}
      
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{car.title}</div>
        <p className="text-gray-700 text-base">{car.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="inline-block bg-blue-500 text-white px-4 py-2 rounded">
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
