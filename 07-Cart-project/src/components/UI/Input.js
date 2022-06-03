// Input.js

import React from "react"; // React.forwardRef 를 사용하기 위해 import

import classes from "./Input.module.css";
// Input 컴포넌트는 React.forwardRef의 인수가 된다.
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
