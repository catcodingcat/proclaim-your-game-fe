import { getReviews } from "../Utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews().then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  return (
    <main>
      <h2>All Reviews</h2>
      <section id="review-section">
        {reviews.map((review) => {
          return (
            <div className="cards">
              <h3>{review.title}</h3>
              <img
                className="image"
                src={review.review_img_url}
                alt={review.title}
              ></img>
              <p className="owner">{review.owner}</p>
              <p className="category">{review.category}</p>
              <p className="created_at">{review.created_at}</p>
              <p className="votes">{review.votes}</p>
              <p className="comment_count">{review.comment_count}</p>
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
