import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReview, getReviewComments } from "../Utils/api";
import AmendVotes from "./AmendVotes";

export default function ItemPage() {
  const { review_id } = useParams();

  const [review, setReview] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getReview(review_id).then((review) => {
      setReview(review);
      setIsLoading(false);
    });
  }, [review_id]);

  const handleCommentClick = (e) => {
    e.preventDefault();
    return getReviewComments(review_id).then((comments) => {
      console.log(comments, "<<<in handle comments");
      setComments(comments);
    });
  };

  if (isLoading) {
    return <p>...loading</p>;
  }

  return (
    <main>
      <h2>{review.title}</h2>
      <section>
        <div className="card">
          <p className="author">{review.owner}</p>
          <img
            className="image"
            src={review.review_img_url}
            alt={review.title}
          />
          <p className="body">{review.review_body}</p>
          <p className="designer">Game designer: {review.designer}</p>
          <p className="category">Game category: {review.category}</p>
          <p className="created_at">{review.created_at}</p>
          <AmendVotes
            id={review.review_id}
            votes={review.votes}
            type="reviews"
          />
          <p className="comment_count">Comments: {review.comment_count}</p>
          <button onClick={handleCommentClick}>See comments</button>
        </div>
      </section>
      <section id="comment-section">
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id} className="cards">
              <p>{comment.body}</p>
              <p>{comment.author}</p>
              <p>Created at: {comment.created_at}</p>
              <AmendVotes
                id={comment.comment_id}
                votes={comment.votes}
                type="comments"
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}
