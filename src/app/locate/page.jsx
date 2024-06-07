"use client";
import "@/Style/style.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Locate = () => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const status = await navigator.permissions.query({
          name: "geolocation",
        });
        setPermissionStatus(status.state);
      } catch (error) {
        console.error("Error checking permission status:", error);
      }
    };
    checkPermission();
  }, []);

  const requestPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location access granted:", position);
          router.push("/");
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.log("Location access denied.");
            setPermissionStatus("denied");
          }
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleButtonClick = () => {
    if (permissionStatus === "denied") {
      alert(
        "Location access has been denied. Please enable location access from your device settings."
      );
    } else if (permissionStatus !== "granted") {
      requestPermission();
    } else {
      console.log("Permission already granted.");
      router.push("/");
    }
  };

  return (
    <div>
      <div className="locate-box">
        <div className="locate-img"></div>
        <h4>Location not found</h4>
        <p className="access">
          Granting permission for location access is essential for practical
          use.
        </p>
      </div>

      <div className="search-hero">
        <div className="search-box">
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter area, street name..."
          />
          <button className="search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 50 50"
            >
              <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
            </svg>
          </button>
        </div>
        <div className="search-box search-box2" onClick={handleButtonClick}>
          <div className="using-gps">
            <i className="bx bx-current-location"></i>
            <div className="my-loc">
              <h4>Use Current Location</h4> <br />
              <p>Using Gps</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locate;
