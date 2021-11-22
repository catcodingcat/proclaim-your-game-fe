import { getReviews } from "../Utils/api";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AllReviews() {
  let navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  const handleAuthorClick = (e) => {
    e.preventDefault();
    navigate(`/users/${e.target.value}`);
  };

  return (
    <main>
      <h2>All Reviews</h2>
      <section id="review-section">
        {reviews.map((review) => {
          return (
            <div className="cards">
              <h3>{review.title}</h3>
              <button
                className="owner"
                value={review.owner}
                onClick={handleAuthorClick}
              >
                {review.owner}
              </button>
              <img
                className="image"
                src={review.review_img_url}
                alt={review.title}
              ></img>
              <p className="category">Category: {review.category}</p>
              <p className="created_at">Created at: {review.created_at}</p>
              <p className="votes">Votes: {review.votes}</p>
              <p className="comment_count">Comments: {review.comment_count}</p>
              <Link
                to={`/reviews/${review.review_id}`}
                className="single-review"
              >
                <button>View Review!</button>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}
