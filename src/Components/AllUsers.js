import { getUsers } from "../Utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getUsers()
      .then((users) => {
        setUsers(users);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMsg(err.response.data.msg);
      });
  }, []);

  if (isLoading) return <p className="loading">...loading</p>;
  if (isError) return <p className="error">{errorMsg}</p>;

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
      </section>
    </main>
  );
}
