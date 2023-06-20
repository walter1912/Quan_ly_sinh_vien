import { createSlice } from "@reduxjs/toolkit";
import { initialUser } from "../../models.ts";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../../utils/localStorage";

const initUser = {
  allUser: getLocalStorage("allUser") ?? [],
  current: getLocalStorage("currentUser") ?? initialUser,
  login: getLocalStorage("userLogin") ?? false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initUser,
  reducers: {
    add(state, action) {
      state.allUser.push(action.payload);
      setLocalStorage("allUser", state.allUser);
    },
    delete(state, action) {
      let id = action.payload;
      let allUser = state.allUser.filter((user) => user.id !== id);
      setLocalStorage("allUser", allUser);
    },
    changeCurrent(state, action) {
      const user = action.payload;
      const { ten } = user;
      if (ten !== undefined) {
        state.current = { ...state.current, ...user };
      } else state.current = user;
      removeLocalStorage("currentUser");
      setLocalStorage("currentUser", state.current);
      console.log("changeCurrent userSlice: ", state.current);
      
      state.login = true;
      setLocalStorage("userLogin", true);
    },
    logout(state, action) {
      state.current = initUser;
      state.login = false;
      removeLocalStorage("currentUser");
      setLocalStorage("currentUser", state.current);
      console.log("đăng xuất thành công khỏi user: ", action.payload);
      setLocalStorage("userLogin", false);
    },
  },
});
export const userActions = userSlice.actions;

export default userSlice.reducer;
