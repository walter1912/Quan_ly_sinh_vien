import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { initialKhoa } from "../../models.ts";

const initial = getLocalStorage("allKhoa")??[initialKhoa];
const khoaSlice = createSlice({
    name:'khoa',
    initialState: initial,
    reducers: {
        add(state, action){
            state.push(action.payload);
            setLocalStorage("allKhoa", state);
        },
        updateAll(state, action) {
            state = action.payload;
            setLocalStorage("allKhoa", state);
        },
        deleteOne(state, action) {
            state = state.filter(khoa => khoa.id !== action.payload);
            setLocalStorage("allKhoa", state);
        },
    }
})
export const {add, updateAll, deleteOne} = khoaSlice.actions;

export default khoaSlice.reducer;

