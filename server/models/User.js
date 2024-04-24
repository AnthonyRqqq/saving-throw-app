const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// User model
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 50,
      trim: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Must be a valid email address.",
      ],
    },
    password: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 5,
    },
    fantasyLocations: [
      {
        type: Schema.Types.ObjectId,
        ref: "FantasyLocation",
      },
    ],
    weatherCreateInstruction: {
      type: Boolean,
      default: true
    },
  },
  {
    strictPopulate: false,
  }
);

// For encrypting password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// For checking password
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
