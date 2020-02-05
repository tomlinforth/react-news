import React from "react";

export default function Header(props) {
  return (
    <header>
      <h1>NC News</h1>
      {props.user && <p>Logged in as {props.user}</p>}
    </header>
  );
}
