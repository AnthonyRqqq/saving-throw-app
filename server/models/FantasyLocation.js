const { Schema, model } = require("mongoose");

const fantasyLocationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 120,
  },
  realLocation: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
});

const FantasyLocation = model("FantasyLocation", fantasyLocationSchema);

module.exports = FantasyLocation;
