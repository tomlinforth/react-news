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

class App extends Component {
  state = { loggedUser: null, loggedUserImg: null };
  render() {
    return (
      <div className="App">
        <LoggedUserInfo
          loggedUser={this.state.loggedUser}
          loggedUserImg={this.state.loggedUserImg}
          handleLogin={this.handleLoginLogout}
          className="logInfo"
        />
        <Header user={this.state.loggedUser} className="header" />
        <NavBar className="nav" />
        <Router className="mainContent">
          <HomePage
            path="/"
            user={this.state.loggedUser}
            handleLogin={this.handleLoginLogout}
            id="homePage"
          />
          <AllArticles
            path="/articles"
            user={this.state.loggedUser}
            className="articlesPage"
          />
          <SingleArticle
            path="/articles/:article_id/*"
            user={this.state.loggedUser}
            className="singleArticlePage"
          />
          <SingleTopic
            path="/topics/:topic_slug"
            user={this.state.loggedUser}
            className="topicList"
          />
        </Router>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.loggedUser !== this.state.loggedUser &&
      this.state.loggedUser
    ) {
      getUserByUsername(this.state.loggedUser).then(user => {
        this.setState({ loggedUserImg: user.avatar_url });
      });
    }
  }
  handleLoginLogout = event => {
    const { value } = event.target;
    this.setState({ loggedUser: value });
  };
}
export default App;
