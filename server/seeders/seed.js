const db = require('../config/connection');
const { User, Location } = require('../models');
const cleanDB = require('./cleanDB');
const locationSeeds = require('./locationSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    // Clear previous seed data
    await cleanDB('User', 'users');
    await cleanDB('Location', 'locations');
    
    // Created seeds
    const seededUsers = await User.create(userSeeds);
    const seededLocations = await Location.create(locationSeeds)

    console.log('all done!');
    console.log(seededUsers);
    console.log(seededLocations);
    process.exit(0);
  } catch (err) {
    throw err;
  };
});
