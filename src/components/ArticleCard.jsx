import React from "react";
import { Link } from "@reach/router";
import VotingBtns from "./VotingBtns";

const dateReg = /\d{4}-\d{2}-\d{2}/;
export default function ArticleCard(props) {
  return (
    <li className="articleCard">
      <section className="articleCardText">
        <Link to={`/articles/${props.article.article_id}`}>
          <p>{props.article.title}</p>
        </Link>
        <p></p>
        <p></p>
        <p>
          <i>
            Written by {props.article.author} <br />
            {props.article.comment_count} comments <br />
            Created on{" "}
            {props.article.created_at
              .match(dateReg)[0]
              .split("-")
              .reverse()
              .join("-")}
          </i>
        </p>
      </section>
      <VotingBtns
        user={props.user}
        votes={props.article.votes}
        article_id={props.article.article_id}
      />
    </li>
  );
}
