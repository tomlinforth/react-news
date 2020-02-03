import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";

export default class AllArticles extends Component {
  state = {
    articles: [],
    curPage: 1
  };
  render() {
    return (
      <section name="articlesPage">
        <ul>
          {this.state.articles.map(article => {
            return <ArticleCard article={article} key={article.article_id} />;
          })}
        </ul>
        <button onClick={this.prevPage}>{"<"} </button>
        <button onClick={this.nextPage}>{">"}</button>
      </section>
    );
  }

  componentDidMount() {
    api.getArticles().then(articles => {
      this.setState({ articles });
    });
  }

  nextPage = () => {
    api.getArticles(this.state.curPage + 1).then(articles => {
      this.setState(curState => {
        return { articles, curPage: curState.curPage + 1 };
      });
    });
  };

  prevPage = () => {
    if (this.state.curPage > 1) {
      api.getArticles(this.state.curPage - 1).then(articles => {
        this.setState(curState => {
          return { articles, curPage: curState.curPage - 1 };
        });
      });
    }
  };
}
