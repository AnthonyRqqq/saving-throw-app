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
  components: {
    type: String,
    required: true,
  },
  materialComponents: {
    type: Array,
    required: true,
  },
});

const Spell = model("Spell", spellSchema);

module.exports = Spell;
