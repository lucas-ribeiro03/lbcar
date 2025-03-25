import { createSlice } from "@reduxjs/toolkit";

interface IsLogged {
  login: boolean;
}

interface IsLoggedState {
  login: IsLogged;
}

const initialState: IsLoggedState = {
  login: {
    login: false,
  },
};

export const isLoggedSlice = createSlice({
  initialState,
  name: "isLogged",
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { setLogin } = isLoggedSlice.actions;
