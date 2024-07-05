import dbConnect from "@/config/dbConnect";
import OrdersModel from "@/models/orders";
import { JWTVerify } from "@/helpers/jwt";
const { ObjectId } = require("mongoose").Types;
import UsersModel from "@/models/users";
import AddressesModel from "@/models/addresses";
import DishesModel from "@/models/dishes";
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

  switch (req.method) {
    case "GET":
      try {
        var user = await UsersModel.findById(userID);

        var orders;

        if (user.userType == "Chef") {
          orders = await OrdersModel.aggregate([
            {
              $unwind: "$subOrders",
            },
            {
              $match: {
                "subOrders.chef": new ObjectId(userID),
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind: "$user",
            },
            {
              $lookup: {
                from: "addresses",
                localField: "address",
                foreignField: "_id",
                as: "address",
              },
            },
            {
              $unwind: "$address",
            },
            {
              $unwind: "$subOrders.dishes",
            },
            {
              $lookup: {
                from: "dishes",
                localField: "subOrders.dishes.dish",
                foreignField: "_id",
                as: "subOrders.dishes.dish",
              },
            },
            {
              $unwind: "$subOrders.dishes.dish",
            },
            {
              $group: {
                _id: "$_id",
                user: { $first: "$user" },
                address: { $first: "$address" },
                dishes: {
                  $push: {
                    dish: "$subOrders.dishes.dish",
                    quantity: "$subOrders.dishes.quantity",
                    price: "$subOrders.dishes.price",
                  },
                },
                totalDishes: { $sum: "$subOrders.dishes.quantity" },
                status: { $first: "$subOrders.status" },
                subOrderId: { $first: "$subOrders._id" },
                orderId: { $first: "$orderId" },
                createdAt: { $first: "$createdAt" },
                shipping: { $first: "$subOrders.shipping" },
                total: { $first: "$subOrders.total" },
                subTotal: { $first: "$subOrders.subTotal" },
                gst: { $first: "$subOrders.gst" },
              },
            },
            {
              $project: {
                user: {
                  _id: "$user._id",
                  fullName: "$user.fullName",
                  phone: "$user.phone",
                  photo: "$user.photo",
                },
                address: "$address",
                dishes: 1,
                totalDishes: 1,
                subOrderId: 1,
                status: 1,
                createdAt: 1,
                orderId: 1,
                shipping: 1,
                subTotal: 1,
                gst: 1,
                total: 1,
              },
            },
            {
              $sort:{
                createdAt:-1
              }
            }
          ]);
        } else {
          orders = await OrdersModel.find({ user: new ObjectId(userID) })
            .populate({ path: "subOrders.chef", model: UsersModel })
            .populate({ path: "subOrders.dishes.dish", model: DishesModel })
            .populate({ path: "address", model: AddressesModel }).sort({createdAt:-1})

          orders = orders.map((order) => {
            var orderSubTotal = 0;
            var shipping = 0;
            var gst = 0;

            var totalDishes = 0;

            order.subOrders = order.subOrders.map((subOrder) => {
              var subTotal = 0;
              var subDishes = 0;

              subOrder.dishes.map((dish) => {
                subTotal = subTotal + dish.quantity * dish.price;
                subDishes = subDishes + dish.quantity;
              });
              
              subOrder._doc.subTotal = subTotal;
              subOrder._doc.subDishes = subDishes;

              if((subOrder.status != "Cancelled") && (subOrder.status != "Rejected")){
                orderSubTotal = orderSubTotal + subOrder.subTotal
                shipping = shipping + subOrder.shipping
                gst = gst + subOrder.gst
                totalDishes = totalDishes + subDishes;
              }

              return subOrder;
            });

            order._doc.shipping = shipping;
            order._doc.subTotal = orderSubTotal;
            order._doc.gst = gst;
            order._doc.total = shipping + orderSubTotal + gst;
            order._doc.totalDishes = totalDishes;
            
            return order;
          });
        }

        res.status(200).json({
          success: true,
          message: {
            data: orders,
          },
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      break;
    case "POST":
      try {
        var subOrders = [];

        req.body.dishes.map((v, i) => {
          if (subOrders.find((o) => o.chef == v.chef)) {
            for (var n = 0; n < subOrders.length; n++) {
              if (subOrders[n].chef == v.chef) {
                subOrders[n].dishes.push({
                  dish: v.dish,
                  price: v.price,
                  quantity: v.quantity,
                });
              }
            }
          } else {
            subOrders.push({
              chef: v.chef,
              dishes: [{ dish: v.dish, price: v.price, quantity: v.quantity }],
            });
          }
        });

        // calcation
        subOrders = subOrders.map((order,i)=>{
          var subTotal = 0
          order.dishes.map((dish)=>{
            subTotal = subTotal + (dish.price * dish.quantity)
          })
          order.gst = Math.ceil(process.env.NEXT_PUBLIC_GST_PERCENTAGE * subTotal) 
          order.shipping = parseInt(process.env.NEXT_PUBLIC_SHIPPING_COST)
          order.subTotal = subTotal
          order.total = subTotal + order.shipping + order.gst
          return order
        })


        // Function to generate a random string of given length with letters from the alphabet
        function generateRandomLetters(length) {
          const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          let result = "";
          for (let i = 0; i < length; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * characters.length)
            );
          }
          return result;
        }

        // Function to generate a specific ID with three letters followed by three digits
        function generateSpecificId() {
          const letters = generateRandomLetters(3);
          const digits = Math.floor(100 + Math.random() * 900); // Generates random 3-digit number
          return `${letters}${digits}`;
        }
        
        const specificId = generateSpecificId();

        var item = await OrdersModel.create({
          ...req.body,
          subOrders,
          user: userID,
          orderId: specificId,
        });

        if(item){
          // send push notifications to the chefs
          var chefIDs = subOrders.map(v=>v.chef)

          // send local notification in application
         var notificationsData = chefIDs.map(v=>{return {user:v,title:"New Order Received",body:"You have a new order to prepare."}})
         var allNotificaitons = await Notification.insertMany(notificationsData)

          const chefs = await UsersModel.find({ _id: { $in: chefIDs } });

          // Extract device tokens from each chef document
          const allDeviceTokens = chefs.reduce((tokens, chef) => {
            if (chef.deviceTokens && chef.deviceTokens.length > 0) {
              tokens.push(...chef.deviceTokens);
            }
            return tokens;
          }, []);

          var notRes = await sendNotification(allDeviceTokens,"New Order Received","You have a new order to prepare.")
        }

        res.status(201).json({
          success: true,
          message: "Order Placed Successfully!",
          data: subOrders,
        });

      } catch (err) {
        console.log(err);
        // For duplicate Error
        if (err.code === 11000) {
          return res.status(409).json({
            success: false,
            message: `${Object.keys(err.keyPattern)[0]} is already in used!`,
          });
        }

        // required fields error handling
        var requiredFildName = Object.keys(err.errors)[0];
        if (requiredFildName) {
          return res.status(400).json({
            success: false,
            message: `${requiredFildName} is required!`,
          });
        }

        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      break;
  }
}
