const { Schema, model } = require("mongoose");

const spellListSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  spell: [
    {
      type: Schema.Types.ObjectId,
      ref: "Spell",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  spellSlots: [
    {
      level: {
        type: String,
        required: true,
      },
      expended: {
        type: Number,
        required: true,
      },
      available: {
        type: Number,
        required: true,
      },
    },
  ],
  preparedSpells: [
    {
      type: String,
    },
  ],
  class: {
    type: String,
    required: true,
  },
});

const SpellList = model("SpellList", spellListSchema);

module.exports = SpellList;
