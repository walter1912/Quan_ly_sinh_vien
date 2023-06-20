import { initialGiangVien } from "../../models";
import axiosInstance from "../../utils/axiosInstance";
import { giangvienActions } from "./giangvienSlice";

const { updateList, changeCurrent, deleteOne, add, editOne } =
  giangvienActions;

export const giangvienRequest = {
  create: async function (data, dispatch) {
    try {
      let url = "/GiangViens";
      let { tenGV, maGV, ngaySinh, gioiTinh, khoaId, email } = data;
      let dataPost = { tenGV, maGV, ngaySinh, gioiTinh, khoaId, email };
      const res = await axiosInstance.post(url, dataPost);
      console.log("Kết quả thêm giảng viên: ", data, res.data);
      dispatch(add(data));
      return res;
    } catch (err) {
      console.log("Lỗi khi thêm giảng viên: ", err);
      return err;
    }
  },
  getAll: async function (dispatch) {
    try {
      let url = "/GiangViens";
      const res = await axiosInstance.get(url);
      dispatch(updateList(res.data));
      console.log("Kết quả trả về khi lấy danh sách giảng viên: ", res.data);
    } catch (err) {
      console.log("Lỗi khi lấy ra danh sách giảng viên: ", err);
    }
  },
  getById: async function (id, dispatch) {
    try {
      let url = `/GiangViens/${id}`;
      const res = await axiosInstance.get(url);
      dispatch(changeCurrent(res.data));
      console.log("Kết quả trả về khi lấy giảng viên theo id; ", res.data);
    } catch (err) {
      console.log("Lỗi khi lấy ra giảng viên theo id: ", err);
    }
  },
  delete: async function (id, dispatch) {
    try {
      let isDelete = true;
      if (
        window.confirm(`Bạn muốn xóa giảng viên có id = ${id} không?`) === false
      ) {
        isDelete = false;
      }

      if (isDelete) {
        dispatch(deleteOne(id));
        let url = `/GiangViens/${id}`;
        const res = await axiosInstance.delete(url);
        console.log("Kết quả trả về khi xóa giảng viên: ", res);
      }
    } catch (err) {
      console.log(`Lỗi khi xóa giảng viên có id=${id.id} : `, err);
    }
  },
  update: async function (data, dispatch) {
    try {
      let isEdit = true;
      if (
        window.confirm(
          `Bạn muốn sửa giảng viên có mã giảng viên ${data.maGV} không?`
        ) === false
      ) {
        isEdit = false;
      }

      if (isEdit) {
        let url = `/GiangViens/${data.id}`;
        let { id, tenGV, maGV, ngaySinh, gioiTinh, khoaId, email } = data;
        let dataPost = {id, tenGV, maGV, ngaySinh, gioiTinh, khoaId, email };
        const res = await axiosInstance.put(url, dataPost);
        console.log("Kết quả trả về khi cập nhật giảng viên: ", res);
        dispatch(changeCurrent(initialGiangVien));
        dispatch(editOne(data));
        return res;
      }
      let res = { status: 400 };
      return res;
    } catch (err) {
      console.log(`Lỗi khi cập nhập giảng viên có id=${data.id} : `, err);
      return err;
    }
  },
  getAllSinhVienById: async function (id) {
    try {
      let url = `/SinhViens/giangvien/${id}`;
      const res = await axiosInstance.get(url);
      console.log(
        "Kết quả trả về  khi lấy danh sách sinh viên được tạo bởi giảng viên có id =",
        id,
        res.data
      );
      return res.data;
    } catch (err) {
      console.log(
        "Lỗi khi lấy danh sách sinh viên được tạo bởi giảng viên có id =",
        id
      );
      return err;
    }
  },
  getAllPostByMaGV: async function (maGV) {
    try {
      let url = `/Users/username/${maGV}`;
      let dataUser = await axiosInstance.get(url);

      let url2 = `/Posts/user/${dataUser.data.id}`;
      let res = await axiosInstance.get(url2);
      console.log(
        "Kết quả trả về  khi lấy danh sách bài viết được tạo bởi giảng viên có mã =",
        maGV,
        res.data
      );
      return res.data;
    } catch (err) {
      console.log(
        "Lỗi khi lấy danh sách bài viết được tạo bởi giảng viên có mã =",
        maGV
      );
    }
  },
};
