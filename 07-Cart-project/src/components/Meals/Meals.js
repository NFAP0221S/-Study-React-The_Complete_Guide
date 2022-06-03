// Meals.js
// 음식 목록 렌더링, 작은 요약 텍스트(MealsSummary.js)

import { Fragment } from "react";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
