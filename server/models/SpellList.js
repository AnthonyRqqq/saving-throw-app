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
      },
      expended: {
        type: Number,
      },
      available: {
        type: Number,
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
  },
});

const SpellList = model("SpellList", spellListSchema);

module.exports = SpellList;
