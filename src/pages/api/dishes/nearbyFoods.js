import { getDistance } from 'geolib';
import dbConnect from '@/config/dbConnect';
import Dish from '@/models/dishes';

export default async function handler(req, res) {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
  }

  const userLocation = { latitude, longitude };

  try {
    await dbConnect();

    const dishes = await Dish.find({});

    const nearbyFoods = dishes.filter(dish => {
      if (dish.latitude && dish.longitude) {
        const dishLocation = { latitude: dish.latitude, longitude: dish.longitude };
        const distance = getDistance(userLocation, dishLocation) / 1000;
        return distance <= 10; // Distance in kilometers
      }
      return false;
    });

    res.status(200).json(nearbyFoods);
  } catch (error) {
    console.error('Error fetching nearby foods:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
