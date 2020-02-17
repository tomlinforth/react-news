import React from "react";

export default function ErrorPage(props) {
  const { status } = props.error.response;
  const { msg } = props.error.response.data;
  return (
    <section className="errInfo">
      <p>Uh Oh, an error has occurred!</p>
      <p>Status : {status}</p>
      <p>Error Message : {msg}</p>
    </section>
  );
}
