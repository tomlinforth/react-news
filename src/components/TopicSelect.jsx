import React, { Component } from "react";
import * as api from "../api";
import { navigate } from "@reach/router";
import ErrorPage from "./ErrorPage";

export default class TopicSelect extends Component {
  state = {
    topicList: [],
    curOption: "Select a topic",
    error: null
  };
  render() {
    if (this.state.error) return <ErrorPage error={this.state.error} />;
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
    api
      .getTopics()
      .then(topics => {
        this.setState({ topicList: topics });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  componentDidUpdate() {
    if (this.props.setDefault) {
      this.setState({ curOption: "Select a topic" });
      this.props.resetDefault();
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
