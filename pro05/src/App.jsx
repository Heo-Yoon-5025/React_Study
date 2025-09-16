import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createStore } from "redux";
import { Provider, useSelector } from "react-redux";

function reducer(state, action) {
  return state;
}

const initialState = { value: 0 };
const store = createStore(reducer, initialState);

function Counter() {
  const count = useSelector((state) => state.value);
  return (
    <>
      <div>
        <button>+</button> {count}
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <Provider store={store}>
        <div>
          <Counter></Counter>
        </div>
      </Provider>
    </>
  );
}
