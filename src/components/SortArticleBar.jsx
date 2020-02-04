import React from "react";

export default function SortArticleBar(props) {
  return (
    <select name="articleSort" onChange={props.changeQuery}>
      <option value="default">Most recent</option>
      <option value="order=asc">Oldest first</option>
      <option value="sortBy=comment_count">Most commented</option>
      <option value="sortBy=comment_count=order=asc">Least commented</option>
      <option value="sortBy=votes">Most popular</option>
      <option value="sortBy=votes=order=asc">Least popular</option>
    </select>
  );
}
