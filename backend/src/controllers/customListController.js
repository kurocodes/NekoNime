const User = require("../models/User")
const CustomList = require("../models/CustomList");

// Create Custom List
exports.createUserCustomList = async (req, res, next) => {
  const { listTitle, visibility } = req.body;

  if (!listTitle || !["private", "public"].includes(visibility)) {
    return res
      .status(400)
      .json({ message: "Invalid list title or visibilty." });
  }

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found!" });

  const exists = await CustomList.findOne({
    userId: user._id,
    title: listTitle,
  });
  if (exists) {
    return res
      .status(400)
      .json({ message: "Custom list with this title already exists." });
  }

  const newCustomList = await CustomList.create({
    userId: user._id,
    title: listTitle,
    visibility,
  });

  user.customLists.push(newCustomList._id);
  await user.save();

  res.status(200).json({
    message: `Custom list created with title ${listTitle}.`,
  });
};

// Delete Custom List
exports.deleteUserCustomList = async (req, res, next) => {
  const { listId } = req.params;

  if (!listId) return res.status(400).json({ message: "Invalid List Id!" });

  const customList = await CustomList.findById(listId);
  if (!customList) return res.status(404).json({ message: "List not found!" });

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found!" });

  if (customList.userId.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this list." });
  }

  user.customLists = user.customLists.filter(
    (id) => id.toString() !== customList._id.toString()
  );

  const deletedCustomList = await CustomList.findByIdAndDelete(listId);

  res
    .status(200)
    .json({ message: "Custom list deleted succesfully.", deletedCustomList });
};
