import React from "react";
import VotingBtns from "./VotingBtns";

export default function CommentCard(props) {
  return (
    <section className="commentAndVotes">
      <li className="commentCard">
        <b>{props.comment.author} : </b> {props.comment.body}
      </li>{" "}
      <VotingBtns
        user={props.user}
        comment_id={props.comment.comment_id}
        votes={props.comment.votes}
      />
      {props.user === props.comment.author && (
        <button
          id={props.comment.comment_id}
          onClick={props.handleClick}
          className="commentDelBtn"
        >
          Delete comment
        </button>
      )}
    </section>
  );
}
