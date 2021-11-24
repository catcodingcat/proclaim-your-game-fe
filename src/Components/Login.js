import { UserContext } from "../Context/user";
import { useContext, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    /////check login details with api
    setUser({ username });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </label>
      <button>Login</button>
    </form>
  );
}
