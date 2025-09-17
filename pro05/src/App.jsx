import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import store from "./store";
import { up } from "./counterSlice";

// function reducer(state, action) {
//   if (action.type === "up") {
//     return { ...state, value: state.value + action.step };
//   }
//   return state;
// }

// const initialState = { value: 0 };
// const store = createStore(reducer, initialState);

// 3. Counter 컴포넌트: 상태 읽기 + 액션 보내기
function Counter() {
  const dispatch = useDispatch(); // 액션을 스토어로 보냄
  const count = useSelector((state) => state.counter.value); // 상태 읽기

  return (
    <div>
      {/* 버튼 클릭 시 "counterSlice/up" 액션 발송 */}
      <button
        onClick={() => {
          dispatch(up(2));
        }}
      >
        +
      </button>
      {/* 현재 상태 값 출력 */}
      {count}
    </div>
  );
}

// 4. App 컴포넌트: Provider로 감싸 스토어 전달
export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Counter />
      </div>
    </Provider>
  );
}
