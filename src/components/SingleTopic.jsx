import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";

export default class SingleTopic extends Component {
  state = {
    topic_articles: [],
    total_articles: 0,
    curPage: 1,
    article_count: 0
  };
  render() {
    return (
      <section className="topicList">
        <h2>Topic : {this.props.topic_slug}</h2>
        <ul className="topicArticleList">
          {this.state.topic_articles.map(article => {
            return (
              <ArticleCard
                article={article}
                key={article.article_id}
                user={this.props.user}
              />
            );
          })}
        </ul>
        <button onClick={this.prevPage}>{"<"} </button>
        <button onClick={this.nextPage}>{">"}</button>
      </section>
    );
  }
  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic_slug !== this.props.topic_slug) {
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    api
      .getArticles({ topic: this.props.topic_slug })
      .then(({ articles, total_articles }) => {
        this.setState({
          topic_articles: articles,
          total_articles,
          article_count: articles.length,
          curPage: 1
        });
      });
  };

  nextPage = () => {
    if (this.state.article_count < this.state.total_articles) {
      api
        .getArticles({
          page: this.state.curPage + 1,
          topic: this.props.topic_slug
        })
        .then(({ articles }) => {
          this.setState(curState => {
            return {
              topic_articles: articles,
              curPage: curState.curPage + 1,
              article_count: curState.article_count + articles.length
            };
          });
        });
    }
  };

  prevPage = () => {
    if (this.state.curPage > 1) {
      api
        .getArticles({
          page: this.state.curPage - 1,
          topic: this.props.topic_slug
        })
        .then(({ articles }) => {
          this.setState(curState => {
            return {
              topic_articles: articles,
              curPage: curState.curPage - 1,
              article_count: curState.article_count - articles.length
            };
          });
        });
    }
  };
}
