import dbConnect from "@/config/dbConnect";
import DishesModel from "@/models/dishes";

export default async function handler(req, res) {
  await dbConnect();
  var foundItem;


  try {
    foundItem = await DishesModel.findById(req.query.id).populate(
      "chef",
      "fullName photo phone username"
    );
    if (!foundItem) {
      res.status(404).json({
        success: false,
        message: "Not Found!",
      });
      return;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid Id sent!",
    });
    return;
  }

  try {
    switch (req.method) {
      case "GET":
        res.status(200).json({
          success: true,
          message: foundItem,
        });
        break;
      case "PUT":
        console.log(1)
        var response = await DishesModel.findByIdAndUpdate(
            req.query.id,
            { $set: req.body },
            { new: true }
          );
        res.status(200).json({
          success: true,
          message: "Updated Successfully!",
          data: response,
        });
        break;
      case "DELETE":
        await DishesModel.findByIdAndDelete(req.query.id);
        res.status(200).json({
          success: true,
          message: "Deleted Successfully!",
        });
        break;
      default:
        res.status(500).json({
          success: false,
          message: "Method Not Allowed!",
        });
    }
  } catch (err) {
    // For duplicate Error
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `${Object.keys(err.keyPattern)[0]} is already in used!`,
      });
    }

    // required fields error handling
    if (err.errors) {
      var requiredFildName = Object.keys(err.errors)[0];
      if (requiredFildName) {
        return res.status(400).json({
          success: false,
          message: `${requiredFildName} is required!`,
        });
      }
    }


    res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
    });
  }
}
