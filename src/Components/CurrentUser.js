import { UserContext } from "../Context/user";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function CurrentUser() {
  const { user, setUser } = useContext(UserContext);

  const handleLogOut = (e) => {
    e.preventDefault();
    setUser({});
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    setUser({
      username: "cooljmessy",
      name: "Peter Messy",
      avatar_url:
        "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
    });
  };

  if (user.username) {
    return (
      <section className="login-area" id="current-user">
        <Link to={`/users/${user.username}`} className="current-user-link">
          <p>{user.username}</p>
          <img id="user-avatar" src={user.avatar_url} alt={user.username} />
        </Link>
        <button onClick={handleLogOut}>Log out</button>
      </section>
    );
  } else {
    return (
      <section className="login-area" id="login">
        <button onClick={handleLogIn}>Login</button>
      </section>
    );
  }
}
