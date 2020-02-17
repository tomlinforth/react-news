import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import CommentAdder from "./CommentAdder";
import CommentCard from "./CommentCard";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

export default class ArticleComments extends Component {
  state = {
    comments: [],
    curPage: 1,
    isLoading: true,
    error: null
  };
  render() {
    if (this.state.isLoading) return <Loading />;
    if (this.state.error) return <ErrorPage error={this.state.error} />;
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
        {this.state.comments.length < this.props.total_comments ? (
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
    api
      .getCommentsForArticle(this.props.article_id)
      .then(comments => {
        this.setState({
          comments,
          curPage: 1,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  };

  componentDidMount() {
    this.fetchComments();
  }

  commentIsAdded = comment => {
    this.setState(curState => {
      this.props.updateCommentTotal(1);
      return { comments: [comment, ...curState.comments] };
    });
  };

  handleDeleteClick = event => {
    api
      .removeCommentById(event.target.id)
      .then(() => {
        this.fetchComments();
        this.props.updateCommentTotal(-1);
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  };

  loadNextPage = () => {
    if (this.state.comments.length < this.props.total_comments)
      this.setState({ isLoading: true });
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
            isLoading: false
          };
        });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  };

  loadFirstPage = () => {
    this.fetchComments();
  };
}
