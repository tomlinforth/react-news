import React, { Component } from "react";
import * as api from "../api";
import { Router, navigate } from "@reach/router";
import ArticleComments from "./ArticleComments";
import Loading from "./Loading";

export default class SingleArticle extends Component {
  state = {
    article: {},
    showComment: false
  };
  render() {
    if (!this.state.article.title) return <Loading />;
    return (
      <section className="singleArticlePage">
        <h4>{this.state.article.title}</h4>
        <p>{this.state.article.body}</p>
        <p>
          <i>Written by {this.state.article.author}</i>
        </p>
        <button onClick={this.showHideComments}>
          {this.state.showComment
            ? "Hide comments"
            : `Show comments (${this.state.article.comment_count})`}
        </button>
        <Router>
          <ArticleComments
            path="/comments"
            user={this.props.user}
            total_comments={this.state.article.comment_count}
            getCommentTotal={this.getCommentCount}
            trueOnMount={this.setTrueOnCommentsMount}
          />
        </Router>
      </section>
    );
  }
  componentDidMount() {
    api.getArticleById(this.props.article_id).then(article => {
      this.setState({ article });
    });
  }

  showHideComments = () => {
    this.setState(curState => {
      if (curState.showComment) {
        navigate(`/articles/${this.props.article_id}`);
      } else {
        navigate(`/articles/${this.props.article_id}/comments`);
      }
      return { showComment: !curState.showComment };
    });
  };

  getCommentCount = () => {
    return api.getArticleById(this.props.article_id).then(article => {
      return article.comment_count;
    });
  };

  setTrueOnCommentsMount = () => {
    this.setState({ showComment: true });
  };
}
