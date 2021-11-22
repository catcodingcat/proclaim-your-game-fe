import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReview, getReviewComments } from "../Utils/api";

export default function ItemPage() {
  const { review_id } = useParams();

  const [review, setReview] = useState({});

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getReview(review_id).then((review) => {
      setReview(review);
    });
  }, [review_id]);

  const handleCommentClick = (e) => {
    e.preventDefault();
    return getReviewComments(review_id).then((comments) => {
      console.log(comments, "<<<in handle comments");
      setComments(comments);
    });
  };

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
          <p className="votes">Votes: {review.votes}</p>
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
              <p>Votes: {comment.votes}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
