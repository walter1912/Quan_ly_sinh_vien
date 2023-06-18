import axiosInstance from "../../utils/axiosInstance";

import { postActions } from "./postSlice";

const { add, updateList, changeCurrent, deleteOne, editOne } = postActions;

export const postRequest = {
  create: async function (data, dispatch) {
    try {
      let url = `/Posts`;
      let createAt = new Date().toISOString();
      let updateAt = new Date().toISOString();
      const { userId, title, content, thumbnail } = data;

      const dataPost = {
        userId,
        createAt,
        updateAt,
        title,
        content,
        thumbnail,
      };

      const res = await axiosInstance.post(url, dataPost);
      console.log("Kết quả khi thêm bài viết: ", res.data);
      dispatch(add(res.data));
      return { status: 200 };
    } catch (err) {
      console.log("Lỗi khi thêm post: ", err);
      return { err: err, status: 400 };
    }
  },
  getAll: async function (dispatch) {
    try {
      let url = `/Posts`;
      const res = await axiosInstance.get(url);
      dispatch(updateList(res.data));
      console.log("kết quả trả về khi lấy danh sách post: ", res.data);
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
      return res.data;
    } catch (err) {
      console.log("Lỗi khi lấy danh sách bài viết được đăng bởi userId =", id);
      return err;
    }
  },
  getById: async function (id, dispatch) {
    try {
      let url = `/Posts/${id}`;
      const res = await axiosInstance.get(url);
      dispatch(changeCurrent(res.data));
      console.log("Kết quả trả về khi lấy bài đăng theo id = ", id, res.data);
      return res.data;
    } catch (err) {
      console.log("Lỗi khi lấy ra post theo id:", id, err);
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
        dispatch(deleteOne(id));
        let url = `/Posts/${id}`;
        const res = await axiosInstance.delete(url);
        console.log("Kết quả trả về khi xóa bài đăng: ", res);
      }
    } catch (err) {
      console.log(`Lỗi khi xóa bài đăng có id=${id} : `, err);
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

        let updateAt = new Date().toISOString();
        const { id, userId, title, createAt, content, thumbnail } = data;
        const dataPut = {
          id,
          userId,
          createAt,
          updateAt,
          title,
          content,
          thumbnail,
        };
        const res = await axiosInstance.put(url, dataPut);
        console.log("Kết quả trả về khi cập nhật bài đăng: ", res);
        dispatch(changeCurrent(res.data));
        dispatch(editOne(data));
        return res;
      }
      let res = { status: 400 };
      return res;
    } catch (err) {
      console.log(`Lỗi khi cập nhập bài đăng có id=${data.id} : `, err);
      return err;
    }
  },
};
