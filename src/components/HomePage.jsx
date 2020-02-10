import React, { Component } from "react";
import * as api from "../api";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import AllArticles from "./AllArticles";

export default class HomePage extends Component {
  state = { users: [], isLoading: true, error: null };
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    if (this.state.error) return <ErrorPage error={this.state.error} />;
    if (!this.props.user) {
      return (
        <section className="homePage">
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
                <button
                  value={user.username}
                  onClick={this.props.handleLogin}
                  className="customBtn"
                >
                  Login
                </button>
              </p>
            );
          })}
        </section>
      );
    } else {
      return (
        <section className="homePage">
          <p>You are logged in as: {this.props.user}</p>
          <h3>Your Articles:</h3>
          <AllArticles author={this.props.user} user={this.props.user} />
          <button
            value={null}
            onClick={this.props.handleLogin}
            className="customBtn"
          >
            Logout
          </button>
        </section>
      );
    }
  }
  componentDidMount() {
    api
      .getUsers()
      .then(users => {
        this.setState({ users, isLoading: false });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  }
}
