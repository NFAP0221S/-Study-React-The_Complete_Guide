// cart-context.js
// 컨텍스트 사용

import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (it) => {}, // 컨텍스트를 업데이트할 수 있는 함수
  removeItem: (id) => {}, //  장바구니에서 삭제
});

export default CartContext;
