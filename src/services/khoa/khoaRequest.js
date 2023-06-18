import axiosInstance from "../../utils/axiosInstance";
import { add, updateAll, deleteOne } from "./khoaSlice";

export const khoaRequest = {
  create: async function (data, dispatch) {
    try {
      let url = `/Khoas`;
      let res = await axiosInstance.post(url, data);
      console.log("Kết quả trả về khi thêm khoa: ", res);
      dispatch(add(res.data));
    } catch (err) {
      console.log("Thêm khoa bị lỗi: ", err);
    }
  },
  getAll: async function (dispatch) {
    try {
      let url = `/Khoas`;
      let res = await axiosInstance.get(url);
      console.log("Kết quả trả về khi lấy danh sách khoa: ", res);
      dispatch(updateAll(res.data));
    } catch (err) {
      console.log("Lấy danh sách khoa bị lỗi: ", err);
    }
  },
  delete: async function (id, dispatch) {
    try {
      let isDelete = true;
      if (window.confirm(`Bạn muốn xóa khoa  ${id} không?`) === false) {
        isDelete = false;
      }

      if (isDelete) {
        dispatch(deleteOne(id));
        let url = `/Khoas/${id}`;
        let res = await axiosInstance.delete(url);
        console.log("Kết quả trả về khi xóa khoa: ", res);
      }
    } catch (err) {
      console.log("Lỗi khi xóa khoa có id = ", id);
    }
  },
  update: async function (data, dispatch) {
    try {
      let isEdit = true;
      if (window.confirm(`Bạn muốn sửa khoa  ${data.ten} không?`) === false) {
        isEdit = false;
      }
      if (isEdit) {
        let url = `/Khoas/${data.id}`;
        let res = await axiosInstance.put(url);
        console.log("Kết quả trả về khi sửa khoa: ", res);
      }
    } catch (err) {
      console.log("Lỗi khi sửa khoa có id = ", data.id);
    }
  },
  getAllGiangVienByKhoa: async function (id) {
    try {
      let url = `/GiangViens/khoa/${id}`;
      let res = await axiosInstance.get(url);
      console.log(
        "Kết quả khi lấy danh sách giảng viên có khoaId=",
        id,
        res.data
      );
      return res.data;
    } catch (err) {
      console.log("Lỗi khi lấy danh sách giảng viên có khoaId =", id, err);
      return err;
    }
  },
  getAllSinhVienByKhoa: async function (id) {
    try {
      let url = `/SinhViens/khoa/${id}`;
      let res = await axiosInstance.get(url);
      console.log(
        "Kết quả khi lấy danh sách sinh viên có khoaId=",
        id,
        res.data
      );
      return res.data;
    } catch (err) {
      console.log("Lỗi khi lấy danh sách sinh viên có khoaId =", id, err);
      return err;
    }
  },
};
