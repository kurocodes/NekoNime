import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { formatDate } from "../../../../utils/dateUtils";
import { useAuthContext } from "../../../../context/AuthContext";
import { deleteReply } from "../../../../services/commentService";
import {
  getReplies,
  toggleLikeComment,
} from "../../../../services/commentService";

import { GoDotFill } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";
import { MdDelete, MdInsertComment } from "react-icons/md";

import Reply from "./Reply";
import AddReplyField from "./AddReplyField";
import CommentActionBtn from "./CommentActionBtn";

export default function Comment({ comment, handleCommentDelete }) {
  const { user } = useAuthContext();

  const [replies, setReplies] = useState([]);
  const [repliesPage, setRepliesPage] = useState(1);
  const [showReplies, setShowReplies] = useState(false);
  const [hasMoreReplies, setHasMoreReplies] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);

  const [likes, setLikes] = useState(comment.likes || []);
  const [showReplyField, setShowReplyField] = useState(false);

  const isLiked = user?._id && likes.includes(user._id);

  // Function to fetch replies for the comment
  const fetchReplies = async () => {
    setLoadingReplies(true);
    try {
      const res = await getReplies(comment._id, repliesPage);
      if (repliesPage === 1) {
        setReplies(res.data.replies);
      } else {
        setReplies((prev) => [...prev, ...res.data.replies]);
      }
      console.log(res.data);
      setHasMoreReplies(res.data.hasMore);
      setRepliesPage((prev) => prev + 1);
      setShowReplies(true);
    } catch (err) {
      console.error("Failed to fetch replies:", err);
    } finally {
      setLoadingReplies(false);
    }
  };

  // Function to handle deleting a reply
  const handleDeleteReply = async (replyId) => {
    try {
      await deleteReply(replyId);
      setReplies((prev) => prev.filter((r) => r._id !== replyId));
      console.log("Reply deleted successfully");
    } catch (error) {
      console.error("Failed to delete reply:", error);
    }
  };

  // Function to toggle like on the comment
  const handleLikeToggle = async () => {
    try {
      const res = await toggleLikeComment(comment._id);
      const isLiked = res.data.liked;

      setLikes((prevLikes) =>
        isLiked
          ? [...prevLikes, user._id]
          : prevLikes.filter((id) => id !== user._id)
      );
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  return (
    <div className="mt-5 px-4 pb-5 border-b-1 border-secondary/20">
      {/* Comment header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <div className="w-7 h-7 rounded-full">
              {/* profile picture */}
              <img
                src={comment.userId.profilePicture}
                alt="profile picture"
                className="rounded-full"
              />
            </div>
            {/* username */}
            <span className="text-md text-primary font-semibold">
              {comment.userId.username}
            </span>
          </div>
          {/* date */}
          <span className="text-xs text-secondary">
            <GoDotFill className="inline-block -mt-[2px]" />{" "}
            {formatDate(comment.createdAt)}
          </span>
        </div>

        <div className="flex gap-4 text-secondary">
        {/* Delete button */}
          {comment?.userId?._id?.toString() === user?._id.toString() && (
            <CommentActionBtn
              Icon={MdDelete}
              style="text-xl cursor-pointer hover:text-red-500 hover:scale-110 transition-all duration-200"
              onClick={() => handleCommentDelete(comment._id)}
            />
          )}
        </div>
      </div>

      <div className="px-1">
        {/* Comment Content */}
        <p className="mt-2 text-black/70 text-md">{comment.comment}</p>

        <div className="flex items-center gap-2">
          {/* Like button */}
          <CommentActionBtn
            Icon={isLiked ? FaHeart : FaRegHeart}
            style={`flex items-center mt-2 gap-1 cursor-pointer ${
              isLiked ? "text-red-500" : "text-secondary"
            } hover:text-black`}
            onClick={handleLikeToggle}
            text={likes.length}
          />
          {/* Reply button */}
          <CommentActionBtn
            Icon={MdInsertComment}
            text="Reply"
            style="flex items-center gap-1 mt-2 text-secondary cursor-pointer hover:underline hover:text-primary"
            onClick={() => setShowReplyField(!showReplyField)}
          />
        </div>
      </div>

      {/* Show Replies button */}
      {!showReplies && (
        <button
          className="text-primary text-sm underline mt-3 cursor-pointer hover:text-secondary"
          onClick={fetchReplies}
        >
          View replies
        </button>
      )}

      {/* Field to add a reply */}
      {showReplyField && (
        <AddReplyField
          setReplies={setReplies}
          commentId={comment._id}
          user={user}
          setShowReplies={setShowReplies}
          setShowReplyField={setShowReplyField}
        />
      )}

      {/* Replies Section */}
      {showReplies && (
        <div className="ps-15 mt-4">
          {replies.map((reply) => (
            <Reply
              key={reply._id}
              reply={reply}
              handleDeleteReply={handleDeleteReply}
              showReplyField={showReplyField}
              setShowReplyField={setShowReplyField}
            />
          ))}

          {hasMoreReplies && (
            <button
              onClick={fetchReplies}
              disabled={loadingReplies}
              className="text-primary text-sm underline mt-2"
            >
              {loadingReplies ? "Loading..." : "Load more replies"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
