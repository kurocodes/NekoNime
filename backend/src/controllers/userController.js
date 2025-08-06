const User = require("../models/User");

exports.getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
};
