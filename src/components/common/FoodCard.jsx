"use client";
import { CartContext } from "@/context/CartContext";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Ripple from "material-ripple-effects";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";

const FoodCard = ({ food }) => {
  const ripple = new Ripple();

  var { addToCart } = useContext(CartContext);
  var { user } = useContext(AuthContext);
  const [ShowFoodModel, setShowFoodModel] = useState(false);

  useEffect(() => {
    if (ShowFoodModel) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "auto";
    }
  }, [ShowFoodModel]);
  const Showmodel = (v) => {
    setShowFoodModel(true);
  };

  return (
    <div className="bg-white w-full flex flex-col shadow-md border relative  rounded-lg overflow-hidden">
      <div className="flex group justify-center items-center aspect-video overflow-hidden flex-col relative">
        <Image
          width={600}
          height={400}
          className="w-full h-full group-hover:scale-110 transition-all duration-500 object-cover"
          src={food?.images[0]?.secure_url || "/images/image.png"}
          alt=""
        />
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between gap-4">
            <h2 className="font-semibold mb-1 line-clamp-2">{food?.title}</h2>
            <div className="text-lg font-bold whitespace-nowrap">
              ₹ {food?.price}
            </div>
          </div>
          <div>
            <div className="flex text-sm justify-between py-2">
              <div className="text-primary font-medium">
                <i className="bx bxs-star"></i>0
                <span className="text-gray-500">(0)</span>
              </div>
              <div className="text-primary font-medium">
                Serves
                <span className="text-gray-500">{`(${
                  food?.servingPerson ? food.servingPerson : "0"
                })`}</span>
              </div>
              <div className="text-primary flex items-center gap-1 font-medium">
                <i className="bx bxs-time"></i>0 min
              </div>
            </div>

            <div className="">
              <p className="inline text-gray-600 text-sm sm:line-clamp-1">
                {food?.description}
              </p>
              <button
                onClick={(v, food) => Showmodel(v, food)}
                className="text-blue-600 text-sm"
              >
                see details
              </button>
            </div>
          </div>
        </div>

        {!(user?.userType == "Chef") ? (
          <div className="flex mt-2 justify-between">
            <button
              onMouseUp={(e) => ripple.create(e, "light")}
              onClick={() => addToCart(food)}
              className="text-primary flex items-center font-medium hover:bg-primary/20 text-sm bg-primary/10 border-primary/20 border p-2 rounded-md"
            >
              <i className="pr-1 text-lg bx bx-cart"></i> Add to Cart
            </button>
          </div>
        ) : null}
      </div>

      {/* Food Card Popup */}
      <div
        className={`fixed ${ShowFoodModel ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-300 top-0 flex justify-center items-center overflow-auto p-4 bg-black/90 inset-0 backdrop-blur-sm z-[999]`}
      >
        <div
          onClick={() => setShowFoodModel(false)}
          className="absolute inset-0"
        ></div>
        <div
          className={`bg-white ${
            ShowFoodModel
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          } delay-300 transition-all min-w-[280px] md:min-w-[500px] xl:min-w-[700px] duration-500 relative max-w-2xl rounded-md border mx-auto`}
        >
          <div
            onClick={() => setShowFoodModel(false)}
            className="absolute w-6 h-6 rounded-full flex justify-center items-center text-xl bg-gray-600 hover:bg-gray-700 text-white cursor-pointer -top-2 -right-2"
          >
            <i className="bx bx-x"></i>
          </div>

          <div className="p-4 border-b">
            <div className="flex group justify-center mb-4 items-center aspect-video overflow-hidden flex-col relative">
              <Image
                width={600}
                height={400}
                className="w-full h-full object-cover"
                src={food?.images[0]?.secure_url || "/images/image.png"}
                alt=""
              />
            </div>
            <div>
              <div className="flex justify-between gap-4">
                <h2 className="font-semibold mb-1 line-clamp-2">
                  {food?.title}
                </h2>
                <div className="text-lg font-bold whitespace-nowrap">
                  ₹ {food?.price}
                </div>
              </div>
              <div>
                <div className="flex justify-between py-2">
                  <div className="text-primary font-medium">
                    <i className="bx bxs-star"></i>0
                    <span className="text-gray-500 text-sm">(0)</span>
                  </div>
                  <div className="text-primary font-medium">
                    Serves
                    <span className="text-gray-500 text-sm">{`(${
                      food?.servingPerson ? food.servingPerson : "0"
                    })`}</span>
                  </div>
                  <div className="text-primary flex items-center gap-1 font-medium">
                    <i className="bx bxs-time"></i>0 min
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 ">
                  {food?.description}
                </p>
              </div>
              {!(user?.userType == "Chef") ? (
                <div className="flex justify-between">
                  <button
                    onMouseUp={(e) => ripple.create(e, "light")}
                    onClick={() => addToCart(food)}
                    className="text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all border-primary border flex items-center font-semibold px-2 py-2 rounded-md mt-4 text-sm text-center"
                  >
                    <i className="pr-1 text-lg bx bx-cart"></i> Add to Cart
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
