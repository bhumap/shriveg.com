import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const DishesStatus = () => {
  var [dishes, setDishes] = useState({});

  var [loading, setLoading] = useState(false);

  var fetchMyDishes = async () => {
    try {
      setLoading(true);
      var res = await fetch(`/api/dishes/mine`);
      res = await res.json();
      setDishes(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const sumbitHandler = async (e, v) => {
    try {
      const res = await axios.put(`/api/dishes/${v?._id}`, {
        isActive: e.target.checked,
      });
      toast.success("Status Updated Successfully!");
      fetchMyDishes();
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    fetchMyDishes();
  }, []);

  return (
    <>
      <div className=" my-5">
        <h2 className="py-3 font-semibold text-xl">Dishes Status</h2>

        <div className="min-w-[700px] w-full">
          <div className="grid grid-cols-2 bg-gray-400/20 gap-2 ">
            <p className="  text-md font-semibold p-2 ">Title</p>
            <p className="  text-md font-semibold p-2">Status</p>
          </div>

          <div className="grid grid-cols-2  gap-2 ">
            {dishes?.data?.map((v, i) => {
              return (
                <>
                  <p className="  text-md line-clamp-1">{v.title}</p>
                  <div>
                    {" "}
                    <div className="flex">
                      <label className="inline-flex items-center mb-2 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={(e) => sumbitHandler(e, v)}
                          checked={v?.isActive}
                          className="sr-only peer"
                        />
                        <div
                          className={`relative w-11 h-6 bg-red-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500`}
                        ></div>
                      </label>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default DishesStatus;
