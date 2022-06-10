const redux = require("redux"); // 서드파티 패키지를 임포트하기 위한 기본 노드 JS 임포트 구문

// 리듀서 함수 생성
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = redux.createStore(counterReducer); // redux 라이브러리에서 온 메서드, 저장소 생성

// console.log(store.getState());

// 구독 함수, 어떠한 파라미터도 받지 않음
// 구독함수의 상태가 변경되면 getState로 변경된 후의 최신 상태를 받는다.
const counterSubscriber = () => {
  // getState는 createStore() 로 생성된 저장소에서 사용할 수 있는 메서드, 최신 상태 제공
  const latestState = store.getState();
  console.log(latestState);
};

// subscribe는 counterSubscriber 함수를 취한다.
// 리덕스는 데이터와 저장소가 변경될 때마다 실행해준다.
store.subscribe(counterSubscriber);

store.dispatch({
  type: "increment",
});

store.dispatch({
  type: "decrement",
});
