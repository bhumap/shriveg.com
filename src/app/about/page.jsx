import React from "react";
import "@/Style/style.css";

const Page = () => {
  return (
    <div>
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-4 sm:px-10 md:px-16 lg:px-28 py-8 mx-auto">
                <article className="text-pretty">
                    <h3 className="text-xl sm:text-2xl text-center mb-6 sm:mb-10 tracking-wide uppercase">About Us</h3>
                    
                    <div className="flex flex-col items-center justify-center mb-5 px-4 sm:px-10 md:px-16 lg:px-28 py-10 mx-auto bg-gray-100 rounded-xl">
                        <div className="max-w-3xl text-center">
                            <h2 className="text-3xl sm:text-2xl font-semibold mb-6 text-gray-800">WHO WE ARE</h2>
                            <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed text-gray-700 mb-6">
                            Shriveg is more than just a vegetarian food delivery service. We are passionate about serving wholesome, delicious, and entirely vegetarian meals. Founded in 2024, Shriveg is dedicated to providing nutritious and flavorful food that supports a healthy and sustainable lifestyle. We believe in the power of plant-based diets to nourish our bodies and protect our planet.
                            </p>
                            <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed text-gray-700">
                            Our team is committed to quality, creativity, and convenience. Every meal we deliver is crafted with care, using the freshest ingredients and innovative recipes. At Shriveg, we don&apos;t just deliver food—we deliver joy, health, and a commitment to a better future.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center mb-5 px-4 sm:px-10 md:px-16 lg:px-28 py-10 mx-auto bg-gray-100 rounded-xl">
                        <div className="max-w-3xl text-center">
                            <h2 className="text-3xl sm:text-2xl font-semibold mb-6 text-gray-800">OUR MISSION</h2>
                            <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed text-gray-700 mb-6">
                            Our mission at Shriveg is to make delicious, healthy vegetarian food accessible to everyone. We aim to inspire and support a plant-based lifestyle by offering a wide range of tasty and nutritious options. Our commitment to sustainability means we prioritize locally-sourced, organic ingredients whenever possible.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center mb-5 px-4 sm:px-10 md:px-16 lg:px-28 py-10 mx-auto bg-gray-100 rounded-xl">
                        <div className="max-w-3xl text-center">
                            <h2 className="text-3xl sm:text-2xl font-semibold mb-6 text-gray-800">OUR STORY</h2>
                            <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed text-gray-700 mb-6">
                            Shriveg was born out of a passion for vegetarian cuisine and a vision for a healthier world. Since our launch in 2024, we have grown from a small startup to a trusted name in vegetarian food delivery. Our journey is driven by a love for good food and a desire to make a positive impact on our community and the environment.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center mb-5 px-4 sm:px-10 md:px-16 lg:px-28 py-10 mx-auto bg-gray-100 rounded-xl">
                        <div className="max-w-3xl text-center">
                            <h2 className="text-3xl sm:text-2xl font-semibold mb-6 text-gray-800">WHY CHOOSE US</h2>
                            <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed text-gray-700 mb-6">
                            At Shriveg, we believe that everyone deserves access to delicious and healthy vegetarian food. Our menu is designed to cater to diverse tastes and dietary needs, offering everything from classic comfort foods to gourmet dishes. We take pride in our exceptional customer service and our commitment to delivering meals that are not only tasty but also good for you and the planet.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center mb-5 px-4 sm:px-10 md:px-16 lg:px-28 py-10 mx-auto bg-gray-100 rounded-xl">
                        <div className="max-w-3xl text-center">
                            <h2 className="text-3xl sm:text-2xl font-semibold mb-6 text-gray-800">SHRIVEG INDIA</h2>
                            <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed text-gray-700 mb-6">
                            Shriveg is proud to serve communities across India. Our mission is to bring the benefits of vegetarian eating to people all over the country, making it easy and convenient to enjoy healthy, delicious meals at home. Whether you&apos;re a lifelong vegetarian or just exploring plant-based options, Shriveg is here to provide you with the best vegetarian food delivery experience.
                            </p>
                        </div>
                    </div>

                </article>
            </div>
        </section>
    </div>
  );
};

export default Page;
