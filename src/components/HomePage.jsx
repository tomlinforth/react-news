import React, { Component } from "react";
import * as api from "../api";

export default class HomePage extends Component {
  state = { users: [] };
  render() {
    if (!this.props.user) {
      return (
        <section id="homePage">
          <h3>Login</h3>
          {this.state.users.map(user => {
            return (
              <p key={user.username}>
                <img
                  className="loginAvatar"
                  src={user.avatar_url}
                  alt={`${user.username} profile avatar`}
                />
                <br />
                {user.username}{" "}
                <button value={user.username} onClick={this.props.handleLogin}>
                  Login
                </button>
              </p>
            );
          })}
        </section>
      );
    } else {
      return (
        <section id="homePage">
          <p>You are logged in as: {this.props.user}</p>
          <button value={null} onClick={this.props.handleLogin}>
            Logout
          </button>
        </section>
      );
    }
  }
  componentDidMount() {
    api.getUsers().then(users => {
      this.setState({ users });
    });
  }
}
