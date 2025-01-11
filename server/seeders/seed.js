const db = require("../config/connection");
const {
  User,
  Location,
  FantasyLocation,
  Spell,
  StatBlock,
} = require("../models");
const cleanDB = require("./cleanDB");
const locationSeeds = require("./locationSeeds.json");
const userSeeds = require("./userSeeds.json");
const fantasyLocationSeeds = require("./fantasyLocationSeeds.json");
const spellSeeds = require("./spellSeeds.json");
const statBlockSeeds = require("./statBlockSeeds.json");

db.once("open", async () => {
  try {
    // Clear previous seed data
    // await cleanDB('User', 'users');
    // await cleanDB('Location', 'locations');
    // await cleanDB('FantasyLocation', 'fantasylocations');
    // await cleanDB("Spell", "spells");
    // await cleanDB("StatBlock", "statBlocks");

    // Created seeds
    // await User.create(userSeeds);
    // await Location.create(locationSeeds);
    // await FantasyLocation.create(fantasyLocationSeeds);
    await Spell.create(spellSeeds);
    // await StatBlock.create(statBlockSeeds);

    process.exit(0);
  } catch (err) {
    throw err;
  }
});
