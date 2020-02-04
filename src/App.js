import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import AllArticles from "./components/AllArticles";
import SingleArticle from "./components/SingleArticle";
import SingleTopic from "./components/SingleTopic";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Router>
        <AllArticles path="/articles" />
        <SingleArticle path="/articles/:article_id/*" />
        <SingleTopic path="/topics/:topic_slug" />
      </Router>
    </div>
  );
}

export default App;
