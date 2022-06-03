// CartProvider.js
// CartContext 데이터를 관리하고, 그 컨텍스트를 접근하려는 모든 컴포넌트를 제공

import { useReducer } from "react";

import CartContext from "./cart-context";

// 리듀서 state의 디폴트 값으로 상수 선언
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// 리듀서 함수는 리액트 컴포넌트 함수인 CartProvider 함수 안에서
// 아무 값도 필요하지 않기때문에 리액트 컴포넌트 함수 외부에서 선언 가능
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // 현재 선택한 아이템의 id의 인덱스
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items]; // 기존 state를 할당
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // 아이템이 배열에 처음으로 추가되는 경우
      updatedItems = state.items.concat(action.item); // concat은 배열에 새 항목을 추가
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState; // 디폴트 값 리턴
};

// 리액트 함수
const CartProvider = (props) => {
  // 리듀서 초기 선언
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  // 장바구니 항목에 추가될 상수
  const cartContext = {
    items: cartState.items, //
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
