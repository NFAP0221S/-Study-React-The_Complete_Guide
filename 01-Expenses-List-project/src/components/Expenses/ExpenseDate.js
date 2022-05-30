import "./ExpenseDate.css";
import React from "react";

const ExpenseDate = (props) => {
  const month = props.date.toLocaleDateString("en-US", { month: "long" });
  const day = props.date.toLocaleDateString("en-US", { day: "2-digit" }); // 2-digit은 day를 2자리로 추출
  const year = props.date.getFullYear(); // getFullYear은 Year을 4자리로 추출

  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
};

export default ExpenseDate;
