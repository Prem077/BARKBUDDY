"use client";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import food from "@/public/feed.jpg";
import Image from "next/image";
import Loading from "@/app/Loading";

const ProvideFoodPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    foodType: "",
    quantity: "",
    location: "",
    notes: "",
  });
  const [userDetails, setUserDetails] = useState({
    user: "",
    name: "",
    email: "",
  });
  useEffect(() => {
    if (user) {
      setUserDetails({
        user: user.id,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
      });
    }
  }, [user]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/food-donation", {
        userDetails,
        ...formData,
      });
      setSuccess(response.data.message);
      toast.success("Food donation listed successfully! Redirecting...");
      router.push("/contribute/provide-food/my-donations");
    } catch (error) {
      setError(error.response?.data?.msg || error.message);
      toast.error("Failed to list expertise. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex mt-[-2rem]">
        <Toaster />
        <div className="relative w-1/2 flex items-center justify-center bg-black">
          <Image
            src={food}
            alt="Food donation"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 text-white text-center p-4">
            <h1 className="text-4xl font-bold mb-4">Provide Food Donation</h1>
            <p className="text-lg mb-6">
              Help us feed the animals in need by donating food. Your
              contribution is vital in ensuring that the animals under our care
              receive proper nutrition.
            </p>
          </div>
        </div>
        <div className="w-1/2 bg-white p-8 rounded shadow-md flex flex-col justify-center">
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="date"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="time"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="foodType"
              >
                Food Type
              </label>
              <input
                type="text"
                id="foodType"
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="notes"
              >
                Notes
              </label>
              <input
                type="text"
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            {success && <div className="mb-4 text-green-500">{success}</div>}
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit Donation"}
            </button>
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default ProvideFoodPage;
