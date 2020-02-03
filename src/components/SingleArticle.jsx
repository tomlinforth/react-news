import React, { Component } from "react";
import * as api from "../api";

export default class SingleArticle extends Component {
  state = {
    article: {}
  };
  render() {
    return (
      <section>
        {Object.keys(this.state.article).map(articleKey => {
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
