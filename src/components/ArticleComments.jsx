import React, { Component } from "react";
import * as api from "../api";
import CommentAdder from "./CommentAdder";

export default class ArticleComments extends Component {
  state = {
    comments: [],
    comment_count: 0
  };
  render() {
    return (
      <section className="articleComments">
        <br />
        <CommentAdder user={this.props.user} />
        <ul>
          {this.state.comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                {comment.author} : {comment.body}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  componentDidMount() {
    api.getCommentsForArticle(this.props.article_id).then(comments => {
      this.setState({ comments });
    });
  }
}
