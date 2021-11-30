import { patchVotes } from "../Utils/api";
import { useState, useContext } from "react";
import { UserContext } from "../Context/user";

export default function AmendVotes({ id, votes, type, author }) {
  const [addedVotes, setAddedVotes] = useState(0);
  const [isError, setIsError] = useState(false);
  const { user } = useContext(UserContext);

  const handleVoteClick = (e) => {
    e.preventDefault();
    const vote = parseInt(e.target.value);
    setAddedVotes((prevVotes) => prevVotes + vote);
    patchVotes(id, vote, type).catch(() => {
      setIsError(true);
      setAddedVotes((prevVotes) => prevVotes - vote);
    });
  };

  return (
    <>
      <p className="vote-count">Votes: {votes + addedVotes}</p>
      {author !== user.username ? (
        <button value="1" onClick={handleVoteClick} className="add-vote">
          +1
        </button>
      ) : null}
      {author !== user.username ? (
        <button value="-1" onClick={handleVoteClick} className="minus-vote">
          -1
        </button>
      ) : null}
      {isError ? <p>Oops, something went wrong.</p> : null}
    </>
  );
}
