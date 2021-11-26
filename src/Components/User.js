import { useParams } from "react-router";
import { getUser } from "../Utils/api";
import { useEffect, useState } from "react";

export default function User() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser(username)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [username]);

  if (isLoading) {
    return <p className="loading">...loading</p>;
  }

  return (
    <main>
      <h2>{user.username}</h2>
      <section>
        <div className="cards" id="single-user-cards">
          <img className="image" src={user.avatar_url} alt={user.username} />
          <p className="name">{user.name}</p>
          {isError ? <p>Oops, username not found.</p> : null}
        </div>
      </section>
    </main>
  );
}
