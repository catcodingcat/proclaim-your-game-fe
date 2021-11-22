import { getCategories } from "../Utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <main>
      <h2>All Categories</h2>
      <section id="category-section">
        {categories.map((category) => {
          return (
            <div className="cards">
              <Link
                to={`/categories/${category.category_id}`}
                className="single-category"
              >
                <h3>{category.slug}</h3>
                <p className="description">{category.description}</p>
                <button>View this category's reviews!</button>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}
