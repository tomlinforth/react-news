import React from "react";
import TopicSelect from "./TopicSelect";
import { Link } from "@reach/router";

export default function NavBar() {
  return (
    <nav>
      <Link to="/articles">
        <button>All articles</button>
      </Link>
      <TopicSelect />
    </nav>
  );
}
