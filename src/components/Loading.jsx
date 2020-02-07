import React from "react";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <section className="loadingElement">
      <ReactLoading type="bubbles" color="black" className="loadingBubbles" />
    </section>
  );
}
