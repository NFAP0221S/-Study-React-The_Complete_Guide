import React from "react";
import MyParagraph from "./MyParagraph";

const DemoOutput = (props) => {
  console.log("데모아웃 러닝");
  return <MyParagraph>{props.show ? `This is new!` : ""}</MyParagraph>;
};

export default React.memo(DemoOutput);
