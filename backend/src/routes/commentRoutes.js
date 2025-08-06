const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const verifyToken = require("../middlewares/verifyToken");
const asyncHandler = require("express-async-handler");

router.get("/anime", asyncHandler(commentController.getAnimeComments));
router.get("/replies", asyncHandler(commentController.getCommentReplies));
router.post(
  "/add",
  verifyToken,
  asyncHandler(commentController.addUserComment)
);
router.post(
  "/delete",
  verifyToken,
  asyncHandler(commentController.deleteComment)
);

router.post(
  "/reply",
  verifyToken,
  asyncHandler(commentController.addReplyToComment)
);
router.post(
  "/reply/delete",
  verifyToken,
  asyncHandler(commentController.deleteReply)
);
router.get("/:commentId", asyncHandler(commentController.getReplies));
router.post("/:commentId/like", verifyToken, asyncHandler(commentController.toggleLikeComment));
router.post("/reply/:replyId/like", verifyToken, asyncHandler(commentController.toggleLikeReply));

module.exports = router;
