import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

const stroe = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export default stroe;
