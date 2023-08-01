import axiosInstance from "../../utils/axiosInstance";
import { commentActions } from "./commentSlice";

const { add, updateAllCmt, updateRenderCmt } = commentActions;
export const commentRequest = {
  create: async function (data, dispatch) {
    try {
      let url = `/Comments`;
      
      const res = await axiosInstance.post(url, data);
      console.log("Kết quả khi thêm bình luận: ", res.data);
      if (res.status === 201) {
        dispatch(add(res.data.comment));
      }
      return res;
    } catch (err) {
      console.log("Lỗi khi thêm comment: ", err);
      return err;
    }
  },
  getAllCommentByPostId: async function (postId, dispatch) {
    try {
      let url = `/Comments/post/${postId}`;
      const res = await axiosInstance.get(url);
      if (res.status === 200) {
        dispatch(updateAllCmt(res.data.comments));
        const renderCmt = res.data.comments.filter(
          (cmt) => cmt.level === 0
        );
        dispatch(updateRenderCmt(renderCmt));
      }
      return res;
    } catch (err) {
     return err;
    }
  },
};
