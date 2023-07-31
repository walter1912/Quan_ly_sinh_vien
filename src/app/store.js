import { configureStore } from "@reduxjs/toolkit";
import sinhvienReducer from "../services/sinhvien/sinhvienSlice";
import giangvienReducer from "../services/giangvien/giangvienSlice";
import userReducer from "../services/user/userSlice";
import khoaReducer from "../services/khoa/khoaSlice";
import postReducer from "../services/post/postSlice";
import commentReducer from "../services/comment/commentSlice";
import responseReducer from "../services/response/responseSlice";


export const store = configureStore({
  reducer: {
    giangVien: giangvienReducer,
    sinhVien: sinhvienReducer,
    user: userReducer,
    khoa: khoaReducer,
    post: postReducer,
    comment: commentReducer,
    response: responseReducer,
  },
});
