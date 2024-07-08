"use client";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import "./globals.css";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { PrimeReactProvider } from "primereact/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import Context from "@/context/AuthContext";
import CartProvider from "@/context/CartContext";
const queryClient = new QueryClient();
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";
import FCM from "@/components/FCM";
import UpdateLocation from "@/components/common/UpdateLocation";

export default function RootLayout({ children }) {
  var pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <PrimeReactProvider>
            <Context>
              <CartProvider>
                {/* Toasting */}
                <ToastContainer position="bottom-right" />
                <Toaster position="top-center" />

                {/* Firebase Cloud Messaging */}
                <FCM />

                <Navbar />
                {/* <UpdateLocation /> */}
                <main className="min-h-screen bg-gray-50">{children}</main>
                <Footer />
              </CartProvider>
            </Context>
          </PrimeReactProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
