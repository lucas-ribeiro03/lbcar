import { createSlice } from "@reduxjs/toolkit";
import { Users } from "../../data/Database";

interface UserState {
  user: Users;
}

const initialState: UserState = {
  user: {
    id_user: 0,
    user_name: "",
    user_email: "",
    user_password: "",
    user_image: "",
  },
};

export const usersSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    logOut: (state) => {
      state.user = {
        id_user: 0,
        user_email: "",
        user_image: "",
        user_name: "",
        user_password: "",
      };
    },
  },
});

export const { setUser, logOut } = usersSlice.actions;
