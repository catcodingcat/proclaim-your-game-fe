import { useParams } from "react-router";
import { getUser } from "../Utils/api";
import { useEffect, useState } from "react";

export default function User() {
  const { username } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser(username).then((user) => {
      setUser(user);
    });
  }, [username]);

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
