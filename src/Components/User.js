import { useParams } from "react-router";
import { getUser } from "../Utils/api";
import { useEffect, useState } from "react";

export default function User() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getUser(username)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMsg(err.response.data.msg);
      });
  }, [username]);

  if (isLoading) return <p className="loading">...loading</p>;
  if (isError) return <p className="error">{errorMsg}</p>;

  return (
    <main>
      <h2>{user.username}</h2>
      <section>
        <div id="single-user-card">
          <p className="name">{user.name}</p>
          <img className="image" src={user.avatar_url} alt={user.username} />
        </div>
      </section>
    </main>
  );
}
