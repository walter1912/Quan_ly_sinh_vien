import axiosInstance from "../../utils/axiosInstance";
import { add, updateAll, deleteOne } from "./khoaSlice";

export const khoaRequest = {
  create: async function (data, dispatch) {
    try {
      let url = `/Khoas`;
      let res = await axiosInstance.post(url, data);
      console.log("Kết quả trả về khi thêm khoa: ", res);
      if (res.status === 201) {
        dispatch(add(res.data.khoa));
      }
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log("Thêm khoa bị lỗi: ", err);
      return { status: err.status, data: err.data };
    }
  },
  getAll: async function (dispatch) {
    try {
      let url = `/Khoas`;
      let res = await axiosInstance.get(url);
      console.log("Kết quả trả về khi lấy danh sách khoa: ", res);
      if (res.status === 200) {
        dispatch(updateAll(res.data.khoas));
      }
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log("Lấy danh sách khoa bị lỗi: ", err);
      return { status: err.status, data: err.data };
    }
  },
  delete: async function (id, dispatch) {
    try {
      let isDelete = true;
      if (window.confirm(`Bạn muốn xóa khoa  ${id} không?`) === false) {
        isDelete = false;
      }

      if (isDelete) {
        let url = `/Khoas/${id}`;
        let res = await axiosInstance.delete(url);
        if(res.status === 200)  {
          dispatch(deleteOne(id));
        }
        console.log("Kết quả trả về khi xóa khoa: ", res);
        return { status: res.status, data: res.data };
      }
      return {};
    } catch (err) {
      console.log("Lỗi khi xóa khoa có id = ", id);
      return { status: err.status, data: err.data };
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
        return { status: res.status, data: res.data };
      }
      return {};
    } catch (err) {
      console.log("Lỗi khi sửa khoa có id = ", data.id);
      return { status: err.status, data: err.data };
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
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log("Lỗi khi lấy danh sách giảng viên có khoaId =", id, err);
      return { status: err.status, data: err.data };
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
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log("Lỗi khi lấy danh sách sinh viên có khoaId =", id, err);
      return { status: err.status, data: err.data };
    }
  },
};
