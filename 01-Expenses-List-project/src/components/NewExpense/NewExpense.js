import "./NewExpense.css";

import ExpenseForm from "./ExpenseForm";
import React, { useState } from "react";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false); // 토글용 state, default값을 false로 준다.

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString,
    };
    props.onAddExpense(expenseData);
  };

  const startEditingHandler = () => {
    setIsEditing(true); // 함수가 실행되면 true로 바꿈
  };

  const stopEditingHandler = () => {
    setIsEditing(false); // 함수가 실행되면 false 바꿈
  };

  return (
    <div className="new-expense">
      {!isEditing && ( // 초기값, isEditing이 false 이면 Add New Expense 버튼 태그를 보여줌
        <button onClick={startEditingHandler}>Add New Expense</button> // 버튼이 클릭되면 isEditing을 true로 바꿈
      )}
      {isEditing && ( // isEditing이 true가 되면 버튼 태그를 없애고 ExpenseForm 컴포넌트를 보여줌
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler} // onCancel이 실행 되면 isEditing을 false로 바꿈
        />
      )}
    </div>
  );
};

export default NewExpense;
