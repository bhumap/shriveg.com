"use client";

import React from "react";
import HolidayStatus from "./HolidayStatus";
import DishesStatus from "./DishesStatus";
import ProfileStatus from "./ProfileStatus";

const Availabilty = () => {
 
  return (
    <>
  
  <div className="p-4">
  <HolidayStatus />
    <DishesStatus/>
    <ProfileStatus/>
  </div>
    </>
  );
};

export default Availabilty;
