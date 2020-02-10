import React from "react";

export default function ErrorPage(props) {
  console.dir(props.error);
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
