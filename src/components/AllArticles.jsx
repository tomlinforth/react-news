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
    sortQuery: { sortBy: null, order: null },
    isLoading: true,
    error: null
  };

  render() {
    if (this.state.error) return <ErrorPage error={this.state.error} />;
    return (
      <section className="articlesPage">
        <SortArticleBar changeQuery={this.changeSortQuery} />
        <br />
        <button onClick={this.changePage} className="customBtn" value={-1}>
          {"<"}{" "}
        </button>
        <button onClick={this.changePage} className="customBtn" value={1}>
          {">"}
        </button>
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
        <button onClick={this.changePage} className="customBtn" value={-1}>
          {"<"}{" "}
        </button>
        <button onClick={this.changePage} className="customBtn" value={1}>
          {">"}
        </button>
      </section>
    );
  }

  componentDidMount() {
    this.fetchArticles({
      page: this.state.curPage,
      topic: this.props.topic,
      author: this.props.author,
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
          author: this.props.author,
          ...this.state.sortQuery
        },
        { update: true }
      );
    } else if (prevProps.topic !== this.props.topic) {
      this.fetchArticles({
        page: this.state.curPage,
        topic: this.props.topic,
        author: this.props.author,
        ...this.state.sortQuery
      });
    }
  }

  changePage = event => {
    let pageToChangeTo = this.state.curPage + Number(event.target.value);
    let changeBy = Number(event.target.value);
    if (this.state.curPage === 1 && event.target.value === "-1") {
      pageToChangeTo = this.state.curPage;
      changeBy = 0;
    } else if (
      this.state.curPage === Math.ceil(this.state.total_articles / 10) &&
      event.target.value === "1"
    ) {
      pageToChangeTo = this.state.curPage;
      changeBy = 0;
    }

    this.setState({ isLoading: true });
    this.fetchArticles(
      {
        page: pageToChangeTo,
        topic: this.props.topic,
        author: this.props.author,
        changeBy,
        ...this.state.sortQuery
      },
      true
    );
  };

  fetchArticles = (query, update) => {
    if (update) {
      api
        .getArticles(query)
        .then(({ articles }) => {
          this.setState({
            articles,
            curPage: query.page,
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
