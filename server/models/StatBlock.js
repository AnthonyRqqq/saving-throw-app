const { Schema, model } = require("mongoose");

const statBlockSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  alignment: {
    type: String,
    required: true,
  },
  armorClass: {
    type: String,
    required: true,
  },
  hitPoints: {
    type: String,
    required: true,
  },
  speed: {
    type: String,
    required: true,
  },
  strength: {
    type: Number,
    required: true,
  },
  dexterity: {
    type: Number,
    required: true,
  },
  constitution: {
    type: Number,
    required: true,
  },
  intelligence: {
    type: Number,
    required: true,
  },
  wisdom: {
    type: Number,
    required: true,
  },
  charisma: {
    type: Number,
    required: true,
  },
  skills: {
    type: Array,
  },
  sense: {
    type: Array,
    required: true,
  },
  language: {
    type: Array,
    required: true,
  },
  challenge: {
    type: String,
    required: true,
  },
  proficiency: {
    type: Number,
    required: true,
  },
  trait: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  action: [
    {
      title: {
        type: String,
        required: true,
      },
      type: {
        type: String,
      },
      hitBonuse: {
        type: Number,
      },
      range: {
        type: String,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

const StatBlock = model("StatBlock", statBlockSchema);

module.exports = StatBlock;
