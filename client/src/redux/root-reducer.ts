import { combineReducers } from "redux";
import { filterSlice } from "./FilterReducer/filterSlice";
import { orderBySlice } from "./orderByReducer/orderBySlicer";
import { usersSlice } from "./UserReducer/userSlice";
import { isLoggedSlice } from "./IsLoggedReducer/isLoggedSlice";

export const rootReducer = combineReducers({
  FilterReducer: filterSlice.reducer,
  OrderByReducer: orderBySlice.reducer,
  UserReducer: usersSlice.reducer,
  IsLoggedReducer: isLoggedSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
