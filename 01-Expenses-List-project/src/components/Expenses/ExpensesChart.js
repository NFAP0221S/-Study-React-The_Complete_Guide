import Chart from "../Chart/Chart";

import React from "react";

const ExpensesChart = (props) => {
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];
  // expenses 각각의 요소를 한번씩 순회함
  for (const expense of props.expenses) {
    const expenseMonth = expense.date.getMonth(); // expense.date 를 Month로 받음
    chartDataPoints[expenseMonth].value += expense.amount; // 해당 월의 총 비용을 value에 할당 해줌
  }

  return <Chart dataPoints={chartDataPoints} />;
};

export default ExpensesChart;
