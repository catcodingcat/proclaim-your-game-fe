import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <h2>Home</h2>
      <section id="welcome">
        <div className="cards" id="home-card">
          <h3>
            Welcome to Proclaim Your Game - a fantastic forum harbouring a range
            of reviews for games genres.
          </h3>
          <p id="temporary-review-message">
            Hello lovely NC reviewers! Please note that when nchelp is back open
            I am hoping to sort the following issues: 1) Queries re-rendering
            when selected; 2) User login (extra); 3) Comments centres
            (display:block seems to not enjoy it) and votes and delete button
            within comment moved around (not obeying my grid sad times); 4)
            Comment box input to be aligned at the top (currently starts typing
            from middle). Hopefully you enjoy the rest of my site! Thanks you
            lovely lot!
          </p>
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
        </div>
      </section>
    </main>
  );
}
