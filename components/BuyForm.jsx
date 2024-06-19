"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faComment,
  faPhone,
  faMapMarkerAlt,
  faCity,
  faFlag,
  faMapPin,
  faCalendarAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";
import image from "@/public/adopt.webp";

export default function SinglePageForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    date: "",
    time: "",
  });
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data: ", formData);

    // Simulating form submission
    setError(["Form submission not implemented"]);
    setSuccess(true);

    // Uncomment below code when you have actual form submission logic

    const res = await fetch("api/buy", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);
    console.log("msg", msg);
    if (success) {
      // Handle success
      router.push("/");
      console.log("push");
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-[-2rem] md:flex-row">
      {/* Left Section */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-black">
        <Image
          src={image}
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-white text-center p-4">
          <h1 className="text-4xl font-bold mb-4">Adopt a Dog</h1>
          <p className="text-lg mb-6">
            Find your new best friend by filling out the form below to get in
            touch with us.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white p-8 rounded shadow-md flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Adoption Inquiry Form
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          Please fill out the form below and our team will contact you shortly.
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto space-y-4"
        >
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              <FontAwesomeIcon icon={faUser} /> Full Name
            </label>
            <input
              onChange={handleChange}
              value={formData.name}
              type="text"
              name="name"
              id="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
            <input
              onChange={handleChange}
              value={formData.email}
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="john@gmail.com"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 font-medium">
              <FontAwesomeIcon icon={faPhone} /> Phone Number
            </label>
            <input
              onChange={handleChange}
              value={formData.phone}
              type="text"
              name="phone"
              id="phone"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Type your phone number here..."
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              <FontAwesomeIcon icon={faComment} /> Your Message
            </label>
            <textarea
              onChange={handleChange}
              value={formData.message}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 resize-none"
              id="message"
              name="message"
              placeholder="Type your message here..."
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="address" className="block mb-1 font-medium">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Address
            </label>
            <input
              onChange={handleChange}
              value={formData.address}
              type="text"
              name="address"
              id="address"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Type your address here..."
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block mb-1 font-medium">
              <FontAwesomeIcon icon={faCity} /> City
            </label>
            <input
              onChange={handleChange}
              value={formData.city}
              type="text"
              name="city"
              id="city"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Type your city here..."
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block mb-1 font-medium">
              <FontAwesomeIcon icon={faFlag} /> State
            </label>
            <input
              onChange={handleChange}
              value={formData.state}
              type="text"
              name="state"
              id="state"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Type your state here..."
              required
            />
          </div>
          <div>
            <label htmlFor="zip" className="block mb-1 font-medium">
              <FontAwesomeIcon icon={faMapPin} /> Zip Code
            </label>
            <input
              onChange={handleChange}
              value={formData.zip}
              type="text"
              name="zip"
              id="zip"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Type your zip code here..."
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block mb-1 font-medium">
              <FontAwesomeIcon icon={faCalendarAlt} /> Choose Date
            </label>
            <input
              onChange={handleChange}
              value={formData.date}
              type="date"
              name="date"
              id="date"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block mb-1 font-medium">
              <FontAwesomeIcon icon={faClock} /> Choose Time Slot
            </label>
            <input
              onChange={handleChange}
              value={formData.time}
              type="time"
              name="time"
              id="time"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
          {success && (
            <div className="text-green-800 bg-gray-100 px-4 py-2 rounded-md mt-4">
              Form submitted successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
