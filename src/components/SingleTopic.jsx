import React from "react";
import AllArticles from "./AllArticles";

export default function SingleTopic(props) {
  return (
    <section className="topicList">
      <h2>Topic : {props.topic_slug}</h2>
      <AllArticles topic={props.topic_slug} user={props.user} />
    </section>
  );
}
