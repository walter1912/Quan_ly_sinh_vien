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
      const { maSV, tenSV, ngaySinh, gioiTinh, khoaId, giangVienId } = data;
      const dataPost = { maSV, tenSV, ngaySinh, gioiTinh, khoaId, giangVienId };
      const res = await axiosInstance.post(url, dataPost);
      console.log("Kết quả thêm sinh viên: ", data, res.data);
      dispatch(add(data));
    } catch (err) {
      console.log("Lỗi khi thêm sinh viên: ", err);
    }
  },
  getAll: async function (dispatch) {
    try {
      let url = "/SinhViens";
      const res = await axiosInstance.get(url);
      dispatch(updateList(res.data));
      console.log("Kết quả trả về khi lấy danh sách sinh viên: ", res.data);
    } catch (err) {
      console.log("Lỗi khi lấy ra danh sách sinh viên: ", err);
    }
  },
  getById: async function (id, dispatch) {
    try {
      let url = `/SinhViens/${id}`;
      const res = await axiosInstance.get(url);
      dispatch(changeCurrent(res.data));
      console.log("Kết quả trả về khi lấy sinh viên theo id; ", res.data);
    } catch (err) {
      console.log("Lỗi khi lấy ra sinh viên theo id: ", err);
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
      }
    } catch (err) {
      console.log(`Lỗi khi xóa sinh viên có id=${id} : `, err);
    }
  },
  update: async function (data, dispatch) {
    try {
      let isEdit = true;
      if (
        window.confirm(
          `Bạn muốn sửa sinh viên có mã sinh viên ${data.maSV} không?`
        ) === false
      ) {
        isEdit = false;
      }

      if (isEdit) {
        let url = `/SinhViens/${data.id}`;
        const { id, maSV, tenSV, ngaySinh, gioiTinh, khoaId } = data;
        const dataPut = { id, maSV, tenSV, ngaySinh, gioiTinh, khoaId };
        const res = await axiosInstance.put(url, dataPut);
        console.log("Kết quả trả về khi cập nhật sinh viên: ", res);
        dispatch(changeCurrent(initialSinhVien));
        dispatch(editOne(data));
        return res;
      }
      let res = {status: 400};
      return res;
    } catch (err) {
      console.log(`Lỗi khi cập nhập sinh viên có id=${data.id} : `, err);
      return err;
    }
  },
};
