"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import image from "@/public/add.webp";

const AddADog = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    story: "",
    canLiveWithChildren: false,
    isVaccinated: false,
    training: "",
    gender: "Male",
    breed: "",
    color: "",
    picture: null,
    pictureURL: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormData((prevState) => ({
      ...prevState,
      picture: file,
      pictureURL: URL.createObjectURL(file),
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear errors
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.place) formErrors.place = "Place is required";
    if (!formData.training) formErrors.training = "District is required";
    if (!formData.breed) formErrors.breed = "Breed is required";
    if (!formData.color) formErrors.color = "Size is required";
    if (!formData.picture) formErrors.picture = "Picture is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const loadingToastId = toast.loading("Listing dog...");

    const uploadData = new FormData();
    uploadData.append("file", formData.picture);
    uploadData.append("name", formData.name);

    try {
      const uploadRes = await axios.post("/api/upload-image", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const pictureURL = uploadRes.data.msg.secure_url;

      const finalFormData = {
        ...formData,
        pictureURL,
        story: "xyz", // default value
        age: 1, // default value
        weight: 1, // default value
        height: 1, // default value
      };

      const response = await axios.post("/api/add", finalFormData);
      toast.success("Dog listed successfully", { id: loadingToastId });
      console.log("Dog listed successfully:", response.data);
      router.push("/adopt-a-dog");
    } catch (error) {
      toast.error("Error listing dog", { id: loadingToastId });
      console.error(
        "Error listing dog:",
        error.response?.data?.msg || error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row mt-[-2rem]">
      <Toaster />
      {/* Left Section */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-black">
        <Image
          src={image}
          alt="Adopt a Dog"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-white text-center p-4">
          <h1 className="text-4xl font-bold mb-4">List a Dog for Adoption</h1>
          <p className="text-lg mb-6">
            Fill out the form to list a dog for adoption.
          </p>
        </div>
      </div>
      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white p-8 rounded shadow-md flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          List Dog for Adoption
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          Please provide the details of the dog.
        </p>
        <div className="w-full max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="gap-10">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`mt-1  block w-full rounded-lg border-gray-300 bg-gray-200 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">
                  Place
                </label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full rounded-lg border-gray-300 bg-gray-200 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.place ? "border-red-500" : ""
                  }`}
                />
                {errors.place && (
                  <p className="text-red-500 text-sm">{errors.place}</p>
                )}
              </div>
              <div className=" mt-5  flex items-center">
                <input
                  type="checkbox"
                  name="canLiveWithChildren"
                  checked={formData.canLiveWithChildren}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 bg-gray-200 rounded focus:ring-indigo-500"
                />
                <label className="ml-2 block text-sm font-medium text-gray-700">
                  Can Live With Children
                </label>
              </div>
              <div className=" mt-5 flex items-center">
                <input
                  type="checkbox"
                  name="isVaccinated"
                  checked={formData.isVaccinated}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label className="ml-2 block text-sm font-medium text-gray-700">
                  Is Vaccinated
                </label>
              </div>
              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">
                  District
                </label>
                <input
                  type="text"
                  name="training"
                  value={formData.training}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full rounded-lg border-gray-300 bg-gray-200 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.training ? "border-red-500" : ""
                  }`}
                />
                {errors.training && (
                  <p className="text-red-500 text-sm">{errors.training}</p>
                )}
              </div>
              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-200 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="breed"
                  className="block text-sm font-medium text-gray-700"
                >
                  Breed
                </label>
                <select
                  id="breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full rounded-lg border-gray-300 bg-gray-200 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.breed ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a breed</option>
                  <option value="Labrador Retriever">Labrador Retriever</option>
                  <option value="German Shepherd">German Shepherd</option>
                  <option value="Golden Retriever">Golden Retriever</option>
                  <option value="Bulldog">Bulldog</option>
                  <option value="Poodle">Poodle</option>
                  <option value="Beagle">Beagle</option>
                  <option value="Rottweiler">Rottweiler</option>
                  <option value="Yorkshire Terrier">Yorkshire Terrier</option>
                  <option value="Boxer">Boxer</option>
                  <option value="Dachshund">Dachshund</option>
                  <option value="Other">Other</option>
                </select>
                {errors.breed && (
                  <p className="text-red-500 text-sm">{errors.breed}</p>
                )}
              </div>
              <div className="mt-5">
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
                  Size
                </label>
                <select
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                  className={`mt-1 block w-full rounded-lg border-gray-300 bg-gray-200 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.color ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
                {errors.color && (
                  <p className="text-red-500 text-sm">{errors.color}</p>
                )}
              </div>
              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">
                  Picture
                </label>
                <div
                  {...getRootProps()}
                  className={`mt-1 p-6 rounded-lg border-dashed border-2 ${
                    isDragActive ? "border-indigo-600" : "border-gray-300"
                  } bg-gray-50`}
                >
                  <input {...getInputProps()} />
                  {formData.pictureURL ? (
                    <img
                      src={formData.pictureURL}
                      alt="Preview"
                      className="mx-auto w-32 h-32 object-cover"
                    />
                  ) : (
                    <p className="text-center text-gray-500">
                      Drag &apos;n&apos; drop a picture here, or click to select
                      one
                    </p>
                  )}
                </div>
                {errors.picture && (
                  <p className="text-red-500 text-sm">{errors.picture}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-5 flex justify-center py-3 px-4 rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Listing..." : "List Dog for Adoption"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddADog;
