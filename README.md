      const { coordinates } = sender.location;

      const latitude = coordinates[1]; // Accesses latitude (index 1)
      const longitude = coordinates[0]; // Accesses longitude (index 0)

      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);