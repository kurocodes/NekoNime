const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/signup", asyncHandler(authController.signup));
router.post("/login", asyncHandler(authController.login));
router.post("/logout", authController.logout);
router.get("/verify", verifyToken, asyncHandler(authController.verify));

module.exports = router;