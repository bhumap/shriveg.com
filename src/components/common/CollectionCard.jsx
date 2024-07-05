"use client";
import { CartContext } from "@/context/CartContext";
import React, { useEffect, useState } from "react";
import "@/Style/style.css";
import Image from "next/image";
import { useContext } from "react";
import Ripple from "material-ripple-effects";
import { AuthContext } from "@/context/AuthContext";

const CollectionCard = ({ dishes, title, dis }) => {
  const ripple = new Ripple();

  console.log(dishes);

  var { addToCart } = useContext(CartContext);
  var { user } = useContext(AuthContext);

  const [ShowFoodModel, setShowFoodModel] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    if (ShowFoodModel) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "auto";
    }
  }, [ShowFoodModel]);

  const ShowModel = (dish) => {
    setSelectedDish(dish);
    setShowFoodModel(true);
  };

  return (
    <div className="collction-box">
      <h2>{title}</h2>
      <p>{dis}</p>

      <div className="collction-main-box">
      {dishes?.map((v, i) => {
          console.log(v);
          return (
            <div key={i} className="collction-card">
              <Image
                width={100}
                height={150}
                src={v?.images[0]?.secure_url || "/images/t1.avif"}
                alt={v?.images[0]?.secure_url}
              />

              <div className="card-price">
                <h3>{v.title}</h3>
                <p>₹ {v.price}</p>
              </div>
              <div className="flex text-sm justify-between py-2 px-2">
                <div className="text-primary font-medium">
                  <i className="bx bxs-star"></i>0
                  <span className="text-gray-500">(0)</span>
                </div>
                <div className="text-primary font-medium">
                  Serves
                  <span className="text-gray-500">{`(${
                    v?.servingPerson ? v.servingPerson : "0"
                  })`}</span>
                </div>
                <div className="text-primary flex items-center gap-1 font-medium">
                  <i className="bx bxs-time"></i>0 min
                </div>
              </div>
              <div className="px-2">
                <p className="inline text-gray-600 text-sm sm:line-clamp-1">
                  {v.description}
                </p>
                <button
                  onClick={() => ShowModel(v)}
                  className="text-blue-600 text-sm"
                >
                  see details
                </button>
              </div>
              {!(user?.userType == "Chef") ? (
                <div className="flex mt-2 mx-2 justify-between">
                  <button
                    onMouseUp={(e) => ripple.create(e, "light")}
                    onClick={() => addToCart(v)}
                    className="text-primary flex items-center font-medium hover:bg-primary/20 text-sm bg-primary/10 border-primary/20 border p-2 rounded-md"
                  >
                    <i className="pr-1 text-lg bx bx-cart"></i> Add to Cart
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>


      {ShowFoodModel && (
        <div className="fixed visible opacity-100 transition-all duration-300 top-0 flex justify-center items-center overflow-auto p-4 bg-black/90 inset-0 backdrop-blur-sm z-[999]">
          <div
            onClick={() => setShowFoodModel(false)}
            className="absolute inset-0"
          ></div>
          <div className="bg-white translate-y-0 opacity-100 delay-300 transition-all min-w-[280px] md:min-w-[500px] xl:min-w-[700px] duration-500 relative max-w-2xl rounded-md border mx-auto">
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
                  src={selectedDish?.images[0]?.secure_url || "/images/t1.avif"}
                  alt={selectedDish?.title || "Dish Image"}
                />
              </div>
              <div>
                <div className="flex justify-between gap-4">
                  <h2 className="font-semibold mb-1 line-clamp-2">
                    {selectedDish?.title}
                  </h2>
                  <div className="text-lg font-bold whitespace-nowrap">
                    ₹ {selectedDish?.price}
                  </div>
                </div>
                <div className="flex justify-between py-2">
                  <div className="text-primary font-medium">
                    <i className="bx bxs-star"></i>0
                    <span className="text-gray-500 text-sm">(0)</span>
                  </div>
                  <div className="text-primary font-medium">
                    Serves
                    <span className="text-gray-500 text-sm">{`(${
                      selectedDish?.servingPerson || "0"
                    })`}</span>
                  </div>
                  <div className="text-primary flex items-center gap-1 font-medium">
                    <i className="bx bxs-time"></i>0 min
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 ">
                  {selectedDish?.description}
                </p>
              </div>
              {!(user?.userType == "Chef") ? (
                <div className="flex mt-2 justify-between">
                  <button
                    onMouseUp={(e) => ripple.create(e, "light")}
                    onClick={() => addToCart(selectedDish)} 
                    className="text-primary flex items-center font-medium hover:bg-primary/20 text-sm bg-primary/10 border-primary/20 border p-2 rounded-md"
                  >
                    <i className="pr-1 text-lg bx bx-cart"></i> Add to Cart
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionCard;
