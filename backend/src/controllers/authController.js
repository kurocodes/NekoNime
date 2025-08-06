const User = require("../models/User");
const { DEFAULT_PROFILE_PICTURES } = require("../utils/data");
const generateToken = require("../utils/jwt");

// Sign Up ---------------------------------------------
exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // Check if email exists
  const existingEmail = await User.findOne({ email });
  if (existingEmail)
    return res.status(400).json({ message: "Email is already in use" });

  // Check if username exists
  const existingUsername = await User.findOne({ username });
  if (existingUsername)
    return res.status(400).json({ message: "Username is already in use" });

  // Randomly pick an avatar
  const profilePicture =
    DEFAULT_PROFILE_PICTURES[
      Math.floor(Math.random() * DEFAULT_PROFILE_PICTURES.length)
    ];

  // Create new user
  const user = await User.create({
    username,
    email,
    password,
    profilePicture,
  });

  const token = generateToken(user._id);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      message: "User registered succesfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
};

// Login ---------------------------------------------
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid username or password" });

  const token = generateToken(user._id);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
};

// Logout ---------------------------------------------
exports.logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    })
    .status(200)
    .json({ message: "Logout successful" });
};

exports.verify = async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "username email profilePicture"
  );

  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({ message: "Token is valid", user });
};
