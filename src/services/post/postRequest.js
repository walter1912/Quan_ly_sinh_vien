import axiosInstance from "../../utils/axiosInstance";

import { postActions } from "./postSlice";

const { add, updateList, changeCurrent, deleteOne, editOne } = postActions;

export const postRequest = {
  create: async function (data, dispatch) {
    try {
      let url = `/Posts`;
      const res = await axiosInstance.post(url, data);
      console.log("Kết quả khi thêm bài viết: ", res.data);
      if(res.status === 201) {

        dispatch(add(res.data.post));
      }
     return res;
    } catch (err) {
      console.log("Lỗi khi thêm post: ", err);
      return err;
    }
  },
  getAll: async function (dispatch) {
    try {
      let url = `/Posts`;
      const res = await axiosInstance.get(url);
      console.log("kết quả trả về khi lấy danh sách post: ", res.data);
      if(res.status === 200) {

        dispatch(updateList(res.data.posts));
      }
      return res;
    } catch (err) {
      console.log("Lỗi khi get danh sách post: ");
    }
  },
  getAllByUser: async function (id) {
    try {
      let url = `/Posts/user/${id}`;
      const res = await axiosInstance.get(url);
      console.log(
        "Kết quả khi lấy về danh sách bài viết được đăng bởi user có id=",
        id,
        res.data
      );
      return res;
    } catch (err) {
      console.log("Lỗi khi lấy danh sách bài viết được đăng bởi userId =", id);
      return err;
    }
  },
  getById: async function (id, dispatch) {
    try {
      let url = `/Posts/${id}`;
      const res = await axiosInstance.get(url);
      if(res.status === 200) {
        dispatch(changeCurrent(res.data.post));
      }
      console.log("Kết quả trả về khi lấy bài đăng theo id = ", id, res.data);
      return res;
    } catch (err) {
      console.log("Lỗi khi lấy ra post theo id:", id, err);
      return err;
    }
  },
  delete: async function (id, dispatch) {
    try {
      let isDelete = true;
      if (
        window.confirm(`Bạn muốn xóa bài đăng có id = ${id} không?`) === false
      ) {
        isDelete = false;
      }

      if (isDelete) {
        let url = `/Posts/${id}`;
        const res = await axiosInstance.delete(url);
        if(res.status === 200) {
          dispatch(deleteOne(id));
        }
        console.log("Kết quả trả về khi xóa bài đăng: ", res);
        return res;
      }
      return {};
    } catch (err) {
      console.log(`Lỗi khi xóa bài đăng có id=${id} : `, err);
      return err;
    }
  },
  update: async function (data, dispatch) {
    try {
      let isEdit = true;
      if (
        window.confirm(
          `Bạn muốn sửa bài đăng có mã bài đăng ${data.title} không?`
        ) === false
      ) {
        isEdit = false;
      }

      if (isEdit) {
        let url = `/Posts/${data.id}`;
        const res = await axiosInstance.put(url, data);
        console.log("Kết quả trả về khi cập nhật bài đăng: ", res);
        if(res.status === 200) {
          dispatch(changeCurrent(res.data.post));
          dispatch(editOne(res.data.post));

        }
        return res;
      }
      return {};
    } catch (err) {
      console.log(`Lỗi khi cập nhập bài đăng có id=${data.id} : `, err);
      return err;
    }
  },
};
