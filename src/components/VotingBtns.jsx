import React, { Component } from "react";
import * as api from "../api";

export default class VotingBtns extends Component {
  state = { votes: 0, upvoteClicked: false, downvoteClicked: false };
  render() {
    return (
      <section className="votingSection">
        <button
          disabled={!this.props.user || this.state.downvoteClicked === true}
          value="1"
          onClick={this.handleUpVoteClick}
        >
          ↑
        </button>
        <p>Votes:{this.state.votes}</p>
        <button
          disabled={!this.props.user || this.state.upvoteClicked === true}
          value="-1"
          onClick={this.handleDownVoteClick}
        >
          ↓
        </button>
      </section>
    );
  }

  componentDidMount() {
    this.setState({ votes: this.props.votes });
  }

  handleUpVoteClick = event => {
    let voteVal = Number(event.target.value);

    if (this.state.upvoteClicked) voteVal = -1;
    this.setState(curState => {
      return {
        votes: curState.votes + voteVal,
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
        votes: curState.votes + voteVal,
        downvoteClicked: !curState.downvoteClicked
      };
    });
    this.updateVotes(voteVal);
  };

  updateVotes = vote => {
    if (this.props.article_id) {
      api.updateVoteOnArticle(this.props.article_id, vote);
    } else if (this.props.comment_id) {
      api.updateVoteOnComment(this.props.comment_id, vote);
    }
  };
}
