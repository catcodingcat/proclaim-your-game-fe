import { deleteComment } from "../Utils/api";
import { useState } from "react";

export default function DeleteComment({
  comment,
  setIsDeleted,
  setComments,
  setReview,
}) {
  const [isError, setIsError] = useState(false);

  const handleDeleteComment = (e) => {
    e.preventDefault();
    return deleteComment(e.target.value)
      .then(() => {
        setIsDeleted(true);
        setIsError(false);
        setComments((comments) =>
          comments.filter((comment) => {
            return comment.comment_id != e.target.value;
          })
        );
        setReview((review) => ({
          ...review,
          comment_count: review.comment_count - 1,
        }));
      })
      .catch(() => {
        setIsError(true);
        setIsDeleted(false);
      });
  };

  return (
    <div>
      <button value={comment.comment_id} onClick={handleDeleteComment}>
        Delete comment
      </button>
      {isError ? (
        <p className="error">
          You must be logged in as the comment author to delete this comment.
        </p>
      ) : null}
    </div>
  );
}
