const db = require("../config/connection");
const { User, Location, FantasyLocation, Spell } = require("../models");
const cleanDB = require("./cleanDB");
const locationSeeds = require("./locationSeeds.json");
const userSeeds = require("./userSeeds.json");
const fantasyLocationSeeds = require("./fantasyLocationSeeds.json");
const spellSeeds = require("./spellSeeds.json");

db.once("open", async () => {
  try {
    // Clear previous seed data
    // await cleanDB('User', 'users');
    // await cleanDB('Location', 'locations');
    // await cleanDB('FantasyLocation', 'fantasylocations');
    await cleanDB("Spell", "spells");

    // Created seeds
    // const seededUsers = await User.create(userSeeds);
    // const seededLocations = await Location.create(locationSeeds);
    // const seededFantasyLocations = await FantasyLocation.create(fantasyLocationSeeds)
    const seededSpells = await Spell.create(spellSeeds);

    // console.log('all done!');
    // console.log(seededUsers);
    // console.log(seededLocations);
    // console.log(seededFantasyLocations);
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
