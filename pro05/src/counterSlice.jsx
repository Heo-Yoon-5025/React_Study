import { createSlice } from "@reduxjs/toolkit";

// 1. Slice 생성: 전역 상태와 Reducer 정의
const counterSlice = createSlice({
  name: "counterSlice", // 슬라이스 이름 (액션 타입 접두어 역할)
  initialState: { value: 0 }, // 상태 초기값
  reducers: {
    // up 액션: state.value를 step 값만큼 증가
    up: (state, action) => {
      state.value = state.value + action.payload;
    },
  },
});

export default counterSlice;
export const { up } = counterSlice.actions;
