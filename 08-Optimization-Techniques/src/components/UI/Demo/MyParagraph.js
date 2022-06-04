import React from "react";

const MyParagraph = (props) => {
  console.log("마이파라그래프 러닝");
  return <p>{props.children}</p>;
};

export default MyParagraph;
