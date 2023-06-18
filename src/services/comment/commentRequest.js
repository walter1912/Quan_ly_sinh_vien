import axiosInstance from "../../utils/axiosInstance";
import { commentActions } from "./commentSlice";

const { add, updateAllCmt, updateRenderCmt } = commentActions;
export const commentRequest = {
  create: async function (data, dispatch) {
    try {
      let url = `/Comments`;
      let createAt = new Date().toISOString();
      //data = {postId, userId, repCommentId, content }
      let dataPost = { ...data, createAt };
      const res = await axiosInstance.post(url, dataPost);
      console.log("Kết quả khi thêm bình luận: ", res.data);
      dispatch(add(res.data));
      return { status: 200 };
    } catch (err) {
      console.log("Lỗi khi thêm comment: ", err);
      return { err: err, status: 400 };
    }
  },
  getAllCommentByPostId: async function (postId, dispatch) {
    try {
      let url = `/Comments/posts/${postId}`;
      const res = await axiosInstance.get(url);
      console.log("Kết quả khi lấy danh sách bình luận của bài viết =", res.data);
      dispatch(updateAllCmt(res.data.comment));

      const renderCmt = res.data.comment.filter(
        (cmt) => cmt.repCommentId === 0
      );
      dispatch(updateRenderCmt(renderCmt));
    } catch (err) {
      console.log("Lỗi khi lấy danh sách cmt by postId = ", postId, err);
    }
  },
};
