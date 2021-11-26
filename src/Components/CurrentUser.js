import { UserContext } from "../Context/user";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import { getUser } from "../Utils/api";

export default function CurrentUser() {
  const { user, setUser } = useContext(UserContext);
  const [loginForm, setLoginForm] = useState("");
  const [username, setUsername] = useState("original state");
  const [isError, setIsError] = useState(false);

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

  // const handleSubmit = (e) => {
  //   console.log(username, "<<<username in handle");
  //   // e.preventDefault();
  //   // console.log(e.target.value, "<<<username");
  //   // return getUser(username)
  //   //   .then((user) => {
  //   //     setUser(user);
  //   //     setIsError(false);
  //   //   })
  //   //   .catch(() => setIsError(true));
  // };

  const login = () => {
    return (
      <form>
        <fieldset>
          <label htmlFor="username-login"></label>
          Username:
          <input
            type="text"
            value={user.username}
            name="username"
            id="username"
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </fieldset>
        <button onClick={handleLogIn} type="submit">
          Login
        </button>
        {isError ? (
          <p>Sorry, that username doesn't exist. Please try again.</p>
        ) : null}
      </form>
    );
  };

  //////WHY DOES IT SET OUTSIDE BUT IN HANDLESUBMIT OR HANDLECLICK IT'S BACK TO ORIGINAL STATE?
  console.log(username, "<<username outside");

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
        <button className="login-button" onClick={handleLogOut}>
          Log out
        </button>
      </section>
    );
  } else {
    return (
      <section className="login-area" id="login">
        <button className="login-button" onClick={() => setLoginForm(login)}>
          Login
        </button>
        <div>{loginForm}</div>
      </section>
    );
  }
}
