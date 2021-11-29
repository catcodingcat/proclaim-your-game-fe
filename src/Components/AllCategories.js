import { getCategories } from "../Utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setCategories(categories);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMsg(err.response.data.msg);
      });
  }, []);

  if (isLoading) return <p className="loading">...loading</p>;
  if (isError) return <p className="error">{errorMsg}</p>;

  return (
    <main>
      <h2>All Categories</h2>
      <section id="category-section">
        {categories.map((category) => {
          return (
            <div key={category.slug} className="cards" id="category-cards">
              <h3>{category.slug}</h3>
              <p className="description">{category.description}</p>
              <Link
                key={category.slug}
                to={`/reviews/category/${category.slug}`}
                className="single-category"
              >
                <button>View this category's reviews!</button>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}
