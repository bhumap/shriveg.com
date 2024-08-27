"use client"


import "@/Style/style.css";
import React from "react";

const Page = () => {
    return (
        <div>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-4 sm:px-10 md:px-16 lg:px-28 py-8 mx-auto">
                    <article className="text-pretty">
                        <h3 className="text-xl sm:text-2xl text-center mb-6 sm:mb-10 tracking-wide">SHIPPING & DELIVERY POLICIES </h3>
                        
                        <div className="mb-4 sm:mb-6">
                            <p className="text-sm sm:text-base text-justify font-light tracking-wide leading-relaxed">
                            Shriveg Homemade service Pvt Ltd ships its products to almost all parts of India. Orders placed will be shipped within 24* hrs. We ship on all days except Sunday and National Holidays.
                            </p>
                        </div>

                        <div className="mb-4 sm:mb-6">
                            <p className="text-sm sm:text-base text-justify font-light tracking-wide leading-relaxed">
                            For all areas serviced by reputed couriers, the delivery time would be within 3 to 4 business days of shipping (business days exclude Sundays and other holidays). For other areas the products will be shipped through the local couriers and may take 1-2 weeks depending on location. At times there might be unexpected delays in the delivery of your order due to unavoidable and undetermined logistics challenges beyond our control for which Shriveg Homemade service Pvt Ltd is not liable and would request its users to cooperate as Shriveg Homemade service Pvt Ltd continuously tries to nought such instances. Also, Shriveg Homemade service Pvt Ltd reserves the right to cancel your order at its sole discretion in cases where it takes longer than usual delivery time or the shipment is physically untraceable and refund the amount paid for cancelled product(s) to your source account.
                            </p>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    )
}

export default Page;