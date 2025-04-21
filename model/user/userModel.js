const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.USER_SECRET_KEY || "USER SECRET KEY"

// user schema
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  aadhar: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email")
      }
    }
  },
  password: {
    type: String,
    required: true
  },
  hobbies: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  }
}, { timestamps: true });

// password hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next()
});


// user model
const userDB = new mongoose.model("usersdbs", userSchema);

module.exports = userDB;