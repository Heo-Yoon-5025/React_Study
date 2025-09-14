import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useReducer, useState } from "react";

export default function App() {
  const [number, setNumber] = useState(1);
  function countReducer(oldCount, action) {
    if (action === "UP") {
      return oldCount + 1;
    } else if (action === "DOWN") {
      return oldCount - 1;
    } else if (action === "RESET") {
      return 0;
    }
    return oldCount;
  }

  const [count, countDispatch] = useReducer(countReducer, 0);

  function down() {
    countDispatch("DOWN");
  }
  function reset() {
    countDispatch("RESET");
  }
  function up() {
    countDispatch("UP");
  }
  function changeNumber(event) {
    setNumber(Number(event.target.value));
  }
  return (
    <>
      <input type="button" value="-" onClick={down} />
      <input type="button" value="0" onClick={reset} />
      <input type="button" value="+" onClick={up} />
      <input type="text" value={number} onChange={changeNumber} />
      <span>{count}</span>
    </>
  );
}
