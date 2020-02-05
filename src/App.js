import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import AllArticles from "./components/AllArticles";
import SingleArticle from "./components/SingleArticle";
import SingleTopic from "./components/SingleTopic";

class App extends Component {
  state = { loggedUser: null };
  render() {
    return (
      <div className="App">
        <button value={this.state.loggedUser} onClick={this.handleLoginLogout}>
          {this.state.loggedUser ? "Logout" : "Login"}
        </button>
        <Header user={this.state.loggedUser} />
        <NavBar />
        <Router>
          <AllArticles path="/articles" />
          <SingleArticle
            path="/articles/:article_id/*"
            user={this.state.loggedUser}
          />
          <SingleTopic path="/topics/:topic_slug" />
        </Router>
      </div>
    );
  }

  handleLoginLogout = event => {
    const { value } = event.target;
    !value
      ? this.setState({ loggedUser: "grumpy19" })
      : this.setState({ loggedUser: null });
  };
}
export default App;
