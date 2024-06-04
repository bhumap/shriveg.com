import React from "react";
import CollectionCard from "@/components/common/CollectionCard";

export const metadata = {
  title: "Home - Shri Veg",
  desc: "Online Food Delivery Service Providers",
};


var fetchPopularFoods = async () => {
  try {
    var res = await fetch(`${process.env.DOMAIN}/api/dishes`, {
      cache: "no-store",
    });
    res = await res.json();
    return res.message;
  } catch (error) {
    console.log(error);
  }
};

const page = async () => {
  var foods = await fetchPopularFoods();
  const fastFoods = foods.data.filter((food) => food.category === "brunch");

  return (
    <div>
      <CollectionCard dishes={fastFoods} title={"Irresistible Brunch"} dis={"Treat yourself to a delightful mid-day feast!"}/>
    </div>
  );
};

export default page;
