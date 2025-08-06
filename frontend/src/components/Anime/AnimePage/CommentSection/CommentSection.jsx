import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../../../styles/scrollbar.css";
import { useAuthContext } from "../../../../context/AuthContext";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../../../../services/commentService";

import Comment from "./Comment";
import Loader from "../../../Common/Loader";

export default function CommentSection({ animeId, commentSectionMarginTop }) {
  const { user } = useAuthContext();

  const { register, handleSubmit, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [commentData, setCommentData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle comment submission
  const onSubmit = async (data) => {
    if (!animeId) return;
    setSubmitting(true);
    try {
      const res = await addComment(animeId, data.comment);
      reset();

      // Optimistically add new comment to state
      const newComment = {
        ...res.data.newComment,
        userId: {
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
        replies: [],
      };

      setCommentData((prev) => ({
        ...prev,
        comments: [newComment, ...prev.comments],
        total: prev.total + 1,
      }));
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Function to fetch comments for the anime
  const fetchAnimeComments = async (page) => {
    setLoading(true);
    try {
      const res = await fetchComments(animeId, page);
      setCommentData(res.data);
    } catch (error) {
      console.error("Error fetching comments!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeComments(1);
  }, [animeId]);

  // Function to handle comment deletion
  const handleCommentDelete = async (commentId) => {
    try {
      const res = await deleteComment(commentId);

      // Update state to remove the deleted comment
      setCommentData((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== commentId),
        total: prev.total - 1,
      }));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="break-inside-avoid">
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-secondary pb-2 border-b-3 border-primary">
          Discussion (20)
        </h3>

        {/* Comment input field */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2 border border-secondary/50 rounded-md px-4 py-2">
            <textarea
              {...register("comment", { required: true })}
              id="comment"
              placeholder="Write a comment..."
              className="w-full outline-0 resize-none"
              rows={3}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary mt-2 px-4 py-2 rounded-md text-sm font-medium cursor-pointer text-white"
          >
            {submitting ? <Loader isBig={false} /> : "Post comment"}
          </button>
        </form>
      </div>

      {/* Show comments */}
      <div className={`${commentData?.comments?.length > 0 ? "h-[560px]" : "h-[110px]"} overflow-y-auto custom-scrollbar`}>
        {loading || !commentData?.comments ? (
          <Loader />
        ) : commentData.comments.length === 0 ? (
          <div className="mt-10">
            <p className="text-2xl text-center font-bold text-secondary">
              No comments yet.
            </p>
          </div>
        ) : (
          commentData.comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              handleCommentDelete={handleCommentDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
