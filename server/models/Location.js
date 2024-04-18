const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
});

const Location = model("Location", locationSchema);

module.exports = Location;
