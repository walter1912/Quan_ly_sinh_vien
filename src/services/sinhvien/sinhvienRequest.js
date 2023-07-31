import { initialSinhVien } from "../../models";
import axiosInstance from "../../utils/axiosInstance";
import {
  changeCurrent,
  updateList,
  add,
  deleteOne,
  editOne,
} from "./sinhvienSlice";

export const sinhvienRequest = {
  create: async function (data, dispatch) {
    try {
      let url = "/SinhViens";
      const res = await axiosInstance.post(url, data);
      console.log("Kết quả thêm sinh viên: ", res.data);
      if (res.status === 201) {
        dispatch(add(res.data.sinhvien));
      }
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log("Lỗi khi thêm sinh viên: ", err);
      return { status: err.status, data: err.data };
    }
  },
  getAll: async function (dispatch) {
    try {
      let url = "/SinhViens";
      const res = await axiosInstance.get(url);
      console.log("Kết quả trả về khi lấy danh sách sinh viên: ", res.data);
      if (res.status === 200) {
        dispatch(updateList(res.data.sinhviens));
      }
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log("Lỗi khi lấy ra danh sách sinh viên: ", err);
      return { status: err.status, data: err.data };
    }
  },
  getById: async function (id, dispatch) {
    try {
      let url = `/SinhViens/${id}`;
      const res = await axiosInstance.get(url);
      if (res.status === 200) {
        dispatch(changeCurrent(res.data.sinhvien));
        console.log("Kết quả trả về khi lấy sinh viên theo id; ", res.data);
      }
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log("Lỗi khi lấy ra sinh viên theo id: ", err);
      return { status: err.status, data: err.data };
    }
  },
  delete: async function (id, dispatch) {
    try {
      let isDelete = true;
      if (
        window.confirm(`Bạn muốn xóa sinh viên có id = ${id} không?`) === false
      ) {
        isDelete = false;
      }

      if (isDelete) {
        dispatch(deleteOne(id));
        let url = `/SinhViens/${id}`;
        const res = await axiosInstance.delete(url);
        console.log("Kết quả trả về khi xóa sinh viên: ", res);
        return { status: res.status, data: res.data };
      }
    } catch (err) {
      console.log(`Lỗi khi xóa sinh viên có id=${id} : `, err);
      return { status: err.status, data: err.data };
    }
  },
  update: async function (data, dispatch) {
    try {
      let isEdit = true;
      if (window.confirm(`Bạn muốn sửa sinh viên này không?`) === false) {
        isEdit = false;
      }

      if (isEdit) {
        let url = `/SinhViens/${data.id}`;
        const res = await axiosInstance.put(url, data);
        console.log("Kết quả trả về khi cập nhật sinh viên: ", res);
        if (res.status === 200) {
          dispatch(changeCurrent(initialSinhVien));
          dispatch(editOne(res.data.sinhvien));
        }
        return { status: res.status, data: res.data };
      }
    } catch (err) {
      console.log(`Lỗi khi cập nhập sinh viên có id=${data.id} : `, err);
      return { status: err.status, data: err.data };
    }
  },
};
