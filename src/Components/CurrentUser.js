import { UserContext } from "../Context/user";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../Utils/api";

export default function CurrentUser() {
  const { user, setUser } = useContext(UserContext);
  const [loginForm, setLoginForm] = useState("");
  const [username, setUsername] = useState("original state");
  const [isError, setIsError] = useState(false);
  const [hideLogin, setHideLogin] = useState(false);
  const [hideUsernameLogin, setHideUsernameLogin] = useState(true);

  const handleLogOut = (e) => {
    e.preventDefault();
    setUser({});
    setHideLogin(false);
    setHideUsernameLogin(true);
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    return getUser(username)
      .then((user) => {
        setUser(user);
        setIsError(false);
      })
      .catch(() => setIsError(true));
  };

  if (user.username) {
    return (
      <section className="login-area" id="current-user">
        <img
          className="login-avatar"
          src={user.avatar_url}
          alt={user.username}
        />
        <Link to={`/users/${user.username}`} className="current-user-link">
          <p className="login-username">{user.username}</p>
        </Link>
        <button className="logout-button" onClick={handleLogOut}>
          Log out
        </button>
      </section>
    );
  } else {
    return (
      <section className="login-area" id="login">
        {!hideUsernameLogin ? (
          <div>
            <form className="username-form">
              <fieldset className="username-login">
                <label id="username-login-label"></label>
                Username:
                <input
                  type="text"
                  value={user.username}
                  name="username"
                  id="username-login-input"
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setIsError(false);
                  }}
                />
              </fieldset>
              <button
                className="username-login-button"
                onClick={handleLogIn}
                type="submit"
              >
                Login
              </button>
              {isError ? (
                <p>Sorry, that username doesn't exist. Please try again.</p>
              ) : null}
            </form>
          </div>
        ) : null}
        {!hideLogin && hideUsernameLogin ? (
          <button
            className="login-button"
            onClick={() => setHideUsernameLogin(false)}
          >
            Login
          </button>
        ) : null}
      </section>
    );
  }
}
