import "./ExpensesList.css";

import ExpenseItem from "./ExpenseItem";
import React from "react";

const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="expense-list__fallback">Found no expenses.</h2>;
  }

  return (
    <ul className="expeses-list">
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id} // id를 key값으로 설정
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
