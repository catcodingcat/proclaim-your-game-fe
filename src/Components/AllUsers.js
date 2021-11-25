import { getUsers } from "../Utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((users) => {
        setUsers(users);
        setIsLoading(false);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>...loading</p>;
  }

  return (
    <main>
      <h2>All Users</h2>
      <section id="user-section">
        {users.map((user) => {
          return (
            <div key={user.username} className="cards" id="user-cards">
              <Link to={`/users/${user.username}`} className="single-user">
                <h3>{user.username}</h3>
                <button>View User!</button>
              </Link>
            </div>
          );
        })}
        {isError ? <p>Oops, something went wrong!</p> : null}
      </section>
    </main>
  );
}
