import React, { Component } from "react";
import * as api from "../api";
import ArticleComments from "./ArticleComments";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

export default class SingleArticle extends Component {
  state = {
    article: {},
    showComment: false,
    isLoading: true,
    error: null
  };
  render() {
    if (this.state.isLoading) return <Loading />;
    if (this.state.error) return <ErrorPage error={this.state.error} />;
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
        {this.state.showComment && (
          <ArticleComments
            path="/comments"
            user={this.props.user}
            total_comments={this.state.article.comment_count}
            updateCommentTotal={this.updateCommentCount}
            article_id={this.props.article_id}
          />
        )}
      </section>
    );
  }
  componentDidMount() {
    api
      .getArticleById(this.props.article_id)
      .then(article => {
        this.setState({ article, isLoading: false });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  }

  showHideComments = () => {
    this.setState(curState => {
      return { showComment: !curState.showComment };
    });
  };

  updateCommentCount = commentNum => {
    this.setState(curState => {
      return {
        article: {
          ...curState.article,
          comment_count: curState.article.comment_count + commentNum
        }
      };
    });
  };
}
