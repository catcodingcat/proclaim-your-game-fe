import { UserContext } from "../Context/user";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  console.log("IN LOGIN");
  const [username, setUsername] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    /////check login details with api
    // setUser({ username });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="username-login"></label>
        Username:
        <input
          type="text"
          value={username}
          name="username"
          id="username"
          required
          onChange={(e) => {
            console.log(e.target.value, "<<<<etarva");
            setUsername(e.target.value);
          }}
        />
      </fieldset>
      <button type="submit">Login</button>
    </form>
  );
}
