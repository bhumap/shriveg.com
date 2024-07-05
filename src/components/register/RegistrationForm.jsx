"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const RegistrationForm = () => {

  var {refetch} = useContext(AuthContext)

  const [loading, setLoading] = useState(false);
  var router = useRouter()
  const [formData, setFormData] = useState({
    userType: "Customer",
    email: {
      value: "",
    },
    phone: {
      value:""
    },
    fullName: "",
    password: "",
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name.startsWith("address")) {
      setFormData({
        ...formData,
        address: { ...formData?.address, [name.split(".")[1]]: value },
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    var id;
    try {
      e.preventDefault();
      setLoading(true);
      id = toast.loading("Please wait...");
      const res = await axios.post("/api/auth/register", formData);

      if (res.data.success) {
        toast.update(id, {
          render: res.data.message,
          type: "success",
          isLoading: false,
        });
        refetch()
        router.push("/")

        setTimeout(() => {
          toast.dismiss(id);
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      toast.update(id, {
        render: error.response?.data?.message,
        type: "error",
        isLoading: false,
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        toast.dismiss(id);
      }, 4000);
    }
  };

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-2xl xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create Your Account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Register As
                  </label>

                  <div className="flex gap-5">
                    <div>
                      <input
                        type="radio"
                        checked={formData.userType == "Customer"}
                        onChange={changeHandler}
                        disabled={loading}
                        className="mr-2  text-primary focus:outline-none focus:ring-0"
                        value="Customer"
                        name="userType"
                        id="customer"
                      />
                      <label htmlFor="customer">Customer</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        checked={formData.userType == "Chef"}
                        onChange={changeHandler}
                        disabled={loading}
                        className="mr-2 text-primary focus:outline-none focus:ring-0"
                        value="Chef"
                        name="userType"
                        id="chef"
                      />
                      <label htmlFor="chef">Chef</label>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Enter Name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required={true}
                    onChange={changeHandler}
                    disabled={loading}
                  />
                </div>
                
             
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    disabled={loading}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: { value: e.target.value },
                      })
                    }
                  />
                </div>
              

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Enter Phone Number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    // required={true}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: { value: e.target.value },
                      })}
                    disabled={loading}
                  />
                </div>

                {formData.userType == "Chef" &&
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter Username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required={true}
                    onChange={changeHandler}
                    disabled={loading}
                  />
                </div>}

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required={true}
                    onChange={changeHandler}
                    disabled={loading}
                  />
                </div>



                {/* Address Section */}
                {formData.userType == "Chef" ?
                  <>
                  <div>
                    <label
                      htmlFor="address.line1"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Address Line 1
                    </label>
  
                    <input
                      type="text"
                      name="address.line1"
                      id="address.line1"
                      placeholder="Address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label
                      htmlFor="address.line1"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Address Line 2
                    </label>
  
                    <input
                      type="text"
                      name="address.line2"
                      id="address.line2"
                      placeholder="Address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
  
                  <div>
                    <label
                      htmlFor="address.line1"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Address Line 3
                    </label>
  
                    <input
                      type="text"
                      name="address.line3"
                      id="address.line3"
                      placeholder="Address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
  
                  <div>
                    <label
                      htmlFor="address.cityTown"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      City / Town
                    </label>
  
                    <input
                      type="text"
                      name="address.cityTown"
                      id="address.cityTown"
                      placeholder="Address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required={true}
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
  
                  <div>
                    <label
                      htmlFor="address.district"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      District
                    </label>
  
                    <input
                      type="text"
                      name="address.district"
                      id="address.district"
                      placeholder="Address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required={true}
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
  
                  <div>
                    <label
                      htmlFor="address.state"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      State
                    </label>
  
                    <input
                      type="text"
                      name="address.state"
                      id="address.state"
                      placeholder="State"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required={true}
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
  
                  <div>
                    <label
                      htmlFor="address.pinCode"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Pin Code
                    </label>
  
                    <input
                      type="text"
                      name="address.pinCode"
                      id="address.pinCode"
                      placeholder="Area Pin Code"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required={true}
                      onChange={changeHandler}
                      disabled={loading}
                    />
                  </div>
                  </>
                : null}
                


                <button
                  type="submit"
                  disabled={loading}
                  className="w-full disabled:cursor-not-allowed disabled:opacity-50 text-white bg-primary bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {loading ? "Processing..." : "Register"}
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationForm;
