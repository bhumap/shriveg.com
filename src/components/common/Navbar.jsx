"use client";

import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import axios from "axios";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter()
  const { user,notifications,marksAsRead } = useContext(AuthContext);
  const {cartItems,setShowSideCart} = useContext(CartContext)
  var pathname = usePathname();

  var [open, setOpen] = useState(false);
  var [layer, setLayer] = useState(false);

  var [showProfile, setShowProfile] = useState(false);
  var [showNotificationsBox,setShowNotificationsBox] = useState(false)

  useEffect(() => {
    if (layer) {
      const timeoutId = setTimeout(() => {
        setOpen(true);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [layer]);

  useEffect(() => {
    if (!open) {
      const timeoutId2 = setTimeout(() => {
        setLayer(false);
      }, 500);

      // Cleanup the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId2);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
    setShowProfile(false);
  }, [pathname]);


  const handleLogout = async () => {
    try {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (!confirmLogout) return;
      const res = await axios.post("/api/auth/logout");
      if (res.data.success) {
        window.location.replace("/");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const [address, setAddress] = useState("");
  const locateMe = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDa9wzMFWk03neKgcOmteJBKu6yjv-uE-w`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setAddress(data.results[0].formatted_address);

          const inputs = document.querySelectorAll("#location");
          for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = data.results[0].formatted_address;
          }
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <header
      className={`transition-all sticky bg-white shadow-md w-full top-0 px-3 sm:px-6 z-[999] py-2`}
    >
      <div
        onClick={() => setOpen(false)}
        className={`${
          layer ? "translate-x-0" : "translate-x-[-100%]"
        } duration-500 z-20 transition-all absolute top-0 left-0 w-[100%] bg-black/50 backdrop-blur-sm h-[100vh] md:hidden`}
      ></div>

      <nav className="flex justify-between items-center mx-auto">
        <div className="flex items-center gap-3">
          <div className="text-2xl relative md:hidden">
            <i
              onClick={() => {
                setLayer(true);
              }}
              className={`bx bx-menu text-black`}
            ></i>
          </div>

          <Link href="/" className="text-2xl inline-block font-bold">
            <Image width={600} height={400} className="w-10 h-auto" src="/images/logo.svg" alt="" />
          </Link>
          <div className="hidden relative md:block">
            <LoadScript
              libraries={["places"]}
              googleMapsApiKey="AIzaSyDa9wzMFWk03neKgcOmteJBKu6yjv-uE-w"
            >
              <Autocomplete>
                <div className="relative">
                  <input
                    id="location"
                    className="block pr-32 p-3 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                    type="text"
                    placeholder="Enter Your Location"
                  />
                  <div
                    onClick={locateMe}
                    className="absolute select-none cursor-pointer hover:bg-gray-200 bg-gray-100 hover:border-gray-300 border border-transparent py-1 px-2 rounded-md top-1/2 flex items-center gap-1 -translate-y-1/2 right-2"
                  >
                    <i className="bx bx-current-location"></i>
                    <p className="text-sm">Locate me</p>
                  </div>
                </div>
              </Autocomplete>
            </LoadScript>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div
            className={`${
              open ? "translate-x-0" : "translate-x-[-100%]"
            } md:text-black md:p-0 p-4 duration-500 transition-all absolute top-0 left-0 z-20 md:translate-x-0 bg-gray-100 md:bg-transparent text-black shadow-md h-screen min-w-[50%] md:h-auto md:min-w-[auto] md:shadow-none  md:relative`}
          >
            <Link
              href="/"
              className="text-2xl md:hidden inline-block font-bold"
            >
              <Image width={600} height={400} className="w-10 h-auto" src="/images/logo.svg" alt="" />
            </Link>
            <Link className="block md:inline-block p-2" href="/">
              Home
            </Link>
            
            <Link className="block md:inline-block p-2" href="/search">
             Search
            </Link>
           
            
            <Link className="block md:inline-block p-2" href="/ContactUs">
              Contact
            </Link>
          </div>

          <div onClick={()=>setShowSideCart(true)} className="relative cursor-pointer">
            <i className={`text-2xl text-black bx bx-cart`}></i>
            <div className="absolute bg-primary top-0 right-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex justify-center items-center text-xs text-white">
              {cartItems.length}
            </div>
          </div>
          
          <div className="relative cursor-pointer">

            <i onClick={()=>setShowNotificationsBox(!showNotificationsBox)} className={`text-2xl text-black bx bx-bell`}></i>

            {
              notifications?.data?.length ?
              <div className="absolute bg-primary top-0 right-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex justify-center items-center text-xs text-white">
              {notifications?.data?.length}
            </div>
            :
            null
            }
            

            {/* Notifications box */}
            <div className={`${showNotificationsBox ? "visible" : "invisible"} cursor-default min-w-64 rounded-md z-[9999] absolute top-[110%] -right-2 bg-gray-300 shadow-xl shadow-black/30`}>
                <div
                  onClick={() => {
                    setShowNotificationsBox(false);
                  }}
                  className="w-full fixed inset-0 h-full"
                ></div>
              <div className="w-2 h-2 z-10 bg-gray-200 absolute right-4 rotate-45 -top-1"></div>
              <div className="overflow-hidden rounded-md">
                <div className="max-h-60 overflow-auto">

                  {
                    notifications?.data?.length ?
                    notifications?.data?.map((v,i)=>{
                      return(
                        <div onClick={()=>{marksAsRead(v._id);router.push("/portal/orders")}} key={i} className="py-2 px-4 block relative border-white border-b group bg-gray-200">
                          <div className="text-xs font-semibold">{v.title}</div>
                          <div className="text-xs line-clamp-2">{v.body}</div>
                          <i onClick={()=>marksAsRead(v._id)} className="bx text-2xl cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 opacity-0 group-hover:opacity-100 bg-gray-400/50 backdrop-blur-2xl rounded-full bx-x"></i>
                        </div>
                      )
                    })
                    :
                    <div className="py-2 px-4 relative border-white border-b group bg-gray-200">
                          <div className="text-xs font-semibold">There is nothing to show.</div>
                          <div className="text-xs line-clamp-2">You did not have any unread notification till now!</div>
                    </div>
                  }
                
                </div>
              </div>
            </div>
            


          </div>
          

          <div className="relative">
            {!user ? (
              <div className="flex gap-2">
                <Link
                  className="px-2 py-1 font-semibold text-primary border rounded-md border-primary"
                  href="/login"
                >
                  Login
                </Link>
                <Link
                  className="px-2 py-1 font-semibold text-white border rounded-md bg-primary border-primary"
                  href="/register"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div
                onClick={() => setShowProfile(true)}
                className="w-8 cursor-pointer h-8 border rounded-full overflow-hidden"
              >
                <Image width={600} height={400} src={user?.photo || "/images/user.png"} alt="" />
              </div>
            )}

            {showProfile && (
              <div>
                <div
                  onClick={() => setShowProfile(false)}
                  className={`bg-transparent duration-500 z-10 transition-all top-0 left-0 w-[100%] h-[100vh] fixed`}
                ></div>

                <div className="absolute top-[110%] right-0 min-w-52 z-[9999999] py-4 shadow-[0px_0px_5px_2px_#0002] bg-white rounded-md">
                  <div className="flex flex-col justify-center items-center">
                    <div className="w-12 h-12 border mb-2 rounded-full overflow-hidden">
                      <Image width={600} height={400} src={user?.photo || "/images/user.png"} alt="" />
                    </div>
                    <div className="font-semibold text-lg">
                      {user?.fullName}
                    </div>
                    <div className="text-sm">{user?.userType}</div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={"/portal/orders?showMenu=1"}
                      className="flex items-center hover:bg-gray-100 px-4 py-2"
                    >
                      <i className="bx bx-home text-xl mr-2"></i>
                      <div className="text-sm">Dashboard</div>
                    </Link>
                    <Link
                      href={"/portal/profile/edit"}
                      className="flex items-center hover:bg-gray-100 px-4 py-2"
                    >
                      <i className="bx bx-cog text-xl mr-2"></i>
                      <div className="text-sm">Settings</div>
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="flex cursor-pointer items-center hover:bg-gray-100 px-4 py-2"
                    >
                      <i className="bx bx-log-out text-xl mr-2"></i>
                      <div className="text-sm">Logout</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {!pathname.startsWith("/portal") && <div className="block relative md:hidden mt-4">
        <LoadScript
          libraries={["places"]}
          googleMapsApiKey="AIzaSyDa9wzMFWk03neKgcOmteJBKu6yjv-uE-w"
        >
          <Autocomplete>
            <div className="relative">
              <input
                id="location"
                className="block placeholder:opacity-0 focus:placeholder:opacity-100 pr-32 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
                type="text"
                placeholder="Enter Your Location"
              />
              <label
                className="absolute rounded-md bg-white text-sm text-gray-500  duration-300 transform -translate-y-4 scale-[0.85] top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-priborder-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.85] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                htmlFor="location"
              >
                Your Location
              </label>
              <div
                onClick={locateMe}
                className="absolute select-none cursor-pointer hover:bg-gray-200 bg-gray-100 hover:border-gray-300 border border-transparent py-1 px-2 rounded-md top-1/2 flex items-center gap-1 -translate-y-1/2 right-2"
              >
                <i className="bx bx-current-location"></i>
                <p className="text-sm">Locate me</p>
              </div>
            </div>
          </Autocomplete>
        </LoadScript>
      </div>}
    </header>
  );
};

export default Navbar;
