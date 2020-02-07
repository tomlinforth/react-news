import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import SortArticleBar from "./SortArticleBar";

export default class AllArticles extends Component {
  state = {
    articles: [],
    total_articles: 0,
    curPage: 1,
    article_count: 0,
    sortQuery: { sortBy: null, order: null }
  };

  render() {
    return (
      <section className="articlesPage">
        <br />
        <SortArticleBar changeQuery={this.changeSortQuery} />
        <ul className="allArticlesList">
          {this.state.articles.map(article => {
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
    this.fetchArticles({ page: this.state.curPage, ...this.state.sortQuery });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.sortQuery.sortBy !== this.state.sortQuery.sortBy ||
      prevState.sortQuery.order !== this.state.sortQuery.order
    ) {
      this.fetchArticles(
        { page: this.state.curPage, ...this.state.sortQuery },
        { update: true }
      );
    }
  }

  nextPage = () => {
    if (this.state.article_count < this.state.total_articles) {
      this.fetchArticles(
        { page: this.state.curPage + 1, ...this.state.sortQuery },
        { inc: true }
      );
    }
  };

  prevPage = () => {
    if (this.state.curPage > 1) {
      this.fetchArticles(
        { page: this.state.curPage - 1, ...this.state.sortQuery },
        { dec: true }
      );
    }
  };

  fetchArticles = (query, options) => {
    if (options) {
      options.inc &&
        api.getArticles(query).then(({ articles }) => {
          this.setState(curState => {
            return {
              articles,
              curPage: curState.curPage + 1,
              article_count: curState.article_count + articles.length
            };
          });
        });

      options.dec &&
        api.getArticles(query).then(({ articles }) => {
          this.setState(curState => {
            return {
              articles,
              curPage: curState.curPage - 1,
              article_count: curState.article_count - curState.articles.length
            };
          });
        });

      options.update &&
        api.getArticles(query).then(({ articles }) => {
          this.setState({
            articles
          });
        });
    } else {
      api.getArticles(query).then(({ articles, total_articles }) => {
        this.setState({
          articles,
          total_articles,
          article_count: articles.length
        });
      });
    }
  };

  changeSortQuery = event => {
    if (event.target.value !== "default") {
      const queryArr = event.target.value.split("=");
      const query = {};
      queryArr.forEach((item, index) => {
        if (index % 2 === 0) query[item] = queryArr[index + 1];
      });
      this.setState({ sortQuery: query });
    } else {
      this.setState({ sortQuery: { sortBy: null, order: null } });
    }
  };
}
