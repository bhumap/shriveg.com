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
        const status = await navigator.permissions.query({ name: 'geolocation' });
        setPermissionStatus(status.state);
      } catch (error) {
        console.error('Error checking permission status:', error);
      }
    };
    checkPermission();
  }, []);

  const requestPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location access granted:', position);
          router.push('/');
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.log('Location access denied.');
            setPermissionStatus('denied');
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleButtonClick = () => {
    if (permissionStatus === 'denied') {
      alert('Location access has been denied. Please enable location access from your device settings.');
    } else if (permissionStatus !== 'granted') {
      requestPermission();
    } else {
      console.log('Permission already granted.');
      router.push('/');
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
        <button
          onClick={handleButtonClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded set-location"
        >
          Set location manually
        </button>
      </div>
    </div>
  );
};

export default Locate;
