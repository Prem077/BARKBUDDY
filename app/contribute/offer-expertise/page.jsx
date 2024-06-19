"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import expertisatino from "@/public/time.jpg";
import Loading from "@/app/Loading";

const ExpertisePage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    expertise: "",
    hours: "", // Add hours to the formData state
  });
  const [userDetails, setUserDetails] = useState({
    user: "",
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserDetails({
        user: user.id,
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/expertise", {
        userDetails,
        ...formData,
      });
      console.log("Received response:", res.data);
      console.log("Contribution saved successfully");
      toast.success("Expertise listed successfully! Redirecting...");
      setTimeout(() => {
        router.push("/contribute/offer-expertise/my-expertise");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Failed to save contribution details", error);
      toast.error("Failed to list expertise. Please try again.");
    }
    console.log("Form data:", formData);
    setLoading(false);
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen flex mt-[-2rem]">
        <Toaster />
        <div className="relative w-1/2 flex items-center justify-center bg-black">
          <Image
            src={expertisatino}
            alt="BARKBUDDY Logo"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 text-white text-center p-4">
            <h1 className="text-4xl font-bold mb-4">
              BARKBUDDY Volunteer Signup
            </h1>
            <p className="text-lg mb-6">
              Join us in making a difference in the lives of animals. Select a
              date and time that works for you and become a part of our mission.
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
                htmlFor="hours"
              >
                Hours
              </label>
              <input
                type="number"
                id="hours"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="expertise"
              >
                Type of Expertise
              </label>
              <select
                id="expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="" disabled>
                  Select expertise
                </option>
                <option value="training">Training</option>
                <option value="veterinary">Veterinary Services</option>
                <option value="grooming">Grooming</option>
                <option value="nutrition">Nutrition</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded w-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default ExpertisePage;
