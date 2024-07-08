"use client"

import { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const UpdateLocation = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const updateLocation = async (lat, lng) => {
      try {
        await axios.put('/api/updateLocation', {
          userId: user._id,
          lat,
          lng
        });
      } catch (error) {
        console.error("Failed to update location:", error.message);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    }
  }, [user]);

  return null;
};

export default UpdateLocation;
