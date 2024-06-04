import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
const HolidayStatus = () => {
  const { user, refetch } = useContext(AuthContext);
  const [fromDateTime, setFromDateTime] = useState("");
  const [toDateTime, setToDateTime] = useState("");
  const resetDate = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const res = await axios.put(`/api/auth/edit`, {
        vacationfromDate: "",
        vacationtoDate: "",
      });
      if (e) {
        toast.success("Status Updated Successfully!");
      }
      refetch();
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };
  const sumbitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/auth/edit`, {
        vacationStatus: e.target.checked,
      });

      toast.success("Status Updated Successfully!");
      resetDate();
      refetch();
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  const sumbitHandlerDate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/auth/edit`, {
        vacationfromDate: fromDateTime,
        vacationtoDate: toDateTime,
      });

      toast.success("Status Updated Successfully!");
      refetch();
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div>
        {user?.userType == "Chef" ? (
          <div className="flex">
            <label className="inline-flex items-center mb-2 cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => {
                  sumbitHandler(e);
                }}
                checked={user?.vacationStatus}
                className=" sr-only peer"
              />
              <div
                className={`relative w-11 h-6 bg-red-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500`}
              ></div>
              <span className="ms-3  font-semibold text-xl text-gray-900">
                Vacation Status
              </span>
            </label>
          </div>
        ) : null}

        {user?.vacationStatus ? (
          <div className="grid grid-cols-2 gap-2">
            <Datetime
              onChange={(e) => setFromDateTime(e._d)}
              initialViewMode="days"
              value={fromDateTime || new Date(user?.vacationfromDate)}
              inputProps={{
                placeholder: "Select From Date and Time",
                className: "w-full",
                input: { placeholder: "Select Time", className: "w-full" },
              }}
              className=""
            />
            <Datetime
              onChange={(e) => setToDateTime(e._d)}
              initialViewMode="days"
              value={toDateTime || new Date(user?.vacationtoDate)}
              inputProps={{
                placeholder: "Select To Date and Time",
                className: "w-full",
                input: { placeholder: "Select Time", className: "w-full" },
              }}
            />
            <div className=" flex gap-2">
              <button
                className="bg-primary border-primary border hover:bg-primary px-4 py-1 rounded-md text-white"
                onClick={sumbitHandlerDate}
              >
                <span>Save</span>
              </button>
              <button
                className=" border-primary text-primary border hover:text-white hover:bg-primary px-4 py-1 rounded-md "
                onClick={resetDate}
              >
                <span>Clear</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default HolidayStatus;
