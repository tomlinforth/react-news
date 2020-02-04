import React, { Component } from "react";
import TopicSelect from "./TopicSelect";
import { Link } from "@reach/router";

export default class NavBar extends Component {
  state = {
    setDefault: false
  };
  render() {
    return (
      <nav>
        <Link to="/articles">
          <button onClick={this.handleClick}>All articles</button>
        </Link>
        <TopicSelect setDefault={this.state.setDefault} />
      </nav>
    );
  }

  handleClick = () => {
    this.setState({ setDefault: true });
  };
}
