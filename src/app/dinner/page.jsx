import React from "react";
import CollectionCard from "@/components/common/CollectionCard";

export const metadata = {
  title: "Home - Shri Veg",
  desc: "Online Food Delivery Service Providers",
};

var fetchPopularFoods = async () => {
  try {
    var res = await fetch(`https://www.shriveg.com/api/dishes/?lat=${28.5709396}&lon=${77.2896636}`, {
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
  const fastFoods = foods.data.filter((food) => food.category === "dinner");

  return (
    <div>
      <CollectionCard
        dishes={fastFoods}
        title={"Flavors of dinner"}
        dis={"Savor the flavors of dinner and enjoy a delicious dinner."}
      />
    </div>
  );
};

export default page;
