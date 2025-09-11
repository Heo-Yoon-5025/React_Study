import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <input type="button" value="-" />
      <input type="button" value="0" />
      <input type="button" value="+" />
      <span>{count}</span>
    </>
  );
}
