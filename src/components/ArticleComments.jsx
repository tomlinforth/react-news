import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import CommentAdder from "./CommentAdder";
import CommentCard from "./CommentCard";

export default class ArticleComments extends Component {
  state = {
    comments: [],
    total_comments: 0,
    comment_count: 0,
    curPage: 1
  };
  render() {
    return (
      <section className="articleComments">
        <br />
        <CommentAdder
          user={this.props.user}
          article_id={this.props.article_id}
          commentIsAdded={this.commentIsAdded}
        />
        <ul>
          {this.state.comments.map(comment => {
            return (
              <CommentCard
                user={this.props.user}
                comment={comment}
                key={comment.comment_id}
                handleClick={this.handleDeleteClick}
              />
            );
          })}
        </ul>
        {this.state.comment_count < this.state.total_comments ? (
          <Link
            to={`/articles/${this.props.article_id}/comments`}
            onClick={this.loadNextPage}
          >
            Show more comments
          </Link>
        ) : (
          this.state.curPage > 1 && (
            <Link
              to={`/articles/${this.props.article_id}/comments`}
              onClick={this.loadFirstPage}
            >
              Show less
            </Link>
          )
        )}
      </section>
    );
  }

  fetchComments = () => {
    api.getCommentsForArticle(this.props.article_id).then(comments => {
      this.setState({
        comments,
        total_comments: this.props.total_comments,
        comment_count: comments.length,
        curPage: 1
      });
    });
  };

  componentDidMount() {
    this.fetchComments();
    if (!this.state.total_comments)
      this.props
        .getCommentTotal()
        .then(total_comments => this.setState({ total_comments }));
    this.props.trueOnMount();
  }

  commentIsAdded = () => {
    this.fetchComments();
  };

  handleDeleteClick = event => {
    api.removeCommentById(event.target.id).then(() => {
      this.fetchComments();
    });
  };

  loadNextPage = () => {
    if (this.state.comment_count < this.state.total_comments)
      api
        .getCommentsForArticle(this.props.article_id, {
          page: this.state.curPage + 1
        })
        .then(comments => {
          this.setState(curState => {
            const commentsCopy = curState.comments.map(({ ...comment }) => {
              return comment;
            });
            commentsCopy.push(...comments);
            return {
              comments: commentsCopy,
              curPage: curState.curPage + 1,
              comment_count: curState.comment_count + comments.length
            };
          });
        });
  };

  loadFirstPage = () => {
    this.fetchComments();
  };
}
