"use strict";

const express = require("express");
const { signUp, signIn, signOut } = require("../controllers/authController");
const { userById } = require("../controllers/userController");
const { userSignUpValidate } = require("../validators");

const router = express.Router();

router.post("/signup", userSignUpValidate, signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

//any route containing :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;
