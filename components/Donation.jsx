"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const Donation = () => {
  const { user } = useUser();
  const [contri, setContri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContri = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`/api/donate?user=${user.id}`);
        setContri(response.data.donations);
        console.log(response.data);
      } catch (error) {
        console.error(
          "Error fetching contri:",
          error.response?.data?.msg || error.message
        );
        setError(error.response?.data?.msg || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContri();
  }, [user]);

  console.log(contri);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-4">MY Donations</h1>
        <hr className="mb-4" />
        <h2 className="text-xl font-semibold text-center mb-6">
          Monetary Donations
        </h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : contri.length > 0 ? (
          <ul className="space-y-4">
            {contri.map((donation) => (
              <li
                key={donation._id}
                className="flex justify-between p-4 bg-gray-100 rounded-lg"
              >
                <span className="font-medium">{donation.name}</span>
                <span className="text-gray-700">₹{donation.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500">No donations found.</div>
        )}
      </div>
    </div>
  );
};

export default Donation;
