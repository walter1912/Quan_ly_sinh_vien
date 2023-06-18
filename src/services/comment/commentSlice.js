import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../../utils/localStorage";

// ở đây không cần lưu thông tin cmt đang thêm, phần đó để trong commentRequest
const initComment = {
  // lấy ra tất cả các comment của bài viết nhưng chưa render hết
  // chỉ mặc định hiển thị các comment có repComment = 0
  allCmtAtCurrentPost: getLocalStorage("allCmtAtCurrentPost") ?? [],
  // danh sách những comment được rep và được hiển thị trong bài viết
  allRepCommentId: getLocalStorage("allRepCommentId") ?? [],
  // mặc định repCommentId = 0 được thêm vào allCmtRender để đc hiển thị
  allCmtRender: getLocalStorage("allCmtRender") ?? [],
};

export const commentSlice = createSlice({
  name: "comment",
  initialState: initComment,
  reducers: {
    // user đang đọc và cmt vào bài viết thì nó phải đc hiển thị ngay ở giao diện
    add(state, action) {
      const cmt = action.payload;
      //thêm vào list tổng
      state.allCmtAtCurrentPost.push(cmt);

      var allCmt = [...state.allCmtRender];
      for (let i = 0; i < allCmt.length; i++) {
        if (allCmt[i].id === cmt.repCommentId) {
          allCmt.splice(i + 1, 0, cmt);
          return;
        }
      }
      // thêm vào list render
      state.allCmtRender = allCmt;

      setLocalStorage("allCmtAtCurrentPost", state.allCmtAtCurrentPost);
      setLocalStorage("allCmtRender", allCmt);
      console.log("allCmtRender", state.allCmtRender);
    },
    updateAllCmt(state, action) {
      var allCmt = action.payload;
      state.allCmtAtCurrentPost = allCmt;
      setLocalStorage("allCmtAtCurrentPost", state.allCmtAtCurrentPost);
    },
    updateRenderCmt(state, action) {
      var renderCmt = action.payload;
      var updatedAllCmtRender = [...state.allCmtRender];

      renderCmt.forEach((cmt) => {
        // Kiểm tra xem cmt đã tồn tại trong mảng updatedAllCmtRender chưa
        if (
          !updatedAllCmtRender.some((existingCmt) => existingCmt.id === cmt.id)
        ) {
          updatedAllCmtRender.unshift(cmt);
        }
      });

      state.allCmtRender = updatedAllCmtRender;
      setLocalStorage("allCmtRender", state.allCmtRender);
    },
    //thêm danh sách cmt rep cmt có id = repCommentId
    addRepCmtId(state, action) {
      const repCommentId = action.payload;
      var listRepCmt = state.allCmtAtCurrentPost.filter(
        (cmt) => cmt.repCommentId === repCommentId
      );
      console.log(
        "state.allCmtAtCurrentPost filter and repCommentId: ",
        listRepCmt,
        repCommentId
      );
      var listRepId = [...state.allRepCommentId];
    
      console.log("");
      var allCmt = [...state.allCmtRender];
      for (let i = 0; i < allCmt.length; i++) {
        if (allCmt[i].id === repCommentId) {
          for (let j = 0; j < listRepCmt.length; j++) {
            if (!listRepId.includes(listRepCmt[j].id)) {
              allCmt.splice(i + j + 1, 0, listRepCmt[j]);
              listRepId.push(listRepCmt[j].id);
              console.log(
                " allCmt.splice(i + j + 1, 0, listRepCmt[j]): ",
                listRepCmt[j]
              );
            }
          }
          return;
        }

        state.allCmtRender = allCmt;
        setLocalStorage("allCmtRender", allCmt);
        setLocalStorage("allRepCommentId", listRepId);
        state.allRepCommentId = listRepId;
      }
    },
  },
});

export const commentActions = commentSlice.actions;

export default commentSlice.reducer;
