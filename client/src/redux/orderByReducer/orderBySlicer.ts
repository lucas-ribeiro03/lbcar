import { createSlice } from "@reduxjs/toolkit";

interface OrderBy {
  sort: string;
}

interface OrderByState {
  order: OrderBy;
}

const initialState: OrderByState = {
  order: { sort: "" },
};

export const orderBySlice = createSlice({
  initialState,
  name: "order",
  reducers: {
    updateSort: (state, action) => {
      state.order.sort = action.payload;
    },
  },
});

export const { updateSort } = orderBySlice.actions;
