
import dbConnect from "@/config/dbConnect";
import UsersModel from "@/models/users";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "PUT") {
    try {
      const { userId, lat, lng } = req.body;

      if (!userId || lat === undefined || lng === undefined) {
        return res.status(400).json({
          success: false,
          message: "Invalid input data.",
        });
      }

      const user = await UsersModel.findByIdAndUpdate(
        userId,
        {
          "location.lat": lat,
          "location.lng": lng
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Location updated successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to update location.",
      });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }
}
