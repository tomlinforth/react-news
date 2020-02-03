import React, { Component } from "react";
import * as api from "../api";
import { navigate } from "@reach/router";

export default class TopicSelect extends Component {
  state = {
    topicList: []
  };
  render() {
    return (
      <select name="topicSelect" id="topicNav" onClick={this.handleClick}>
        <option value="notChose">Select a topic</option>
        {this.state.topicList.map(topic => {
          return (
            <option key={topic.slug} value={topic.slug}>
              {topic.slug}
            </option>
          );
        })}
      </select>
    );
  }
  componentDidMount() {
    api.getTopics().then(topics => {
      this.setState({ topicList: topics });
    });
  }
  handleClick = event => {
    if (event.target.value !== "notChose") {
      navigate(`/topics/${event.target.value}`);
    }
  };
}
