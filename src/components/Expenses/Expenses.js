import "./Expenses.css";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import Card from "../UI/Card";
import React, { useState } from "react";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2022");

  const filterChageHandler = (selectedYear) => {
    // 자식에서 전달받은 year를 filteredYear의 상태값으로 변경
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((expense) => {
    // getFullYear은 주어진 날짜의 현지 시간 기준 연도를 반환
    return expense.date.getFullYear().toString() === filteredYear; // filteredYear값과 같은 year를 리스트만 렌더링
  });

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChageHandler}
        />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
