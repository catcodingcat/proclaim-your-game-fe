import { useState } from "react";
import { postComment } from "../Utils/api";
import { UserContext } from "../Context/user";
import { useContext } from "react";

export default function PostComment({
  comments,
  setComments,
  review_id,
  setReview,
}) {
  const { user } = useContext(UserContext);
  const [commentToAdd, setCommentToAdd] = useState({});
  const [isError, setIsError] = useState(false);
  const [isPosted, setIsPosted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    return postComment(review_id, commentToAdd)
      .then((comment) => {
        setComments([...comments, comment]);
        setIsPosted(true);
        setIsError(false);
        setReview((review) => ({
          ...review,
          comment_count: review.comment_count + 1,
        }));
      })
      .catch(() => {
        setIsError(true);
        setIsPosted(false);
      });
  };

  return (
    <div className="cards" id="add-comment-card">
      <h2 id="add-a-comment">Add a comment</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="add-comment">
          <label id="comment-body-label">Type your comment here: </label>
          <textarea
            value={commentToAdd.comment_body}
            name="comment_body"
            id="comment-body-input"
            required
            onChange={(e) => {
              setCommentToAdd({
                author: user.username,
                body: e.target.value,
              });
              setIsError(false);
              setIsPosted(false);
            }}
          />
        </fieldset>
        <button type="submit">Post comment!</button>
        {isError ? (
          <p className="custom-error">
            You must be logged in to post a comment.
          </p>
        ) : null}
        {isPosted ? (
          <p className="confirmation">Your comment has been posted.</p>
        ) : null}
      </form>
    </div>
  );
}
