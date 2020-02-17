import React, { Component } from "react";
import * as api from "../api";
import ErrorPage from "./ErrorPage";

export default class CommentAdder extends Component {
  state = {
    commentInput: "Enter your comment here.",
    error: null
  };
  render() {
    if (this.state.error) return <ErrorPage error={this.state.error} />;
    return this.props.user ? (
      <section className="commentAdder">
        <form onSubmit={this.handleSubmit}>
          <label className="commentAddLabel">
            <i>Enter comment here</i>
            <br />
            <b>{this.props.user} : </b>
            <textarea
              required
              id="commentInput"
              value={this.state.commentInput}
              onChange={this.validateInput}
              onClick={this.removeDefaultText}
            />
          </label>
          <button type="submit">Add comment.</button>
        </form>
      </section>
    ) : (
      <p>You must be logged in to add a comment! </p>
    );
  }
  validateInput = event => {
    this.setState({ commentInput: event.target.value });
  };

  removeDefaultText = event => {
    if (event.target.value === "Enter your comment here.")
      this.setState({ commentInput: "" });
  };

  handleSubmit = event => {
    event.preventDefault();
    const input = this.state.commentInput;
    if (input !== "Enter your comment here.") {
      api
        .addCommentOnArticle(
          Number(this.props.article_id),
          this.props.user,
          input
        )
        .then(comment => {
          this.props.commentIsAdded(comment);
          this.setState({
            commentInput: "Enter your comment here."
          });
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  };
}
