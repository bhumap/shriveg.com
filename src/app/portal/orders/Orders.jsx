"use client";
import React, { useContext } from "react";
import ChefOrders from "./ChefOrders";
import CustomerOrders from "./CustomerOrders";
import { AuthContext } from "@/context/AuthContext";

const Orders = () => {
  var { user } = useContext(AuthContext);

  return (
    <div>{user?.userType == "Chef" ? <ChefOrders /> : <CustomerOrders />}</div>
  );
};

export default Orders;
