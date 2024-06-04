import dbConnect from "@/config/dbConnect";
import DishesModel from "@/models/dishes";

export default async function handler(req, res) {
  await dbConnect();

  const { query } = req;
  const { title, chef, status, isSignatured, isActive } = query;

  let searchQuery = {};

  if (title) {
    searchQuery.title = { $regex: title, $options: "i" };
  }

  if (chef) {
    searchQuery.chef = { $regex: chef, $options: "i" }; // Searching chef by name using regex
  }

  if (status) {
    searchQuery.status = status;
  }

  if (isSignatured) {
    searchQuery.isSignatured = isSignatured === 'true';
  }

  if (isActive) {
    searchQuery.isActive = isActive === 'true';
  }

  try {
    const dishes = await DishesModel.find(searchQuery);
    res.status(200).json({ success: true, data: dishes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
