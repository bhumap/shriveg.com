import React from "react";
import FoodCard from "../common/FoodCard";

export default function PopularFoods({ dishes }) {
  const signatureDishes = dishes?.data?.filter(
    (item) => item?.isSignatured === true
  );
  const nonSignatureDishes = dishes?.data?.filter(
    (item) => item?.isSignatured !== true
  );

  return (
    <>
      <div className="px-4 bg-white py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="lg:text-5xl md:text-4xl text-2xl font-bold text-center mb-3">
            Popular Foods
          </h2>
          <p className="max-w-2xl mx-auto text-center mb-10">
            Based on foodie choices and ratings, here are the top picks in your
            vicinity!
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-5xl gap-6">
            {nonSignatureDishes?.map((v, i) => {
              return <FoodCard key={i} food={v} />;
            })}
          </div>
        </div>
      </div>
      <div className="px-4 bg-white py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="lg:text-5xl md:text-4xl text-2xl font-bold text-center mb-3">
          Signature Dishes
          </h2>
          <p className="max-w-2xl mx-auto text-center mb-10">
            Elevate your dining experience to new heights with our signature
            dishes.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-5xl gap-6">
            {signatureDishes?.map((v, i) => {
              return <FoodCard key={i} food={v} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
