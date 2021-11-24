import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <h2>Home</h2>
      <section id="welcome">
        <h3>
          Welcome to Proclaim Your Game - a fantastic forum harbouring a range
          of reviews for games genres.
        </h3>
        <p>
          Search up our classic categories, read reviews about a family
          favourite, leave comments about that new board-on-the-block, and so
          much more!
        </p>
        <Link to={`/reviews`} className="all-reviews">
          <button>See all reviews!</button>
        </Link>
        <Link to={`/categories`} className="categories">
          <button>See all categories!</button>
        </Link>
      </section>
    </main>
  );
}
