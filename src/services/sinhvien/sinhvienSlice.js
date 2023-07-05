import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { createSlice } from "@reduxjs/toolkit";
import { initialSinhVien } from "../../models.ts";
import { allSinhVien, currentSinhVien } from "../data";

const initSinhVien = {
  allSinhVien: getLocalStorage("allSinhVien") ?? allSinhVien ,
  currentRender: [],
  current: getLocalStorage("currentSinhVien") ?? currentSinhVien,
  nextId: getLocalStorage("nextId") ?? 0,
};

export const sinhvienSlice = createSlice({
  name: "sinhVien",
  initialState: initSinhVien,
  reducers: {
    add(state, action) {
      state.allSinhVien.push(action.payload);
      setLocalStorage("allSinhVien", state.allSinhVien);
      setLocalStorage("nextId", action.payload.id);
      state.current = initSinhVien;
    },
    updateList(state, action) {
      state.allSinhVien = action.payload;
      setLocalStorage("allSinhVien", state.allSinhVien);
    },
    changeCurrent(state, action) {
      let sinhVien = action.payload;
      state.current = sinhVien;
      setLocalStorage("currentSinhVien", sinhVien);
    },
    deleteOne(state, action) {
      let id = action.payload;
      let allSinhVien = state.allSinhVien.filter((sv) => sv.id !== id);
      setLocalStorage("allSinhVien", allSinhVien);
      state.allSinhVien = allSinhVien;
    },
    editOne(state, action) {
      let sinhVien = action.payload;
      state.allSinhVien.forEach((sv, index, arr) => {
        if (sv.id === sinhVien.id) {
          arr[index] = sinhVien;
          return;
        }
      });
      setLocalStorage("allSinhVien", state.allSinhVien);
    },
    search(state, action) {
      const { type, keyword } = action.payload;
      state.currentRender = [];
      console.log(" { type, keyword }: ", type, keyword);
      switch (type) {
        case "Ten":
          state.currentRender = state.allSinhVien.filter((sv) =>
            sv.tenSV.toLowerCase().includes(keyword)
          );
          console.log("Danh sách tìm kiếm theo tên: ", state.currentRender);

          break;
        case "Ma":
          state.currentRender = state.allSinhVien.filter((sv) =>
            sv.maSV.toLowerCase().includes(keyword)
          );
          break;
        case "Khoa":
          state.currentRender = state.allSinhVien.filter((sv) =>
            sv.tenKhoa.toLowerCase().includes(keyword)
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
    updateCurrentRender(state, action) {
      state.currentRender = action.payload;
    }
  },
});

export const { updateList, changeCurrent, deleteOne, search, add, editOne , updateCurrentRender} =
  sinhvienSlice.actions;

export default sinhvienSlice.reducer;
