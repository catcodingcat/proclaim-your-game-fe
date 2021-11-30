import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReview, getReviewComments } from "../Utils/api";
import { UserContext } from "../Context/user";
import { useContext } from "react";
import AmendVotes from "./AmendVotes";
import PostComment from "./PostComment";
import DeleteComment from "./DeleteComment";

export default function SingleReview() {
  const { review_id } = useParams();
  const { user } = useContext(UserContext);
  let navigate = useNavigate();

  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getReview(review_id)
      .then((review) => {
        setReview(review);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMsg(err.response.data.msg);
      });
  }, [review_id]);

  const handleCommentClick = (e) => {
    e.preventDefault();
    return getReviewComments(review_id)
      .then((comments) => {
        setComments(comments);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMsg(err.response.data.msg);
      });
  };

  const handleAuthorClick = (e) => {
    e.preventDefault();
    navigate(`/users/${e.target.value}`);
  };

  if (isLoading) return <p className="loading">...loading</p>;
  if (isError) return <p className="error">{errorMsg}</p>;

  return (
    <main>
      <h2>Review</h2>
      <section>
        <div id="single-review-card">
          <h3>{review.title}</h3>
          <button
            className="review-card-owner"
            value={review.owner}
            onClick={handleAuthorClick}
          >
            {review.owner}
          </button>
          <img
            className="review-image"
            src={review.review_img_url}
            alt={review.title}
          />
          <p className="review-body">{review.review_body}</p>

          <div className="review-info">
            <p className="designer">Game designer: {review.designer}</p>
            <p className="category">Game category: {review.category}</p>
            <p className="created_at">{review.created_at}</p>
          </div>
          <AmendVotes
            id={review.review_id}
            votes={review.votes}
            type="review"
            author={review.author}
          />
          <p className="comment_count">Comments: {review.comment_count}</p>
          <button onClick={handleCommentClick}>See comments</button>
        </div>
      </section>
      <section id="comment-section">
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id} id="comment-cards">
              <p className="comment-body">{comment.body}</p>

              <button
                className="comment-author"
                value={comment.author}
                onClick={handleAuthorClick}
              >
                {comment.author}
              </button>

              <p className="comment-date">{comment.created_at}</p>
              <AmendVotes
                id={comment.comment_id}
                votes={comment.votes}
                type="comment"
                author={comment.author}
              />
              {comment.author === user.username ? (
                <DeleteComment
                  comment={comment}
                  setIsDeleted={setIsDeleted}
                  setComments={setComments}
                  setReview={setReview}
                />
              ) : null}
            </div>
          );
        })}
        {isDeleted ? (
          <p className="confirmation" onMouseMove={() => setIsDeleted(false)}>
            Your comment has been deleted.
          </p>
        ) : null}
        <PostComment
          comments={comments}
          setComments={setComments}
          review_id={review_id}
          setReview={setReview}
        />
      </section>
    </main>
  );
}
