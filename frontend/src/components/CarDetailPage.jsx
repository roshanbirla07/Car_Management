import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CarDetailPage = () => {
  const { id } = useParams();  // Get the car id from the URL
  const [car, setCar] = useState(null);
  console.log("loging at the cardetailpage ",id)

  useEffect(() => {
    // Fetch car data based on the id (you could replace this with an actual API call)
    const fetchCarDetails = () => {
      // Example of a car data set
      const carData = [
        { id: "1", title: "Honda Civic", description: "A well-maintained car", ownerName: "John Doe", imageLinks: ["https://res.cloudinary.com/dkjp0w9kw/image/upload/v1723864567/imageUpload/badminton.png.png"] },
        { id: "2", title: "Toyota Corolla", description: "A reliable car", ownerName: "Jane Smith", imageLinks: ["https://cloudinary.com/image2.jpg"] },
      ];

      const selectedCar = carData.find(car => car.id === id);
      setCar(selectedCar);
    };

    fetchCarDetails();
  }, [id]);

  if (!car) return <div>Loading...</div>;

  return (
       

    <div className="car-detail-page max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">{car.title}</h1>
    <img src={car.imageLinks[0]} alt={car.title} className="w-full h-auto rounded-lg shadow-md mb-6" />
    <p className="text-lg text-gray-700 mb-4">{car.description}</p>
    <p className="text-md text-gray-600">Owner: <span className="font-semibold">{car.ownerName}</span></p>
  </div>
  
  );
};

export default CarDetailPage;
