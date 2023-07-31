import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: 200,
  message: "Đang truy cập trang web",
  data: {},
  type: "success",
  toast: false,
};
export const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    otherMethods(state, action) {
      const { status, data } = action.payload;
      state.status = status;
      state.message = data.message;
      state.data = data;
      if (state.status === 200) {
        state.type = "success";
      } else {
        state.type = "error";
      }
      state.toast = true;
    },
    createMethod(state, action) {
        const { status, data } = action.payload;
        state.status = status;
        state.message = data.message;
        state.data = data;
        if (state.status === 201) {
          state.type = "success";
        } else {
          state.type = "error";
        }
        state.toast = true;
      },
  },
});

export const actions = responseSlice.actions;
export default responseSlice.reducer;
