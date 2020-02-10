import React, { Component } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";
import SortArticleBar from "./SortArticleBar";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";

export default class AllArticles extends Component {
  state = {
    articles: [],
    total_articles: 0,
    curPage: 1,
    article_count: 0,
    sortQuery: { sortBy: null, order: null },
    isLoading: true,
    error: null
  };

  render() {
    if (this.state.error) return <ErrorPage error={this.state.error} />;
    return (
      <section className="articlesPage">
        <br />
        <SortArticleBar changeQuery={this.changeSortQuery} />
        <br />
        <br />
        <button onClick={this.prevPage}>{"<"} </button>
        <button onClick={this.nextPage}>{">"}</button>
        {this.state.isLoading ? (
          <Loading />
        ) : (
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
        )}
        <button onClick={this.prevPage}>{"<"} </button>
        <button onClick={this.nextPage}>{">"}</button>
      </section>
    );
  }

  componentDidMount() {
    this.fetchArticles({
      page: this.state.curPage,
      topic: this.props.topic,
      ...this.state.sortQuery
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.sortQuery.sortBy !== this.state.sortQuery.sortBy ||
      prevState.sortQuery.order !== this.state.sortQuery.order
    ) {
      this.fetchArticles(
        {
          page: this.state.curPage,
          topic: this.props.topic,
          ...this.state.sortQuery
        },
        { update: true }
      );
    } else if (prevProps.topic !== this.props.topic) {
      this.fetchArticles({
        page: this.state.curPage,
        topic: this.props.topic,
        ...this.state.sortQuery
      });
    }
  }

  nextPage = () => {
    if (this.state.article_count < this.state.total_articles) {
      this.setState({ isLoading: true });
      this.fetchArticles(
        {
          page: this.state.curPage + 1,
          topic: this.props.topic,
          ...this.state.sortQuery
        },
        { inc: true }
      );
    }
  };

  prevPage = () => {
    if (this.state.curPage > 1) {
      this.setState({ isLoading: true });
      this.fetchArticles(
        {
          page: this.state.curPage - 1,
          topic: this.props.topic,
          ...this.state.sortQuery
        },
        { dec: true }
      );
    }
  };

  fetchArticles = (query, options) => {
    if (options) {
      options.inc &&
        api
          .getArticles(query)
          .then(({ articles }) => {
            this.setState(curState => {
              return {
                articles,
                curPage: curState.curPage + 1,
                article_count: curState.article_count + articles.length,
                isLoading: false
              };
            });
          })
          .catch(error => {
            this.setState({ error, isLoading: false });
          });

      options.dec &&
        api
          .getArticles(query)
          .then(({ articles }) => {
            this.setState(curState => {
              return {
                articles,
                curPage: curState.curPage - 1,
                article_count:
                  curState.article_count - curState.articles.length,
                isLoading: false
              };
            });
          })
          .catch(error => {
            this.setState({ error, isLoading: false });
          });

      options.update &&
        api
          .getArticles(query)
          .then(({ articles }) => {
            this.setState({
              articles,
              isLoading: false
            });
          })
          .catch(error => {
            this.setState({ error, isLoading: false });
          });
    } else {
      api
        .getArticles(query)
        .then(({ articles, total_articles }) => {
          this.setState({
            articles,
            total_articles,
            article_count: articles.length,
            isLoading: false
          });
        })
        .catch(error => {
          this.setState({ error, isLoading: false });
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
      this.setState({ sortQuery: query, isLoading: true });
    } else {
      this.setState({
        sortQuery: { sortBy: null, order: null },
        isLoading: true
      });
    }
  };
}
