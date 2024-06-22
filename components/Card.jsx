import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FaPaw, FaVenusMars, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";

const Card = ({ dog }) => {
  const [loading, setLoading] = useState(false);

  const handleAdoptClick = () => {
    setLoading(true);
    toast.loading("Redirecting to adoption page...");

    // Simulating a delay for demonstration purposes
    setTimeout(() => {
      setLoading(false);
      toast.dismiss();
      toast.success("Successfully redirected!");
      window.location.href = `/adopt-a-dog/dog/${dog._id}`;
    }, 2000); // Simulate a delay of 2 seconds
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105">
      <img
        src={dog.pictureURL}
        alt={dog.name}
        className="w-full h-48 object-cover transition-opacity duration-200 hover:opacity-90"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{dog.name}</h2>
        <div className="flex items-center text-gray-600 mb-2">
          <FaPaw className="mr-2" />
          <p>Breed: {dog.breed}</p>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <FaVenusMars className="mr-2" />
          <p>Gender: {dog.gender}</p>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <FaMapMarkerAlt className="mr-2" />
          <p>Training: {dog.training}</p>
        </div>

        <button
          onClick={handleAdoptClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 flex items-center justify-center w-full transition-colors duration-200"
          disabled={loading}
        >
          {loading ? (
            <FaSpinner className="animate-spin h-5 w-5 mr-3 text-white" />
          ) : (
            "Adopt Me"
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;
