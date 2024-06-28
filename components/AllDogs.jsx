"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { Toaster, toast } from "react-hot-toast"; // Import react-hot-toast

const AllDogs = () => {
  const [dogs, setDogs] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    size: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(6); // Number of dogs per page
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true); // Set loading to true before starting fetch
      try {
        const response = await axios.get("/api/add");
        if (response.data.success) {
          setDogs(response.data.dogs);
          setFilteredDogs(response.data.dogs); // Initially set filtered dogs to all dogs
        }
      } catch (error) {
        console.error(
          "Error fetching dogs:",
          error.response?.data?.msg || error.message
        );
      }
      setLoading(false); // Set loading to false after fetch completes
    };
    fetchDogs();
  }, []);

  // Function to handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Function to apply filters and update filteredDogs
  useEffect(() => {
    let filteredResults = dogs.filter((dog) => {
      return (
        (filters.state === "" ||
          dog.breed.toLowerCase().includes(filters.state.toLowerCase())) &&
        (filters.district === "" ||
          dog.training
            .toLowerCase()
            .includes(filters.district.toLowerCase())) &&
        (filters.size === "" ||
          dog.color.toLowerCase() === filters.size.toLowerCase())
      );
    });
    setFilteredDogs(filteredResults);
    setCurrentPage(1); // Reset to first page when filters change
  }, [dogs, filters]);

  // Array of example states and districts
  const exampleStates = [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "Bulldog",
    "Rottweiler",
    "Yorkshire Terrier",
    "Boxer",
    "Dachshund",
    "Other",
  ];
  const exampleDistricts = [
    "District 1",
    "District 2",
    "District 3",
    "District 4",
    "District 5",
  ];
  const exampleSizes = ["Small", "Medium", "Large"];

  // Pagination
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    toast(`Page ${pageNumber} loaded!`); // Show toast notification
  };

  // Go to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      toast(`Page ${currentPage - 1} loaded!`);
    }
  };

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredDogs.length / dogsPerPage)) {
      setCurrentPage(currentPage + 1);
      toast(`Page ${currentPage + 1} loaded!`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 shadow-lg rounded-lg">
      <Toaster /> {/* Add the Toaster component */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Available Dogs for Adoption
      </h1>
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <div className="w-full md:w-auto">
          <label htmlFor="state" className="block font-medium">
            Breed:
          </label>
          <select
            id="state"
            name="state"
            value={filters.state}
            onChange={handleFilterChange}
            className="px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500 w-full"
          >
            <option value="">Select a Breed</option>
            {exampleStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-auto">
          <label htmlFor="district" className="block font-medium">
            District:
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={filters.district}
            onChange={handleFilterChange}
            className="px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500 w-full"
            placeholder="Search for a district"
          />
        </div>
        <div className="w-full md:w-auto">
          <label htmlFor="size" className="block font-medium">
            Size:
          </label>
          <select
            id="size"
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
            className="px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500 w-full"
          >
            <option value="">Any</option>
            {exampleSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Loading indicator */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Dogs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentDogs.length > 0 ? (
              currentDogs.map((dog) => <Card key={dog._id} dog={dog} />)
            ) : (
              <p className="text-center text-gray-500">
                No dogs match the current filters.
              </p>
            )}
          </div>

          {/* Pagination */}
          {filteredDogs.length > dogsPerPage && (
            <div className="flex justify-center mt-4">
              <button
                onClick={goToPreviousPage}
                className={`px-4 py-2 mx-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[...Array(Math.ceil(filteredDogs.length / dogsPerPage))].map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 mx-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none ${
                      currentPage === index + 1 ? "bg-blue-600" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
              <button
                onClick={goToNextPage}
                className={`px-4 py-2 mx-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none ${
                  currentPage === Math.ceil(filteredDogs.length / dogsPerPage)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  currentPage === Math.ceil(filteredDogs.length / dogsPerPage)
                }
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllDogs;
