import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="Nav">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/reviews" className="nav-link">
        All Reviews
      </Link>
      <Link to="/categories" className="nav-link">
        All Categories
      </Link>
      <Link to="/users" className="nav-link">
        All Users
      </Link>
    </nav>
  );
}
