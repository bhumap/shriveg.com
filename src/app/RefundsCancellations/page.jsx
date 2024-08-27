import React from "react";
import "@/Style/style.css";
import Link from "next/link";

const page = () => {
  return (
    <div>
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-4 sm:px-10 md:px-16 lg:px-28 py-8 mx-auto">
                <article className="text-pretty">
                    <h3 className="text-xl sm:text-2xl text-center mb-6 sm:mb-10 tracking-wide uppercase">REFUND AND CANCELLATION POLICY</h3>
                    
                    <div className="mb-4 sm:mb-6">
                        <p className="text-lg sm:text-xl mb-2 sm:mb-3 tracking-wide">Return:</p>
                        <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed">
                        Product must be returned to us within the same day from the date it has been delivered to the customer. Product must be returned with all tags attached in its original condition along with all packing material, courier receipt, invoice & other papers.
                        </p>
                    </div>

                    <div className="mb-4 sm:mb-6">
                        <p className="text-lg sm:text-xl mb-2 sm:mb-3 tracking-wide">Refund:</p>
                        <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed">
                        Once the Product is received to the company successfully, Shriveg Homemade service Pvt Ltd will instantly initiate the refund to your source account or chosen method of refund within 2 working days. 
                        </p>
                    </div>

                    <div className="mb-4 sm:mb-6">
                        <p className="text-lg sm:text-xl mb-2 sm:mb-3 tracking-wide">Refund and Cancellation for Service Provider Company:</p>
                        <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed">
                        Due to service providers in nature “NO REFUND”,“NO CANCELLATION”  will be entertained once the Payment has been made.
                        </p>
                    </div>

                    <div className="mb-4 sm:mb-6">
                        <p className="text-lg sm:text-xl mb-2 sm:mb-3 tracking-wide">Cancellation Policy:</p>
                        <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed">
                        Please note an order can only be canceled within 24 hours of placing the order. Once the order is processed after 24 hours, no cancellation request will be entertained. However return is possible for all orders/products.
                        </p>
                        <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed">
                        <strong>OR</strong> <br />
                        Customers can CANCEL order only before the Order has been shipped/Dispatched. After the Product/s have been shipped, The Customer CANNOT Cancel the Orders. However return is possible for all orders/products.
                        </p>
                    </div>
                </article>
            </div>
        </section>
    </div>
  );
};

export default page;
