import { patchVotes } from "../Utils/api";
import { useState, useContext } from "react";
import { UserContext } from "../Context/user";

export default function AmendVotes({ id, votes, type, author }) {
  const [addedVotes, setAddedVotes] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isPlusDisabled, setIsPlusDisabled] = useState(false);
  const [isMinusDisabled, setIsMinusDisabled] = useState(false);
  const { user } = useContext(UserContext);

  const handleVoteClick = (e) => {
    e.preventDefault();
    const vote = parseInt(e.target.value);
    setAddedVotes((prevVotes) => prevVotes + vote);
    e.target.value === "1" ? setIsPlusDisabled(true) : setIsMinusDisabled(true);
    patchVotes(id, vote, type).catch(() => {
      setIsError(true);
      setAddedVotes((prevVotes) => prevVotes - vote);
      e.target.value === "1"
        ? setIsPlusDisabled(false)
        : setIsMinusDisabled(false);
    });
  };

  return (
    <>
      <p className="vote-count">Votes: {votes + addedVotes}</p>
      {author !== user.username ? (
        !isPlusDisabled ? (
          <button value="1" onClick={handleVoteClick} className="add-vote">
            +1
          </button>
        ) : (
          <button disabled value="1" className="add-vote-disabled">
            +1
          </button>
        )
      ) : null}
      {author !== user.username ? (
        !isMinusDisabled ? (
          <button value="-1" onClick={handleVoteClick} className="minus-vote">
            -1
          </button>
        ) : (
          <button disabled value="-1" className="minus-vote-disabled">
            -1
          </button>
        )
      ) : null}
      {isError ? <p>Oops, something went wrong.</p> : null}
    </>
  );
}
