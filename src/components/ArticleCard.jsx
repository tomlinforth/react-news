import React from "react";
import { Link } from "@reach/router";

export default function ArticleCard(props) {
  return (
    <Link to={`/articles/${props.article.article_id}`}>
      <li>{props.article.title}</li>
    </Link>
  );
}
