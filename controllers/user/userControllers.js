const cloudinary = require("../../Cloudinary/cloudinary");
const userDB = require("../../model/user/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.USER_SECRET_KEY || "USER SECRET KEY"
const path = require("path");
const fs = require("fs");
const { log } = require("console");

// register
// exports.userRegister = async (req, res) => {
//   console.log('user route called\n register api called')
//   console.log('request body is', req.body)
//   console.log('request file is', req.file)
//   // res.send('user registered successfully');


//   // Destructure the required fields
//   const { fname, lname, address, city, contact, aadhar, dob, gender, email, password, about, hobbies } = req.body;

//   if (!fname || !lname || !address || !city || !contact || !aadhar || !dob || !gender || !password || !about || !hobbies || !req.file) {
//     res.status(400).json({ error: "all fileds are required" })
//   }

//   const file = req.file?.path;

//   try {
//     const upload = await cloudinary.uploader.upload(file);
//     const preuser = await userDB.findOne({ email: email });

//     if (preuser) {
//       res.status(400).json({ error: "this user is already exist" });
//     } else if (password !== confirmpassword) {
//       res.status(400).json({ error: "password and confirm password not match" });
//     } else {
//       const userData = new userDB({
//         fname, lname, address, city, contact, aadhar, dob, gender, email, password, hobbies, about, photo: upload.secure_url
//       });

//       // here password hashing
//       await userData.save();
//       res.status(200).json(userData);
//     }
//   } catch (error) {
//     res.status(400).json(error)
//   }
// }

exports.userRegister = async (req, res) => {
  console.log('user route called\n register api called');
  console.log('request body is', req.body);
  console.log('request file is', req.file);

  // Destructure the required fields
  const { fname, lname, address, city, contact, aadhar, dob, gender, email, password, confirmPassword, about, hobbies } = req.body;

  // Validate required fields
  if (!fname || !lname || !address || !city || !contact || !aadhar || !dob || !gender || !password || !confirmPassword || !about || !hobbies || !req.file) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const file = req.file?.path;

  try {
    // Upload the file to Cloudinary
    const upload = await cloudinary.uploader.upload(file);

    // Check if user already exists
    const preuser = await userDB.findOne({ email: email });

    if (preuser) {
      return res.status(400).json({ error: "This user already exists" });
    }

    // Optional: Handle confirm password validation (ensure `confirmpassword` is passed)
    const confirmPassword = req.body.confirmPassword; // Include this in your frontend and form submission
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password and confirm password do not match" });
    }

    // Create a new user
    const userData = new userDB({
      fname, lname, address, city, contact, aadhar, dob, gender, email, password, hobbies, about, photo: upload.secure_url,
    });
    console.log("userData is", userData);

    // Save the user and send success response
    let result = await userData.save();
    console.log("result is", result);

    return res.status(200).json(result);

  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ error: "An error occurred while registering the user" });
  }
};
