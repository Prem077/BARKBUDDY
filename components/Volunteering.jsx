"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { format, parseISO } from "date-fns";

const Volunteering = () => {
  const { user } = useUser();
  const [volunteerings, setVolunteerings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteerings = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`/api/volunteer?user=${user.id}`);
        setVolunteerings(response.data.volunteerings || []);
        console.log(response.data);
      } catch (error) {
        console.error(
          "Error fetching volunteerings:",
          error.response?.data?.msg || error.message
        );
        setError(error.response?.data?.msg || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerings();
  }, [user]);

  return (
    <div className="min-h-screen mt-[-2rem] bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          My Volunteerings
        </h1>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : volunteerings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {volunteerings.map((volunteering) => (
              <div
                key={volunteering._id}
                className="bg-gray-50 p-4 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {volunteering.name}
                </h2>
                <p className="text-gray-600 mb-1">
                  {format(parseISO(volunteering.date), "PPP")} at{" "}
                  {volunteering.time}
                </p>
                <p className="text-gray-600 mb-1">
                  Type: {volunteering.expertise}
                </p>
                <p className="text-gray-600 mb-1">
                  Hours: {volunteering.hours}
                </p>
                <p className="text-gray-600 mb-1">
                  Location: {volunteering.location}
                </p>
                {volunteering.notes && (
                  <p className="text-gray-600">Notes: {volunteering.notes}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No volunteerings found.</p>
        )}
      </div>
    </div>
  );
};

export default Volunteering;
