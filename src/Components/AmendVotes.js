import { patchVotes } from "../Utils/api";
import { useState, useContext } from "react";
import { UserContext } from "../Context/user";

export default function AmendVotes({ id, votes, type, author }) {
  const [addedVotes, setAddedVotes] = useState(0);
  const [isError, setIsError] = useState(false);
  const { user } = useContext(UserContext);
  const isDisabled = author === user.username;

  const handleVoteClick = (e) => {
    e.preventDefault();
    const vote = parseInt(e.target.value);
    setAddedVotes((prevVotes) => prevVotes + vote);
    ///set error is false in a .then?
    //do I need a .catch in optimistic rendering?
    patchVotes(id, vote, type).catch(() => {
      setIsError(true);
      setAddedVotes((prevVotes) => prevVotes - vote);
    });
  };

  return (
    <>
      <p>Votes: {votes + addedVotes}</p>
      <button
        value="1"
        onClick={handleVoteClick}
        className="votes-button"
        disabled={isDisabled}
      >
        +1
      </button>
      <button
        value="-1"
        onClick={handleVoteClick}
        className="votes-button"
        disabled={isDisabled}
      >
        -1
      </button>
      {isError ? <p>Oops, something went wrong.</p> : null}
    </>
  );
}
