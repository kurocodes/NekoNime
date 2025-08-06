const Comment = require("../models/Comment");
const User = require("../models/User");
const AnimeEntry = require("../models/AnimeEntry");
const Reply = require("../models/Reply");

// Get comments for an anime
exports.getAnimeComments = async (req, res) => {
  const { animeId, page = 1, limit = 5 } = req.query;

  const animeEntry = await AnimeEntry.findOne({ animeId }).populate({
    path: "comments",
    match: { isDeleted: false },
    options: {
      sort: { createdAt: -1 },
      skip: (page - 1) * limit,
      limit: parseInt(limit),
    },
    populate: [
      {
        path: "userId",
        select: "username profilePicture",
      },
    ],
  });

  if (!animeEntry) {
    const newEntry = await AnimeEntry.create({ animeId });
    return res
      .status(201)
      .json({ message: "Anime entry created.", comments: [] });
  }

  const totalComments = await Comment.countDocuments({
    animeId,
    isDeleted: false,
  });

  res.status(200).json({
    message: "Comments fetched.",
    comments: animeEntry.comments,
    total: totalComments,
    page: Number(page),
    hasMore: page * limit < totalComments,
  });
};

// Get comment replies
exports.getCommentReplies = async (req, res) => {
  const { commentId, limit = 3 } = req.query;

  const comment = await Comment.findById(commentId).populate({
    path: "replies",
    options: {
      sort: { createdAt: 1 },
      limit: parseInt(limit),
    },
    populate: {
      path: "userId",
      select: "username profilePicture",
    },
  });

  if (!comment) return res.status(404).json({ message: "Comment not found!" });

  res
    .status(200)
    .json({ message: "Replies fetched", replies: comment.replies });
};

// Add comment
exports.addUserComment = async (req, res) => {
  const { animeId, comment } = req.body;
  const userId = req.user.id;

  if (!animeId || !comment) {
    return res.status(400).json({ message: "animeId or comment is missing!" });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found!" });

  const animeEntry = await AnimeEntry.findOne({ animeId });
  if (!animeEntry) {
    animeEntry = await AnimeEntry.create({
      animeId,
      comments: [],
    });
  }

  const newComment = await Comment.create({
    userId,
    animeId,
    comment,
  });

  user.comments.push(newComment._id);
  await user.save();
  animeEntry.comments.push(newComment._id);
  await animeEntry.save();

  res.status(200).json({ message: "Comment added succesfully!", newComment });
};

// Delete comment
exports.deleteComment = async (req, res) => {
  const { commentId } = req.body;
  const userId = req.user.id;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found!" });
    }

    if (comment.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments!" });
    }

    // Delete the comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(500).json({ message: "Failed to delete comment!" });
    }

    // Remove commentId from AnimeEntry's comments array
    await AnimeEntry.updateOne(
      { animeId: comment.animeId },
      { $pull: { comments: commentId } }
    );

    // Remove commentId from User's comments array
    await User.updateOne({ _id: userId }, { $pull: { comments: commentId } });

    return res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (err) {
    console.error("Delete Comment Error:", err);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

// Get replies for a comment
exports.getReplies = async (req, res) => {
  const { commentId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = 3;

  const replies = await Reply.find({ commentId })
    .populate({path: "userId", select: "username profilePicture"})
    .sort({ createdAt: 1 }) // oldest first (-1 for newest first)
    .skip((page - 1) * limit)
    .limit(limit);

  const totalReplies = await Reply.countDocuments({ commentId });

  res.status(200).json({
    message: "Replies fetched.",
    replies,
    total: totalReplies,
    hasMore: page * limit < totalReplies,
  });
};

// Add reply to a comment
exports.addReplyToComment = async (req, res) => {
  const { commentId, reply } = req.body;
  const userId = req.user.id;

  if (!commentId || !reply) {
    return res.status(400).json({ message: "commentId or reply is missing!" });
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found!" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  const newReply = await Reply.create({
    userId,
    commentId,
    reply,
  });

  comment.replies.push(newReply._id);
  await comment.save();
  user.replies.push(newReply._id);
  await user.save();

  res.status(200).json({ message: "Reply added successfully!", newReply });
};

// Delete reply
exports.deleteReply = async (req, res) => {
  const { replyId } = req.body;
  const userId = req.user.id;

  const reply = await Reply.findById(replyId);
  if (!reply) {
    return res.status(404).json({ message: "Reply not found!" });
  }

  if (reply.userId.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "You can only delete your own replies!" });
  }

  // Delete the reply
  const deletedReply = await Reply.findByIdAndDelete(replyId);
  if (!deletedReply) {
    return res.status(500).json({ message: "Failed to delete reply!" });
  }

  // Remove replyId from Comment's replies array
  await Comment.updateOne(
    { _id: reply.commentId },
    { $pull: { replies: replyId } }
  );

  // Remove replyId from User's replies array
  await User.updateOne({ _id: userId }, { $pull: { replies: replyId } });

  return res.status(200).json({ message: "Reply deleted successfully!" });
};

// Toggle like on a comment
exports.toggleLikeComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found!" });

  const liked = comment.likes.includes(userId);

  if (liked) {
    comment.likes.pull(userId);
  } else {
    comment.likes.push(userId);
  }

  await comment.save();

  res.status(200).json({
    liked: !liked,
    likesCount: comment.likes.length,
    message: liked ? "Comment unliked." : "Comment liked.",
  });
}

// Toggle like on a reply
exports.toggleLikeReply = async (req, res) => {
  const { replyId } = req.params;
  const userId = req.user._id;

  const reply = await Reply.findById(replyId);
  if (!reply) return res.status(404).json({ message: "Reply not found" });

  const liked = reply.likes.includes(userId);

  if (liked) {
    reply.likes.pull(userId);
  } else {
    reply.likes.push(userId);
  }

  await reply.save();

  res.status(200).json({
    liked: !liked,
    likesCount: reply.likes.length,
  });
};
