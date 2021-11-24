import { getReviews } from "../Utils/api";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AllReviews() {
  let { category } = useParams();
  let navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    getReviews(category, sortBy, order).then((reviews) => {
      setReviews(reviews);
    });
  }, [category, sortBy, order]);

  const handleAuthorClick = (e) => {
    e.preventDefault();
    navigate(`/users/${e.target.value}`);
  };

  return (
    <main>
      <h2>All Reviews</h2>
      <section id="review-queries">
        <label>Sort By: </label>
        <select
          className="sort-by-options"
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option key="created_at" value="created_at" selected>
            Date posted
          </option>
          <option key="owner" value="owner">
            Username
          </option>
          <option key="title" value="title">
            Review Title
          </option>
          <option key="category" value="category">
            Category
          </option>
          <option key="votes" value="votes">
            Votes
          </option>
          <option key="comment_count" value="comment_count">
            Comment Count
          </option>
        </select>
      </section>
      <section id="review-queries">
        <label>Sort By: </label>
        <select
          className="order-options"
          onChange={(e) => {
            setOrder(e.target.value);
          }}
        >
          <option key="desc" value="desc" selected>
            Descending
          </option>
          <option key="asc" value="asc">
            Ascending
          </option>
        </select>
      </section>
      <section id="review-section">
        {reviews.map((review) => {
          return (
            <div key={review.review_id} className="cards">
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
