import React from "react";
import { Link } from "@reach/router";
import VotingBtns from "./VotingBtns";

export default function ArticleCard(props) {
  return (
    <section className="articleCard">
      <Link to={`/articles/${props.article.article_id}`}>
        <li>{props.article.title}</li>
      </Link>
      <VotingBtns
        user={props.user}
        votes={props.article.votes}
        article_id={props.article.article_id}
      />
    </section>
  );
}
