import axios from "axios";

export const getTopics = () => {
  return axios
    .get("https://toms-news-api.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data.topics;
    });
};

export const getArticles = query => {
  return axios
    .get("https://toms-news-api.herokuapp.com/api/articles", {
      params: {
        p: query && query.page,
        topic: query && query.topic,
        sort_by: query && query.sortBy,
        order: query && query.order
      }
    })
    .then(({ data }) => {
      return { articles: data.articles, total_articles: data.total_count };
    });
};

export const getArticleById = id => {
  return axios
    .get(`https://toms-news-api.herokuapp.com/api/articles/${id}`)
    .then(({ data }) => {
      return data.article;
    });
};

export const getCommentsForArticle = id => {
  return axios
    .get(`https://toms-news-api.herokuapp.com/api/articles/${id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};
