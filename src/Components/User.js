import { useParams } from "react-router";
import { getUser } from "../Utils/api";
import { useEffect, useState } from "react";

export default function User() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUser(username).then((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [username]);

  if (isLoading) {
    return <p>...loading</p>;
  }

  return (
    <main>
      <h2>{user.username}</h2>
      <section>
        <div className="card">
          <img className="image" src={user.avatar_url} alt={user.username} />
          <p className="name">{user.name}</p>
        </div>
      </section>
    </main>
  );
}
