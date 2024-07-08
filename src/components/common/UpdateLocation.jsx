"use client";

import { useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const UpdateLocation = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const updateLocation = async (lat, lng) => {
      try {
        await axios.put('/api/updateLocation', {
          userId: user._id,
          lat,
          lng,
        });
      } catch (error) {
        console.error("Failed to update location:", error.message);
      }
    };

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );

      // Clean up the watcher on component unmount
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [user]);

  return null;
};

export default UpdateLocation;
