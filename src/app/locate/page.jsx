"use client";
import "@/Style/style.css";

import React from "react";

const Locate = () => {
  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          alert(
            `Location obtained! Latitude: ${latitude}, Longitude: ${longitude}`
          );
        },
        (error) => {
          console.error("Geolocation error:", error);
          if (error.code === error.PERMISSION_DENIED) {
            alert(
              "Location access was denied. Please enable location access in your browser settings and try again."
            );
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            alert("Location information is unavailable.");
          } else if (error.code === error.TIMEOUT) {
            alert("The request to get user location timed out.");
          } else {
            alert("An unknown error occurred.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div>
      <div className="locate-box">
        <div className="locate-img"></div>
        <h4>Location not found</h4>
        <p>
          Granting permission for location access is essential for practical
          use.
        </p>
        <button
          onClick={handleLocationRequest}
          className="mt-4  px-4 py-2 bg-blue-500 text-white rounded set-location"
        >
          Set location manually
        </button>
      </div>
    </div>
  );
};

export default Locate;
