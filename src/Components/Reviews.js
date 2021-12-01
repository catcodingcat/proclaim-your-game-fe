import { getReviews } from "../Utils/api";
import { dateFormatter } from "../Utils/dateFormatter";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

export default function Reviews() {
  let { category } = useParams();
  let navigate = useNavigate();
  // let { search } = useLocation();

  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getReviews(category, sortBy, order, pageNo)
      .then((reviews) => {
        setReviews(reviews);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMsg(err.response.data.msg);
      });
  }, [category, sortBy, order, pageNo]);

  const handleAuthorClick = (e) => {
    e.preventDefault();
    navigate(`/users/${e.target.value}`);
  };

  const handlePageClick = (e) => {
    setPageNo(e.target.value);
  };

  if (isLoading) return <p className="loading">...loading</p>;
  if (isError) return <p className="error">{errorMsg}</p>;

  return (
    <main>
      {category ? (
        <h2 className="category-reviews-title">All {category} Reviews</h2>
      ) : (
        <h2>All Reviews</h2>
      )}
      <section id="review-queries">
        <label className="query-label">Sort By: </label>
        <select
          className="query-options"
          onChange={(e) => {
            e.preventDefault();
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
        <label className="query-label">Order: </label>
        <select
          className="query-options"
          onChange={(e) => {
            e.preventDefault();
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
            <div key={review.review_id} className="cards" id="review-cards">
              <h3 className="review-title">{review.title}</h3>
              <button
                className="owner"
                value={review.owner}
                onClick={handleAuthorClick}
              >
                {review.owner}
              </button>
              <img
                className="review-image"
                src={review.review_img_url}
                alt={review.title}
              ></img>
              <div className="review-info">
                <p className="category">Category: {review.category}</p>
                <p className="created_at">
                  Created at: {dateFormatter(review.created_at)}
                </p>
                <p className="votes">Votes: {review.votes}</p>
                <p className="comment_count">
                  Comments: {review.comment_count}
                </p>
              </div>
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
      {category === undefined ? (
        <section className="pages">
          <button value="1" className="page-number" onClick={handlePageClick}>
            1
          </button>
          <button value="2" className="page-number" onClick={handlePageClick}>
            2
          </button>
          <button value="3" className="page-number" onClick={handlePageClick}>
            3
          </button>
        </section>
      ) : null}
    </main>
  );
}
