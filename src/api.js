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

export const getCommentsForArticle = (id, query) => {
  return axios
    .get(`https://toms-news-api.herokuapp.com/api/articles/${id}/comments`, {
      params: { p: query && query.page }
    })
    .then(({ data }) => {
      return data.comments;
    });
};

export const addCommentOnArticle = (id, username, body) => {
  return axios
    .post(`https://toms-news-api.herokuapp.com/api/articles/${id}/comments`, {
      username,
      body
    })
    .then(({ data }) => {
      return data.comment;
    });
};

export const removeCommentById = id => {
  return axios.delete(`https://toms-news-api.herokuapp.com/api/comments/${id}`);
};

export const updateVoteOnArticle = (id, inc_votes) => {
  return axios.patch(`https://toms-news-api.herokuapp.com/api/articles/${id}`, {
    inc_votes
  });
};

export const updateVoteOnComment = (id, inc_votes) => {
  return axios.patch(`https://toms-news-api.herokuapp.com/api/comments/${id}`, {
    inc_votes
  });
};

export const getUsers = () => {
  return axios
    .get("https://toms-news-api.herokuapp.com/api/users")
    .then(({ data }) => {
      return data.users;
    });
};

export const getUserByUsername = username => {
  return axios
    .get(`https://toms-news-api.herokuapp.com/api/users/${username}`)
    .then(({ data }) => {
      return data.user;
    });
};
