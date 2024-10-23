"use client";
import React, { useState } from "react";
import axios from "axios";
import { CartContext } from "@/context/CartContext";

const Hero = () => {
  const [searchType, setSearchType] = useState("food");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://shriveg.com/api/search/search?title=${searchTerm}`
      );
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelectChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="heroSection h-screen">
      <div className="top-1/2 -translate-y-1/2 absolute left-1/2 -translate-x-1/2 sm:translate-x-0 px-4 sm:left-[10%]">
        <div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 text-center sm:text-left">
          Unique Food Network
          </h1>
          <form
            onSubmit={handleSearch}
            className="rounded-[.25rem] overflow-hidden border border-white/40 min-w-60 flex flex-col sm:flex-row"
          >
            <div className="relative w-full sm:w-auto">
              <select
                name="searchType"
                value={searchType}
                onChange={handleSelectChange}
                className="bg-primary text-white w-full bg-none py-4 px-9 pr-5 text-sm appearance-none border-0"
              >
                <option value="food">Find a Food</option>
                <option value="chef">Find a Chef</option>
              </select>
              <i className="bx absolute left-4 text-white text-sm top-1/2 -translate-y-1/2 bxs-down-arrow"></i>
            </div>
            <div className="flex flex-1">
              <input
                type="text"
                name="searchTerm"
                value={searchTerm}
                onChange={handleInputChange}
                className="border-0 flex-1"
                placeholder={`Enter Your ${
                  searchType === "food" ? "Food" : "Chef"
                } Name`}
              />
              <button
                type="submit"
                className="bg-white border-l text-xl flex items-center justify-center p-4"
              >
                <i className="bx bx-search-alt"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
