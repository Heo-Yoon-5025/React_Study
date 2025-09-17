import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

// 2. Store 생성: counterSlice.reducer 등록
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer, // state.counter에 매핑됨
  },
});

export default store;
