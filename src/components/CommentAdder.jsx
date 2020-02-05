import React, { Component } from "react";

export default class CommentAdder extends Component {
  state = {
    commentInput: "Enter your comment here."
  };
  render() {
    return this.props.user ? (
      <section className="commentAdder">
        <form onSubmit={this.handleSubmit}>
          {this.props.user} :{" "}
          <textarea
            id="commentInput"
            value={this.state.commentInput}
            onChange={this.validateInput}
            onClick={this.removeDefaultText}
          />
          <button>Add comment.</button>
        </form>
      </section>
    ) : (
      <p>You must be logged in to add a comment!</p>
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
  };
}
