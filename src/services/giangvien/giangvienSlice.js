import { createSlice } from "@reduxjs/toolkit";
import { initialGiangVien } from "../../models";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";

const initGiangVien = {
  allGiangVien: getLocalStorage("allGiangVien") ?? [],
  currentRender: [],
  current: getLocalStorage("currentGiangVien") ?? initialGiangVien,
};

export const giangvienSlice = createSlice({
  name: "giangVien",
  initialState: initGiangVien,
  reducers: {
    add(state, action) {
      state.allGiangVien.push(action.payload);
      setLocalStorage("allGiangVien", state.allGiangVien);
    },
    updateList(state, action) {
      state.allGiangVien = action.payload;
      setLocalStorage("allGiangVien", state.allGiangVien);
    },
    changeCurrent(state, action) {
      let giangVien = action.payload;
      state.current = giangVien;
      setLocalStorage("currentGiangVien", giangVien);
    },
    deleteOne(state, action) {
      let id = action.payload;
      let allGiangVien = state.allGiangVien.filter((gv) => gv.id !== id);
      setLocalStorage("allGiangVien", allGiangVien);
      state.allGiangVien = allGiangVien;
    },
    editOne(state, action) {
      let giangVien = action.payload;
      state.allGiangVien.forEach((gv, index, arr) => {
        if (gv.id === giangVien.id) {
          arr[index] = giangVien;
          return;
        }
      });
      setLocalStorage("allGiangVien", state.allGiangVien);
    },
    search(state, action) {
      const { type, keyword } = action.payload;
      state.currentRender = [];
      console.log(" { type, keyword }: ", type, keyword);
      switch (type) {
        case "Ten":
          state.currentRender = state.allGiangVien.filter((gv) =>
            gv.tenGV.toLowerCase().includes(keyword)
          );
          console.log("Danh sách tìm kiếm theo tên: ", state.currentRender);

          break;
        case "Ma":
          state.currentRender = state.allGiangVien.filter((gv) =>
            gv.maGV.toLowerCase().includes(keyword)
          );
          break;
        default:
          console.log("Type của action không đúng cú pháp.");
      }
      if (state.currentRender.length < 1) {
        alert("Từ khóa không phù hợp");
      }
      console.log("Danh sách tìm kiếm: ", state.currentRender);
    },
    updateListRender(state, action) {
      state.currentRender = action.payload;
    },
  },
});

export const giangvienActions = giangvienSlice.actions;

export default giangvienSlice.reducer;
