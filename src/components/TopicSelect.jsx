import React, { Component } from "react";
import * as api from "../api";
import { navigate } from "@reach/router";

export default class TopicSelect extends Component {
  state = {
    topicList: [],
    curOption: "Select a topic"
  };
  render() {
    return (
      <select
        name="topicSelect"
        id="topicNav"
        onChange={this.handleClick}
        value={this.state.curOption}
      >
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

  componentDidUpdate(prevProps) {
    if (prevProps.setDefault !== this.props.setDefault) {
      this.setState({ curOption: "Select a topic" });
    }
  }

  handleClick = event => {
    if (event.target.value !== "notChose") {
      navigate(`/topics/${event.target.value}`);
      this.setState({ curOption: event.target.value });
    } else {
      navigate("/articles");
      this.setState({ curOption: "Select a topic" });
    }
  };
}
