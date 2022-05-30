import React, { useState } from "react";

import Button from "../../UI/Button/Button";
import styles from "./CourseInput.module.css";

// const FormControl = styled.div`
//   margin: 0.5rem 0;

//   & label {
//     font-weight: bold;
//     display: block;
//     margin-bottom: 0.5rem;
//     color: ${(props) => (props.invalid ? "red" : "black")};
//   }

//   & input {
//     display: block;
//     width: 100%;
//     border: 1px solid ${(props) => (props.invalid ? "red" : "#ccc")};
//     background: ${(props) => (props.invalid ? "ffd7d7" : "transparent")};
//     font: inherit;
//     line-height: 1.5rem;
//     padding: 0 0.25rem;
//   }

//   & input:focus {
//     outline: none;
//     background: #fad0ec;
//     border-color: #8b005d;
//   }
// `;

const CourseInput = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const goalInputChangeHandler = (e) => {
    if (e.target.value.trim().length > 0) setIsValid(true);
    setEnteredValue(e.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // trim()은 시작이나 끝부분에 과도하게 쓰인 공백을 제거해준다.
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {/*동적 css 클래스 설정*/}
      {/* <FormControl invalid={!isValid}> */}
      <div
        className={`${styles["form-control"]}  ${!isValid && styles.invalid}`}
      >
        <label>Course Goal</label>
        <input
          style={{
            borderColor: !isValid ? "red" : "black",
            background: !isValid ? "salmon" : "transparent",
          }}
          type="text"
          onChange={goalInputChangeHandler}
        />
      </div>
      {/* </FormControl> */}
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
