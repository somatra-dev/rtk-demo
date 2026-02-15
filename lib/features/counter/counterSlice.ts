import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  status: "idle" | "pending";
}

const initialState: CounterState = {
  value: 0,
  status: "idle",
};

export const incrementAsync = createAction<number>("counter/incrementAsync");

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    incrementAsyncStarted: (state) => {
      state.status = "pending";
    },
    incrementAsyncFinished: (state) => {
      state.status = "idle";
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  incrementAsyncStarted,
  incrementAsyncFinished,
} = counterSlice.actions;

export default counterSlice.reducer;
