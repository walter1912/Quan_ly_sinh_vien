import { createSlice } from "@reduxjs/toolkit";
import { initialPost } from "../../models.ts";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import moment from "moment/moment";
import { allPost, currentPost } from "../data.js";

const initPost = {
  allPost: getLocalStorage("allPost") ?? allPost,
  currentRender: [],
  current: getLocalStorage("currentPost") ?? currentPost,
};

export const postSlice = createSlice({
  name: "post",
  initialState: initPost,
  reducers: {
    add(state, action) {
      const { id, userId, title, createAt, updateAt } = action.payload;
      const post = { id, userId, title, createAt, updateAt };
      state.allPost.push(post);
      setLocalStorage("allPost", state.allPost);
    },
    updateList(state, action) {
      state.allPost = action.payload;
      setLocalStorage("allPost", state.allPost);
    },
    changeCurrent(state, action) {
      let post = action.payload;
      state.current = post;
      setLocalStorage("currentPost", post);
    },
    deleteOne(state, action) {
      let id = action.payload;
      let allPostTmp = state.allPost.filter((post) => post.id !== id);
      state.allPost = allPostTmp;
    },
    editOne(state, action) {
      let { id, userId, title, createAt, updateAt } = action.payload;
      let post = { id, userId, title, createAt, updateAt };
      state.allPost.forEach((pt, index, arr) => {
        if (pt.id === post.id) {
          arr[index] = post;
          return;
        }
      });
      setLocalStorage("allPost", state.allPost);
    },
    searchByTitle(state, action) {
      const keyword = action.payload;
      state.currentRender = [];
      state.currentRender = state.allPost.filter((post) =>
        post.title.toLowerCase().includes(keyword)
      );
      console.log(
        "Danh sách bài viết tìm kiếm theo tiêu đề: ",
        state.currentRender
      );
    },
    sortByUpdate(state, action) {
      const type = action.payload;
      state.currentRender = [];
      state.currentRender = state.allPost.sort((a, b) => {
        const updateA = moment(a.updateAt);
        const updateB = moment(b.updateAt);
        if (type === "older") return updateA.isBefore(updateB);
        return updateA.isAfter(updateB);
      });
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
