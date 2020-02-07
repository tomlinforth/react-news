import React, { Component } from "react";
import * as api from "../api";

export default class CommentAdder extends Component {
  state = {
    commentInput: "Enter your comment here."
  };
  render() {
    return this.props.user ? (
      <section className="commentAdder">
        <form onSubmit={this.handleSubmit}>
          <b>{this.props.user} : </b>
          <textarea
            id="commentInput"
            value={this.state.commentInput}
            onChange={this.validateInput}
            onClick={this.removeDefaultText}
          />
          <br />
          {this.state.commentInput === "" && <p>You cant comment nothing!</p>}
          <button type="submit">Add comment.</button>
          )}
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
    const { value } = event.target.children.commentInput;
    if (value !== "Enter your comment here." && value.length > 0) {
      api
        .addCommentOnArticle(
          Number(this.props.article_id),
          this.props.user,
          value
        )
        .then(() => {
          this.props.commentIsAdded();
        })
        .catch(err => console.dir(err));
    } else if (value === "") {
    }
  };
}
