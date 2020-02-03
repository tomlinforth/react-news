import axios from "axios";

export const getTopics = () => {
  return axios
    .get("https://toms-news-api.herokuapp.com/api/topics")
    .then(({ data }) => {
      return data.topics;
    });
};

export const getArticles = page => {
  return axios
    .get("https://toms-news-api.herokuapp.com/api/articles", {
      params: { p: page }
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticleById = id => {
  return axios
    .get(`https://toms-news-api.herokuapp.com/api/articles/${id}`)
    .then(({ data }) => {
      return data.article;
    });
};
