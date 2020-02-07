import React from "react";
import VotingBtns from "./VotingBtns";

export default function CommentCard(props) {
  return (
    <li>
      {props.comment.author} : {props.comment.body}
      <VotingBtns
        user={props.user}
        comment_id={props.comment.comment_id}
        votes={props.comment.votes}
      />
      <br />
      {props.user === props.comment.author && (
        <button
          id={props.comment.comment_id}
          onClick={props.handleClick}
          className="commentDelBtn"
        >
          Delete comment
        </button>
      )}
    </li>
  );
}
