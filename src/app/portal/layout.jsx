"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { usePathname,useSearchParams } from "next/navigation";
import "next-cloudinary/dist/cld-video-player.css";
import { AuthContext } from "@/context/AuthContext";


const Layout = ({ children }) => {
  const { user, refetch } = useContext(AuthContext);
  var pathname = usePathname();
  var searchParams = useSearchParams()
  var [showMenu, setShowMenu] = useState(true);


  var sidebarNavLinks = [
    {
      label: "Orders",
      href: "/portal/orders",
    },
    user?.userType === "Chef" && {
      label: "Dishes",
      href: "/portal/my-dishes",
    },
    {
      label: "My Wallet",
      href: "/portal/my-wallet",
    },
    {
      label: "Contact Info",
      href: "/portal/profile",
    },
    {
      label: "Settings",
      href: "/portal/profile/edit",
    },
    user?.userType === "Chef" && {
      label: "Availability",
      href: "/portal/availability",
    },

    user?.userType === "Chef" && {
      label: "Push",
      href: "/portal/message",
    },

    user?.userType === "Delivery_Boy" && {
      label: "My Oders",
      href: "/messageList",
    },

  ].filter(Boolean);

  useEffect(() => {
    if (showMenu) {
      setShowMenu(false);
    }
  }, [pathname]);

  useEffect(()=>{
    setShowMenu(searchParams.has("showMenu"))
  },[])

  return (
    <div className="bg-[rgb(241,241,241)] relative min-h-screen p-4">
      <div className="max-w-7xl mx-auto">

        
        <div className=" mb-4">
          <div className="font-semibold flex items-center gap-1 text-xl md:text-2xl md:mb-4">
            <div className="md:hidden">
              {showMenu ? (
                <>Dashboard</>
              ) : (
                <div onClick={() => setShowMenu(!showMenu)} className="flex">
                  <div className={`cursor-pointer`}>
                    <i className="bx bx-left-arrow-alt"></i>
                  </div>
                  Back to Menu
                </div>
              )}
            </div>
            <div className="hidden md:block">Dashboard</div>
          </div>
        </div>

        <div className="flex-1 flex ">
          <div
            className={`${
              showMenu ? "block w-full" : "hidden md:block"
            } md:w-[200px] md:pr-4 whitespace-nowrap overflow-hidden transition-all duration-500 md:p-0 bg-[rgb(241,241,241)] inset-0 md:relative md:visible`}
          >
            <ul>
              {sidebarNavLinks.map((v, i) => (
                <li key={i}>
                  <Link
                    onClick={()=>{(pathname == v.href) && setShowMenu(false)}}
                    className={`border-b ${pathname == v.href ? "md:bg-gray-300" : "hover:bg-gray-200/50"} md:border-0 w-full py-3 md:py-2 text-xl md:text-base flex justify-between px-2 rounded-md font-medium`}
                    href={v.href}
                  >
                    {v.label}
                    <i className='bx md:invisible text-2xl md:text-base bx-arrow-back bx-flip-horizontal' ></i>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 overflow-auto bg-white">
            <div className="min-w-[280px]">{children}</div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Layout;
