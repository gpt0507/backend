const express = require("express");
const router = new express.Router();
const userUpload = require("../../multerconfig/user/userStorageConfig");
const userController = require("../../controllers/user/userControllers");

console.log("register route page called");

// user Auth Routes
router.post("/register", userUpload.single("photo"), userController.userRegister);




module.exports = router;