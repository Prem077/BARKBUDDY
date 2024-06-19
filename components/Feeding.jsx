"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { format, parseISO } from "date-fns";

const Feeding = () => {
  const { user } = useUser();
  const [feedings, setFeedings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedings = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`/api/food-donation?user=${user.id}`);
        setFeedings(response.data.feeding || []);
        console.log(response.data);
      } catch (error) {
        console.error(
          "Error fetching feedings:",
          error.response?.data?.msg || error.message
        );
        setError(error.response?.data?.msg || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedings();
  }, [user]);

  return (
    <div className="min-h-screen mt-[-2rem] bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          My Feedings
        </h1>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : feedings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {feedings.map((feeding) => (
              <div
                key={feeding._id}
                className="bg-gray-50 p-4 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold mb-2">{feeding.name}</h2>
                <p className="text-gray-600 mb-1">
                  {format(parseISO(feeding.date), "PPP")} at {feeding.time}
                </p>
                <p className="text-gray-600 mb-1">Type: {feeding.foodType}</p>
                <p className="text-gray-600 mb-1">
                  Quantity: {feeding.quantity}
                </p>
                <p className="text-gray-600 mb-1">
                  Location: {feeding.location}
                </p>
                {feeding.notes && (
                  <p className="text-gray-600">Notes: {feeding.notes}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No feedings found.</p>
        )}
      </div>
    </div>
  );
};

export default Feeding;
