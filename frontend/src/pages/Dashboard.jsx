import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/car/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",  // Just ensure the content type is set correctly
          },
          credentials: "include", // Ensures that cookies are sent with the request
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setData(data);  // Assuming the response is an array of car objects
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-full bg-white">
      <div className="flex flex-wrap justify-center text-white text-sm gap-8 m-7">
        {data.map((car) => (
          <Card key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
