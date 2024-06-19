"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

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

  useEffect(() => {
    const fetchDogs = async () => {
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
          dog.state.toLowerCase().includes(filters.state.toLowerCase())) &&
        (filters.district === "" ||
          dog.district
            .toLowerCase()
            .includes(filters.district.toLowerCase())) &&
        (filters.size === "" ||
          dog.size.toLowerCase() === filters.size.toLowerCase())
      );
    });
    setFilteredDogs(filteredResults);
    setCurrentPage(1); // Reset to first page when filters change
  }, [dogs, filters]);

  // Array of example states and districts
  const exampleStates = [
    "California",
    "Texas",
    "New York",
    "Florida",
    "Illinois",
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
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Available Dogs for Adoption
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <div className="w-full md:w-auto">
          <label htmlFor="state" className="block font-medium">
            State:
          </label>
          <select
            id="state"
            name="state"
            value={filters.state}
            onChange={handleFilterChange}
            className="px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500 w-full"
          >
            <option value="">Select a state</option>
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
          <select
            id="district"
            name="district"
            value={filters.district}
            onChange={handleFilterChange}
            className="px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500 w-full"
          >
            <option value="">Select a district</option>
            {exampleDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
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

      {/* Dogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      )}
    </div>
  );
};

export default AllDogs;
