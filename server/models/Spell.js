const { Schema, model } = require("mongoose");

const spellSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  isRitual: {
    type: Boolean,
    required: true,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  effectsArray: {
    type: Array,
  },
  atHigherLevel: {
    type: String,
  },
  components: {
    type: String,
    required: true,
  },
  materialComponents: {
    type: Array,
    required: true,
  },
  isConcentration: {
    type: Boolean,
    required: true,
    default: false,
  },
  classList: {
    type: Array,
    required: true,
  },
  sourceBook: {
    type: String,
    required: true,
    default: "Player's Handbook",
  },
  castingTime: {
    type: String,
    required: true,
    default: "One Action",
  },
  duration: {
    type: String,
    required: true,
    default: "Instantaneous"
  },
  range: {
    type: String,
    required: true,
  }
});

const Spell = model("Spell", spellSchema);

module.exports = Spell;
