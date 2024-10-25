"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();

  // Function to handle the payment
//   const handlePayment = async () => {
//     const options = {
//       key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay API key
//       amount: 110000, // Amount in paise (₹1100.00)
//       currency: "INR",
//       name: "Wallet Recharge",
//       description: "Recharge your wallet and get ₹5000 in your wallet.",
//       image: "https://example.com/your_logo.jpg", // Optional logo URL
//       handler: function (response) {
//         // Handle successful payment
//         console.log(response);
//         toast.success("Recharge successful! ₹5000 has been added to your wallet.");
//         // Redirect to a success page or update the wallet balance
//         router.push("/wallet"); // Redirect to the wallet page
//       },
//       prefill: {
//         name: "Your Name", // Optional
//         email: "your.email@example.com", // Optional
//         contact: "9999999999", // Optional
//       },
//       notes: {
//         address: "Your Address", // Optional
//       },
//       theme: {
//         color: "#F37254", // Optional theme color
//       },
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };

  return (
    <>
        {/* Header Section */}
        <div className="w-full p-6 bg-gradient-to-r from-primary to-secondary mb-6 rounded-lg">
            <h3 className="text-3xl font-bold text-white text-center">
            Recharge Your Wallet
            </h3>
            <p className="text-lg text-white text-center mt-2">
            Recharge with ₹1100 and get ₹5000 instantly!
            </p>
        </div>

        {/* Recharge Amount Section */}
        <div className="flex flex-col items-center mb-6">
            <div className="flex space-x-4">
                <button className="bg-white text-primary px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition">₹1100</button>
            </div>
        </div>

        {/* Payment Button */}
        <div className="flex justify-center mb-6">
            <button
            className="bg-primary text-white px-8 py-4 rounded-lg shadow-lg hover:bg-opacity-80 transition-transform transform hover:scale-105"
            >
            Proceed to Payment
            </button>
        </div>

        {/* Benefits Section */}
        <div className="mt-6 p-4 bg-white rounded-lg text-center">
            <h4 className="text-xl font-semibold text-gray-800">Why Recharge?</h4>
            <ul className=" list-inside text-gray-600 mt-2">
                <li><span className="text-green-500 mr-2">✔️</span>Get bonus credits on every recharge.</li>
                <li><span className="text-green-500 mr-2">✔️</span>Exclusive offers and discounts await!</li>
                <li><span className="text-green-500 mr-2">✔️</span>Secure and fast payment processing.</li>
            </ul>
        </div>

        {/* Footer Section */}
        <div className=" p-4 text-center text-gray-600">
            <p>Need assistance? <a href="/support" className="text-primary underline">Contact Support</a></p>
        </div>
    </>


  );
};

export default Page;
