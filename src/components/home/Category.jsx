"use client";

import React from "react";
import Link from "next/link";
import "@/Style/style.css";
import Image from "next/image";

const Category = () => {
  return (
    <div>
      <div className="category-box">
        <h4 className="what">Select your meal?</h4>
        <div className="category-inner">
          <ul>
            <li>
              <Link className="block md:inline-block p-2" href="/collections">
                <Image
                  width={600}
                  height={400}
                  src="/images/break.png"
                  alt=""
              
                />
                 Breakfast
              </Link>
             
            </li>
            <li>
              <Link className="block md:inline-block p-2" href="/MiddayCravings">
                <Image
                  width={600}
                  height={400}
                  src="/images/lunch.png"
                  alt=""
          
                />
                 Lunch
              </Link>
             
            </li>
            <li>
            <Link className="block md:inline-block p-2" href="/Brunch">
                <Image
                  width={600}
                  height={400}
                  src="/images/break.png"
                  alt=""
              
                />
                 Brunch
              </Link>
            </li>
            <li>
              <Link className="block md:inline-block p-2" href="/dinner">
                <Image
                  width={700}
                  height={500}
                  className="denar"
                  src="/images/denar.png"
                  alt="Description of the image"
                />
                  Dinner
              </Link>
            
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;
