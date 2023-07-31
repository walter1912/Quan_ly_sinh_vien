import { initialGiangVien } from "../../models";
import axiosInstance from "../../utils/axiosInstance";
import { giangvienActions } from "./giangvienSlice";

const { updateList, changeCurrent, deleteOne, add, editOne } = giangvienActions;

export const giangvienRequest = {
  create: async function (data, dispatch) {
    try {
      let url = "/GiangViens";
      const res = await axiosInstance.post(url, data);
      console.log("Kết quả thêm giảng viên: ", data, res.data);
      if (res.status === 201) {
        dispatch(add(res.data.giangvien));
      }
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log("Lỗi khi thêm giảng viên: ", err);
      return { status: err.status, data: err.data };
    }
  },
  getAll: async function (dispatch) {
    try {
      let url = "/GiangViens";
      const res = await axiosInstance.get(url);
      if (res.status === 200) {
        dispatch(updateList(res.data.giangviens));
        console.log(
          "Kết quả trả về khi lấy danh sách giảng viên: ",
          res.data.giangviens
        );
      }
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log("Lỗi khi lấy ra danh sách giảng viên: ", err);
      return { status: err.status, data: err.data };
    }
  },
  getById: async function (id, dispatch) {
    try {
      let url = `/GiangViens/${id}`;
      const res = await axiosInstance.get(url);
      console.log("Kết quả trả về khi lấy giảng viên theo id; ", res.data);
      if (res.status === 200) {
        dispatch(changeCurrent(res.data));
      }
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log("Lỗi khi lấy ra giảng viên theo id: ", err);
      return { status: err.status, data: err.data };
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
        return { status: res.status, data: res.data };
      }
      return {};
    } catch (err) {
      console.log(`Lỗi khi xóa giảng viên có id=${id.id} : `, err);
      return { status: err.status, data: err.data };
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
        const res = await axiosInstance.put(url, data);
        console.log("Kết quả trả về khi cập nhật giảng viên: ", res);
        if (res.status === 200) {
          dispatch(changeCurrent(initialGiangVien));
          dispatch(editOne(data));
          return { status: res.status, data: res.data };
        }
      }
      return {};
    } catch (err) {
      console.log(`Lỗi khi cập nhập giảng viên có id=${data.id} : `, err);
      return { status: err.status, data: err.data };
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
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log(
        "Lỗi khi lấy danh sách sinh viên được tạo bởi giảng viên có id =",
        id
      );
      return { status: err.status, data: err.data };
    }
  },
  getAllPostByMaGV: async function (maGV) {
    try {
      let url = `/Users/username/${maGV}`;
      let dataUser = await axiosInstance.get(url);
      if(dataUser.status !== 200) {
        return dataUser;
      }
      let url2 = `/Posts/user/${dataUser.data.id}`;
      let res = await axiosInstance.get(url2);
      console.log(
        "Kết quả trả về  khi lấy danh sách bài viết được tạo bởi giảng viên có mã =",
        maGV,
        res.data
      );
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log(
        "Lỗi khi lấy danh sách bài viết được tạo bởi giảng viên có mã =",
        maGV
      );
      return { status: err.status, data: err.data };
    }
  },
};
