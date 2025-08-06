const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

router.get(
  "/profile",
  verifyToken,
  asyncHandler(userController.getUserProfile)
);

module.exports = router;
