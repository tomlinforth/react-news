import React, { Component } from "react";
import * as api from "../api";
import ErrorPage from "./ErrorPage";

export default class VotingBtns extends Component {
  state = {
    votes: 0,
    upvoteClicked: false,
    downvoteClicked: false,
    error: null
  };
  render() {
    if (this.state.error) return <ErrorPage error={this.state.error} />;
    return (
      <section className="votingSection">
        <section className="votingBtns">
          <button
            disabled={!this.props.user || this.state.downvoteClicked === true}
            value="1"
            onClick={this.handleUpVoteClick}
            className={this.state.upvoteClicked ? "upvoteClicked" : "voteBtn"}
          >
            ↑
          </button>
          <button
            disabled={!this.props.user || this.state.upvoteClicked === true}
            value="-1"
            onClick={this.handleDownVoteClick}
            className={
              this.state.downvoteClicked ? "downvoteClicked" : "voteBtn"
            }
          >
            ↓
          </button>
        </section>
        <p>
          Votes:
          {this.props.votes +
            (this.state.upvoteClicked ? 1 : this.state.downvoteClicked && -1)}
        </p>
      </section>
    );
  }

  handleUpVoteClick = event => {
    let voteVal = Number(event.target.value);

    if (this.state.upvoteClicked) voteVal = -1;
    this.setState(curState => {
      return {
        upvoteClicked: !curState.upvoteClicked
      };
    });

    this.updateVotes(voteVal);
  };

  handleDownVoteClick = event => {
    let voteVal = Number(event.target.value);

    if (this.state.downvoteClicked) voteVal = 1;
    this.setState(curState => {
      return {
        downvoteClicked: !curState.downvoteClicked
      };
    });
    this.updateVotes(voteVal);
  };

  updateVotes = vote => {
    if (this.props.article_id) {
      api.updateVoteOnArticle(this.props.article_id, vote).catch(error => {
        this.setState({ error });
      });
    } else if (this.props.comment_id) {
      api.updateVoteOnComment(this.props.comment_id, vote).catch(error => {
        this.setState({ error });
      });
    }
  };
}
