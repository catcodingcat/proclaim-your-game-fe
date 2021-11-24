import { patchVotes } from "../Utils/api";
import { useState, useContext } from "react";
// import { UserContext } from "../Context/user";

export default function AmendVotes({ id, votes, type }) {
  const [addedVotes, setAddedVotes] = useState(0);
  const [isError, setIsError] = useState(false);
  // const { currentUser } = useContext(UserContext);

  const handleVoteClick = (e) => {
    e.preventDefault();
    const vote = parseInt(e.target.value);
    setAddedVotes((prevVotes) => prevVotes + vote);
    patchVotes(id, vote, type).catch(() => {
      setIsError(true);
      setAddedVotes((prevVotes) => prevVotes - vote);
    });
  };

  // const isDisabled = username === currentUser.username;

  return (
    <>
      <p>Votes: {votes + addedVotes}</p>
      <button
        value="1"
        onClick={handleVoteClick}
        className="votes-button"
        // disabled={isDisabled}
      >
        +1
      </button>
      <button
        value="-1"
        onClick={handleVoteClick}
        className="votes-button"
        // disabled={isDisabled}
      >
        -1
      </button>
      {isError ? <p>Oops, something went wrong.</p> : null}
    </>
  );
}
