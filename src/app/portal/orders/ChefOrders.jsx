"use client";
import React, { useEffect, useState } from "react";
import Ripple from "material-ripple-effects";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";

const ChefOrders = () => {

  

  var ripple = new Ripple();

  var [orders, setOrders] = useState({});

  const [order, setOrder] = useState({});
  var [loading, setLoading] = useState(false);

  var fetchMyDishes = async () => {
    try {
      setLoading(true);
      var res = await fetch(`/api/orders`);
      res = await res.json();
      setOrders(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyDishes();
  }, []);

  const handlePushClick = ( orderData) => {
 
    setOrder(orderData);

    console.log(order.address._id);
    console.log(order.user._id);
  };

  // --------------------
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  useEffect(() => {
    if (showOrderDetail) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "auto";
    }
  }, [showOrderDetail]);

  // Order Detail in popup
  const [orderDetail, setOrderDetail] = useState({});

  // update order status
  async function updateOrderStatus(orderId, subOrderId, newStatus) {
    try {
      var { data } = await axios.put(`/api/orders/update-status`, {
        orderId,
        subOrderId,
        newStatus,
      });
      if (data.success) {
        setOrderDetail({ ...orderDetail, status: newStatus });

        setOrders({
          ...orders,
          data: orders?.data?.map((v, i) => {
            if (v._id == orderDetail._id) {
              v.status = newStatus;
            }
            return v;
          }),
        });
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  var gst = 0;
  var shipping = 0;
  var subTotal = 0;
  orderDetail?.subOrders?.map((v) => {
    gst += v.gst;
    shipping += v.shipping;
    subTotal += v.subTotal;
    if (v.status == "Cancelled" || v.status == "Rejected") {
      gst -= v.gst;
      shipping -= v.shipping;
      subTotal -= v.subTotal;
    }
  });
  return (
    <div className="bg-white p-2 sm:p-4 flex flex-col gap-2">
      <h2 className="text-xl font-bold mb-2">My Orders</h2>

      <div className="relative overflow-x-auto  sm:rounded-lg">
        <table className="w-full relative min-w-[800px] text-sm text-left">
          <thead className="text-xs sticky z-[99] top-0 text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 text-center py-3">
                Dishes
              </th>
              <th scope="col" className="px-6 text-center py-3">
                Total
              </th>
              <th scope="col" className="px-6 text-center py-3">
                Status
              </th>
              <th scope="col" className="px-4 w-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.map((v, i) => {
              return (
                <tr
                  key={i}
                  className="bg-white whitespace-nowrap hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{v?.orderId}</td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <Image
                      width={600}
                      height={400}
                      className="w-6 sm:w-10 aspect-square rounded-full"
                      src={v?.user?.photo || "/images/user.png"}
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-xs font-semibold">
                        {v?.user?.fullName}
                      </div>
                      {/* <div className="font-normal text-gray-500">
                        <i className="bx bx-phone"></i>
                        {v?.user?.phone}
                      </div> */}
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    {new Date(v?.createdAt).toDateString()}
                  </td>
                  <td className="px-6 text-center py-4">{v?.totalDishes}</td>

                  <td className="px-6 text-center font-semibold py-4">
                    ₹ {v?.total}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center">
                      <div className="text-center text-red-600 bg-red-50 text-xs px-2 py-1 rounded-full border border-red-200">
                        {v?.status}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 w-4">
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => {
                          setOrderDetail(v);
                          setShowOrderDetail(true);
                        }}
                        onMouseUp={(e) => ripple.create(e, "light")}
                        className="text-center text-primary shadow-md select-none text-xs bg-primary/10 hover:bg-primary hover:text-white transition-all duration-500 border border-primary/30 px-4 py-1 rounded-full"
                      >
                        Detail
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Order Detail Popup -------------------------------------- */}

      <div
        className={`fixed ${
          showOrderDetail ? "visible opacity-100" : "invisible opacity-0"
        } transition-all duration-300 top-0 flex justify-center items-center overflow-auto p-4 bg-black/90 inset-0 backdrop-blur-sm z-[999]`}
      >
        <div
          onClick={() => setShowOrderDetail(false)}
          className="absolute inset-0"
        ></div>
        <div
          className={`bg-white ${
            showOrderDetail
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          } delay-300 transition-all min-w-[280px] md:min-w-[500px] xl:min-w-[700px] duration-500 relative max-w-2xl rounded-md border mx-auto`}
        >
          <div
            onClick={() => setShowOrderDetail(false)}
            className="absolute w-6 h-6 rounded-full flex justify-center items-center text-xl bg-gray-600 hover:bg-gray-700 text-white cursor-pointer -top-2 -right-2"
          >
            <i className="bx bx-x"></i>
          </div>

          <div className="p-4 border-b">
            <h2 className="font-semibold text-xl mb-1">Order Details</h2>
            <div className="flex justify-between text-xs mb-1 text-gray-500">
              <p>#{orderDetail?.orderId}</p>
              <p>{new Date(orderDetail?.createdAt).toDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 group-open:animate-fadeIn mb-2">
                <i className="bx bx-map"></i>
                {`${orderDetail?.address?.line1 || ""} ${
                  orderDetail?.address?.line2 || ""
                } ${orderDetail?.address?.line3 || ""} ${
                  orderDetail?.address?.cityTown || ""
                } ${orderDetail?.address?.district || ""} ${
                  orderDetail?.address?.state || ""
                } ${orderDetail?.address?.pinCode || ""}`}
              </p>
            </div>
            <div className="flex">
              {[1].map((v, i) => {
                switch (orderDetail?.status) {
                  case "Pending":
                    return (
                      <div
                        key={i}
                        className="text-center text-red-600  px-2 py-1 rounded-full border flex gap-1 items-center"
                      >
                        <i className="bx bx-bell bx-burst"></i>
                        {orderDetail?.status}
                      </div>
                    );
                  case "Preparing":
                    return (
                      <div
                        key={i}
                        className="text-center text-red-600  px-2 py-1 rounded-full border flex gap-1 items-center"
                      >
                        <i className="bx bx-bowl-hot bx-tada"></i>
                        {orderDetail?.status}
                      </div>
                    );
                  case "Shiped":
                    return (
                      <div
                        key={i}
                        className="text-center text-red-600  px-2 py-1 rounded-full border flex gap-1 items-center"
                      >
                        <i className="bx bxs-truck bx-burst"></i>
                        {orderDetail?.status}
                      </div>
                    );
                  case "Delivered":
                    return (
                      <div
                        key={i}
                        className="text-center text-red-600  px-2 py-1 rounded-full border flex gap-1 items-center"
                      >
                        <i className="bx bx-like bx-burst"></i>
                        {orderDetail?.status}
                      </div>
                    );
                }
              })}
            </div>
          </div>

          <div className="sm:my-4 p-2 sm:p-4 max-h-[50vh] overflow-y-auto">
            {orderDetail?.dishes?.map((v, i) => {
              return (
                <div
                  key={i}
                  className="flex py-3 gap-2 sm:gap-4 items-center  justify-between"
                >
                  <div className="flex items-center  gap-2">
                    <div className="w-10 sm:w-20">
                      <Image
                        width={600}
                        height={400}
                        className="aspect-video object-cover"
                        src={
                          v?.dish?.images[0]?.secure_url || "/images/image.png"
                        }
                        alt=""
                      />
                    </div>
                    <div>
                      <h2 className="font-semibold sm:font-medium text-xs sm:text-base line-clamp-2">
                        {v?.dish?.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {v?.quantity} items x {v?.price}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold text-gray-700 flex items-start">
                      {v?.quantity * v?.price}{" "}
                      <span className="text-base ml-1">₹</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <div className="flex px-4 justify-end">
              <div className=" text-xs text-gray-700">
                Subtotal : {orderDetail?.subTotal} ₹
              </div>
            </div>
            <div className="flex px-4 justify-end">
              <div className=" text-xs text-gray-700">
                {process.env.NEXT_PUBLIC_GST_PERCENTAGE * 100}% GST :{" "}
                {orderDetail?.gst} ₹
              </div>
            </div>
            <div className="flex px-4 justify-end">
              <div className=" text-xs text-gray-700">
                Shipping Fee : {orderDetail?.shipping}
              </div>
            </div>
            <div className="flex px-4 mb-4 justify-end">
              <div className="font-semibold text-base sm:text-2xl text-gray-700 flex items-start">
                Total : {orderDetail?.total}
                <span className="text-base ml-1">₹</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 justify-end px-4 py-3 border-t items-center">
              {orderDetail?.status == "Pending" && (
                <p className="text-sm text-center text-gray-500">
                  Will be rejected automatically 2 hours.
                </p>
              )}
              <div className="flex gap-2 text-sm">
                {[1].map((v, i) => {
                  switch (orderDetail?.status) {
                    case "Pending":
                      return (
                        <React.Fragment key={i}>
                          <button
                            onClick={() =>
                              updateOrderStatus(
                                orderDetail?._id,
                                orderDetail?.subOrderId,
                                "Rejected"
                              )
                            }
                            onMouseUp={(e) => ripple.create(e, "light")}
                            className="border py-2 hover:bg-red-100 bg-primary/5 border-primary/50 text-primary px-4 rounded-full "
                          >
                            Reject
                          </button>
                          <button
                            onClick={() =>
                              updateOrderStatus(
                                orderDetail?._id,
                                orderDetail?.subOrderId,
                                "Preparing"
                              )
                            }
                            onMouseUp={(e) => ripple.create(e, "light")}
                            className="border py-2 px-4 bg-primary shadow-md text-white rounded-full "
                          >
                            Accept
                          </button>

                          <button
                            className="border py-2 px-4 bg-primary shadow-md text-white rounded-full"
                            onClick={() => handlePushClick(orderDetail)}
                          >
                            Push
                          </button>
                        </React.Fragment>
                      );
                    case "Preparing":
                      return (
                        <button
                          key={i}
                          onClick={() =>
                            updateOrderStatus(
                              orderDetail?._id,
                              orderDetail?.subOrderId,
                              "Shipped"
                            )
                          }
                          onMouseUp={(e) => ripple.create(e, "light")}
                          className="border py-2 px-4 bg-primary shadow-md text-white rounded-full "
                        >
                          Mark on the way
                        </button>
                      );
                    case "Shipped":
                      return (
                        <button
                          key={i}
                          onClick={() =>
                            updateOrderStatus(
                              orderDetail?._id,
                              orderDetail?.subOrderId,
                              "Delivered"
                            )
                          }
                          onMouseUp={(e) => ripple.create(e, "light")}
                          className="border py-2 px-4 bg-primary shadow-md text-white rounded-full "
                        >
                          Mark Delivered
                        </button>
                      );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefOrders;
