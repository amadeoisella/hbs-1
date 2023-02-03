const mongoose = require("mongoose");
const brcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  tokenConfirm: {
    type: String,
    default: null,
  },
  confirmCounter: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next;

  try {
    const salt = await brcrypt.genSalt(10);
    const hash = await brcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  } catch (error) {
    console.log(error);
    // next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await brcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
