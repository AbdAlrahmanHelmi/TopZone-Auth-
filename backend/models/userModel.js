const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  email: {
    type: String,
    required: [true, "the user must have Email"],
    unique: [true, "this email already taken"],
  },
  password: {
    type: String,
    required: [true, "the user must have Password"],
  },
});

// static signup method

userSchema.statics.signup = async function (
  name,
  email,
  password,
  confirmPassword
) {
  // validation

  if (!email || !password || !confirmPassword) {
    throw Error("All field must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("password not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("email already in use");
  }
  if (password !== confirmPassword) {
    throw Error("confirm Password is wrong");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ name, email, password: hash });

  return user;
};

// static login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All field must be filled");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  // bcrypt.compare() return true or false
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
