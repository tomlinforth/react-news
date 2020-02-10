import React, { Component } from "react";
import TopicSelect from "./TopicSelect";
import { Link } from "@reach/router";

export default class NavBar extends Component {
  state = {
    setDefault: false
  };
  render() {
    return (
      <nav className="nav">
        <Link to="/">
          <button onClick={this.handleClick} className="customBtn">
            Home
          </button>
        </Link>
        <Link to="/articles">
          <button onClick={this.handleClick} className="customBtn">
            All articles
          </button>
        </Link>
        <TopicSelect
          setDefault={this.state.setDefault}
          resetDefault={this.resetDefault}
        />
      </nav>
    );
  }

  handleClick = () => {
    this.setState({ setDefault: true });
  };

  resetDefault = () => {
    this.setState({ setDefault: false });
  };
}
