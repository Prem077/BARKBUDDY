"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

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

  const onDrop = useCallback((acceptedFiles) => {
    setFormData((prevState) => ({
      ...prevState,
      picture: acceptedFiles[0],
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 bg-white shadow-lg rounded-xl w-full max-w-lg"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-700">
          List a Dog for Adoption
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Place
            </label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="canLiveWithChildren"
              checked={formData.canLiveWithChildren}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm font-medium text-gray-700">
              Can Live With Children
            </label>
          </div>
          <div className="flex items-center">
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              District
            </label>
            <input
              type="text"
              name="training"
              value={formData.training}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
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
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
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
          </div>
          <div>
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
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div>
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
              {formData.picture ? (
                <p>{formData.picture.name}</p>
              ) : (
                <p className="text-center text-gray-500">
                  Drag &apos;n&apos; drop a picture here, or click to select one
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            List Dog for Adoption
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddADog;
