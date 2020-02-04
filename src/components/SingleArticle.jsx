import React, { Component } from "react";
import * as api from "../api";
import { Router, Link } from "@reach/router";
import ArticleComments from "./ArticleComments";

export default class SingleArticle extends Component {
  state = {
    article: {}
  };
  render() {
    return (
      <section>
        {Object.keys(this.state.article).map(articleKey => {
          if (articleKey === "comment_count") {
            return (
              <section key={articleKey}>
                <Link to={`/articles/${this.props.article_id}/comments`}>
                  {articleKey}
                </Link>
                : {this.state.article[articleKey]}
                <Router>
                  <ArticleComments path="/comments" />
                </Router>
              </section>
            );
          } else
            return (
              <p key={articleKey}>
                {articleKey} : {this.state.article[articleKey]}
              </p>
            );
        })}
      </section>
    );
  }
  componentDidMount() {
    api.getArticleById(this.props.article_id).then(article => {
      this.setState({ article });
    });
  }
}
