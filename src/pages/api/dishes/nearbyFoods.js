// pages/api/nearbyFoods.js
import { getDistance } from 'geolib';
import dbConnect from "@/config/dbConnect";
import Dish from '@/models/dishes';

export default async function handler(req, res) {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const userLocation = { latitude: parseFloat(lat), longitude: parseFloat(lon) };

  try {
    await dbConnect();

    const dishes = await Dish.find({});
    
    const nearbyFoods = dishes.filter(dish => {
      const dishLocation = { latitude: dish.latitude, longitude: dish.longitude };
      const distance = getDistance(userLocation, dishLocation) / 1000;
      return distance <= 10;
    });

    res.status(200).json(nearbyFoods);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
