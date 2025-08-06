import { useState } from "react";
import { useForm } from "react-hook-form";
import { addReply } from "../../../../services/commentService";

export default function AddReplyField({
  setReplies,
  commentId,
  user,
  setShowReplyField,
  setShowReplies,
}) {
  const { register, handleSubmit, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);

  // Function to handle reply submission
  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await addReply(commentId, data.reply);
      console.log(res.data);
      reset();

      // Optimistically add new comment to state
      const newReply = {
        ...res.data.newReply,
        userId: {
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
      };
      setReplies((prev) => [...prev, newReply]);
      setShowReplyField(false);
      setShowReplies(true);
    } catch (error) {
      console.error("Failed to post Reply:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ps-15 my-5">
      {/* Reply input field */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center mt-2 border border-secondary/50 rounded-full px-2 py-1">
          <div className="w-8 h-8 rounded-full">
            <img
              src={user.profilePicture}
              alt="profile picture"
              className="rounded-full"
            />
          </div>
          <textarea
            {...register("reply", { required: true })}
            id="reply"
            placeholder="Write a Reply..."
            className="flex-1 ps-3 py-2 outline-0 resize-none"
            rows={1}
          ></textarea>
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary px-4 py-2 rounded-full text-sm font-medium text-white"
          >
            {submitting ? "Replying..." : "Reply"}
          </button>
        </div>
      </form>
    </div>
  );
}
