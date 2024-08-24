import React from "react";
import "@/Style/style.css";
import Link from "next/link";

const Page = () => {
  return (
    <div>
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-4 sm:px-10 md:px-16 lg:px-28 py-8 mx-auto">
                <article className="text-pretty">
                    <h3 className="text-xl sm:text-2xl text-center mb-6 sm:mb-10 tracking-wide uppercase">Privacy Policy</h3>
                    
                    <div className="mb-4 sm:mb-6">
                        <p className="text-lg sm:text-xl mb-2 sm:mb-3 tracking-wide">Shipping Policy:</p>
                        <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed">
                        SHRIVEG is dedicated to ensuring the timely and pristine delivery of your orders. Embracing a commitment to express shipping, the majority of orders are dispatched within 24 hours of placement, excluding weekends and public holidays. For deliveries exceeding Rs. 500/- within India, no shipping charges apply.
                        </p>
                    </div>

                    <div className="mb-4 sm:mb-6">
                        <p className="text-lg sm:text-xl mb-2 sm:mb-3 tracking-wide">Important Information:</p>
                        <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed">
                        Order cut-off times are indicative and may not account for potential delays arising from payment authorization. While we strive to dispatch orders promptly, a delay of up to 72 hours may occur due to unforeseen circumstances with the designer/manufacturer. Estimated delivery times serve as a reference and commence from the dispatch date. Any delays attributed to customs clearance processes at the destination are beyond our control, and redirection of orders post-dispatch is not feasible.
                        </p>
                    </div>

                    <div className="mb-4 sm:mb-6">
                        <p className="text-lg sm:text-xl mb-2 sm:mb-3 tracking-wide">When Do We Deliver:</p>
                        <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed">
                        SHRIVEG is dedicated to ensuring the timely and pristine delivery of your orders. Embracing a commitment to express shipping, the majority of orders are dispatched within 24 hours of placement, excluding weekends and public holidays. For deliveries exceeding Rs. 500/- within India, no shipping charges apply.
                        </p>
                    </div>

                    <div className="mb-4 sm:mb-6">
                        <p className="text-lg sm:text-xl mb-2 sm:mb-3 tracking-wide">Shipping In India:</p>
                        <p className="text-sm sm:text-base font-light tracking-wide leading-relaxed">
                        SHRIVEG is dedicated to ensuring the timely and pristine delivery of your orders. Embracing a commitment to express shipping, the majority of orders are dispatched within 24 hours of placement, excluding weekends and public holidays. For deliveries exceeding Rs. 500/- within India, no shipping charges apply.
                        </p>
                    </div>
                </article>
            </div>
        </section>
    </div>
  );
};

export default Page;
