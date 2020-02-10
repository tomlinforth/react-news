import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import { getUserByUsername } from "./api";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import AllArticles from "./components/AllArticles";
import SingleArticle from "./components/SingleArticle";
import SingleTopic from "./components/SingleTopic";
import HomePage from "./components/HomePage";
import LoggedUserInfo from "./components/LoggedUserInfo";
import ErrorPage from "./components/ErrorPage";

class App extends Component {
  state = { loggedUser: null, loggedUserImg: null, error: null };
  render() {
    if (this.state.error) return <ErrorPage error={this.state.error} />;
    return (
      <div className="App">
        <section className="topOfPage">
          <LoggedUserInfo
            loggedUser={this.state.loggedUser}
            loggedUserImg={this.state.loggedUserImg}
            handleLogin={this.handleLoginLogout}
          />
          <Header user={this.state.loggedUser} className="header" />
          <NavBar />
        </section>
        <Router className="mainContent">
          <HomePage
            path="/"
            user={this.state.loggedUser}
            handleLogin={this.handleLoginLogout}
          />
          <AllArticles path="/articles" user={this.state.loggedUser} />
          <SingleArticle
            path="/articles/:article_id/*"
            user={this.state.loggedUser}
          />
          <SingleTopic
            path="/topics/:topic_slug"
            user={this.state.loggedUser}
          />
        </Router>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ loggedUser: localStorage.getItem("loggedUser") });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.loggedUser !== this.state.loggedUser &&
      this.state.loggedUser
    ) {
      getUserByUsername(this.state.loggedUser)
        .then(user => {
          this.setState({ loggedUserImg: user.avatar_url });
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  }
  handleLoginLogout = event => {
    const { value } = event.target;
    this.setState({ loggedUser: value });
    localStorage.setItem("loggedUser", value);
  };
}
export default App;
