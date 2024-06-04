import React from "react";
import ChefProfile from "@/components/ChefProfile/ChefProfile";
import { notFound } from "next/navigation";

var fetchAllChefDishes = async (username) => {
  try {
    var res = await fetch(
      `${process.env.DOMAIN}/api/dishes?chef=${username.slice(3)}`,
      { cache: "no-store", credentials: "include" }
    );
    res = await res.json();
    return res;
  } catch (error) {
    return false;
  }
};

export const metadata = {
  title: "Chef Profile - Shri Veg",
  desc: "Online Food Delivery Service Providers",
};

const page = async ({ params }) => {


  if (!params.username.startsWith("%40")) {
    notFound();
  }

  // console.log()

  var dishes = await fetchAllChefDishes(params.username);


  if (!dishes?.success) {
    notFound();
  }

  return (
    <div>
      <ChefProfile chefDetail={dishes} />
    </div>
  );
};

export default page;
