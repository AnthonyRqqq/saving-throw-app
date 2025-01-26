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
  type: {
    type: String,
    required: true,
  },
  alignment: {
    type: String,
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
  conditionImmunities: {
    type: Array,
  },
  damageImmunities: {
    type: Array,
  },
  resistances: {
    type: Array,
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
  },
  proficiency: {
    type: String,
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
      hitBonus: {
        type: String,
      },
      range: {
        type: String,
      },
      target: {
        type: String,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  reaction: [
    {
      title: {
        type: String,
        required: true,
      },
      type: {
        type: String,
      },
      hitBonus: {
        type: String,
      },
      range: {
        type: String,
      },
      target: {
        type: String,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  bonusAction: [
    {
      title: {
        type: String,
        required: true,
      },
      type: {
        type: String,
      },
      hitBonus: {
        type: String,
      },
      range: {
        type: String,
      },
      target: {
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
