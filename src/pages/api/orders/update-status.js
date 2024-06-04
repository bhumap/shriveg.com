import dbConnect from "@/config/dbConnect";
import OrdersModel from "@/models/orders";
import { JWTVerify } from "@/helpers/jwt";
const { ObjectId } = require("mongoose").Types;
import UsersModel from "@/models/users";
import sendNotification from "@/helpers/sendNotification";
import Notification from "@/models/notifications";

export default async function handler(req, res) {
  await dbConnect();

  var token = req.cookies.AccessToken || "";
  var userID = await JWTVerify(token);

  if (!userID) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized Action!",
    });
  }

  try {
    const orderId = req.body.orderId;
    const subOrderId = req.body.subOrderId;
    const newStatus = req.body.newStatus;

    const order = await OrdersModel.findById(orderId);

    const subOrder = order.subOrders.find((v) => v._id == subOrderId);

    var data = await OrdersModel.findOneAndUpdate(
      {
        _id: new ObjectId(orderId),
        "subOrders._id": new ObjectId(subOrderId),
      },
      {
        $set: {
          "subOrders.$.status": newStatus,
        },
      },
      { new: true }
    );

    // improve this logic in future by implementing trasections concept of mongodb

    if (data) {
      if (
        order.paymentMode == "online" &&
        (newStatus == "Rejected" || newStatus == "Cancelled")
      ) {
        // refunding the payment in customer wollet
        await UsersModel.findByIdAndUpdate(order.user, {
          $inc: { "wollet.balance": subOrder.total },
        });
      }

      // send notification to customer and chef
      var chef = await UsersModel.findById(subOrder.chef);
      var customer = await UsersModel.findById(order.user);

      switch (newStatus) {
        case "Rejected":
          // sending notification to customer that order has been Rejected
          await Notification.create({
            user: customer,
            title: "Order Has been Rejected",
            body: "Unfortunately! Chef has rejected your order.",
          });
          if (customer.deviceTokens.length) {
            await sendNotification(
              customer.deviceTokens,
              "Order Has been Rejected",
              "Unfortunately! Chef has rejected your order."
            );
          }
          break;
        case "Preparing":
          // sending notification to customer that order chef stated preparing
          await Notification.create({
            user: customer,
            title: "Order Has been Accepted",
            body: "Great! Chef has started preparing your order.",
          });
          if (customer.deviceTokens.length) {
            await sendNotification(
              customer.deviceTokens,
              "Order Has been Accepted",
              "Great! Chef has started preparing your order."
            );
          }
          break;
        case "Shipped":
          // sending notification to customer that order shipped
          await Notification.create({
            user: customer,
            title: "Order Has been Shipped",
            body: "Great! Your order is on the way.",
          });
          if (customer.deviceTokens.length) {
            await sendNotification(
              customer.deviceTokens,
              "Order Has been Shipped",
              "Great! Your order is on the way."
            );
          }
          break;
        case "Delivered":
          // sending notification to customer that order Delivered
          await Notification.create({
            user: customer,
            title: "Order Has been Delivered",
            body: "Great! Your order delivered Successfully.",
          });
          if (customer.deviceTokens.length) {
            await sendNotification(
              customer.deviceTokens,
              "Order Has been Delivered",
              "Great! Your order delivered Successfully."
            );
          }
          break;
        case "Cancelled":
          // sending notification to chef that order chef has been cancelled by Customer
          await Notification.create({
            user: chef,
            title: "Order Has been Cancelled",
            body: "Unfortunately! Customer has cancelled your order.",
          });
          if (chef.deviceTokens.length) {
            await sendNotification(
              chef.deviceTokens,
              "Order Has been Cancelled",
              "Unfortunately! Customer has cancelled your order."
            );
          }
          break;
      }
    }

    res.json({
      success: true,
      message: "Status Updated Successfully!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error.message,
    });
  }
}
