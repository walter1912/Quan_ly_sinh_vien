import axiosInstance from "../../utils/axiosInstance";
import { userActions } from "./userSlice";

const { add, changeCurrent } = userActions;
export const userRequest = {
  register: async function (data, dispatch) {
    try {
      let url = `/Users/register`;
      const res = await axiosInstance.post(url, data);
      console.log("Kết quả thêm tài khoản: ", res.data);
      dispatch(add(res.data.user));
      dispatch(changeCurrent(res.data.user));
      return {
        mes: res.data.mes,
        status: res.status,
      };
    } catch (err) {
      console.log("Lỗi khi thêm tài khoản: ", err);
      return {
        mes: err.data.mes,
        status: err.status,
      };
    }
  },
  getById: async function (id) {
    try {
      let url = `/Users/${id}`;
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (err) {
      console.log("Lỗi khi get user có id=", id, err);
    }
  },
  getInfor: async function (data, dispatch, isChange) {
    try {
      if (data.username.includes("GV")) {
        let url = `/GiangViens/maGV/${data.username}`;

        const res = await axiosInstance.get(url);
        if (res.data.status === 200) {
          console.log(
            "lấy thông tin giảng viên thành công: ",
            res.data.giangVien
          );
          if (isChange) {
            const { tenGV: ten, maGV: ma } = res.data.giangVien;
            delete res.data.giangVien.tenGV;
            delete res.data.giangVien.maGV;
            const user = {
              ...res.data.giangVien,
              ten,
              ma,
            };
            dispatch(changeCurrent(user));
            console.log("dispatch(changeCurrent(user)) giảng viên: ", user);
          }

          return res.data.giangVien;
        } else {
          console.log("Lấy thông tin giảng viên bị lỗi: ", res.data);
          return false;
        }
      } else {
        let url = `/SinhViens/maSV/${data.username}`;

        const res = await axiosInstance.get(url);
        if (res.data.status === 200) {
          console.log(
            "lấy thông tin sinh viên thành công: ",
            res.data.sinhVien
          );
          if (isChange) {
            const { tenSV: ten, maSV: ma } = res.data.sinhVien;
            delete res.data.sinhVien.tenSV;
            delete res.data.sinhVien.maSV;
            const user = {
              ...res.data.sinhVien,
              ten,
              ma,
            };
            dispatch(changeCurrent(user));
            console.log("dispatch(changeCurrent(user)) sinh viên: ", user);
          }

          return res.data.sinhVien;
        } else {
          console.log("Lấy thông tin sinh viên bị lỗi: ", res.data);
          return false;
        }
      }
    } catch (err) {
      console.log("Lỗi khi lấy thông tin user: ", err);
      return err;
    }
  },
  checkLogin: async function (data, dispatch) {
    try {
      const request = { ...data, id: 0, role: 0 };
      let url = `/Users/login`;
      const res = await axiosInstance.post(url, request);
      console.log("Data trả về: ", res);

      if (res.data.status === 200) {
        console.log("login thành công");
        dispatch(changeCurrent(res.data.user));
        return res.data;
      }
      console.log("đăng nhập lỗi");
      return data;
    } catch (err) {
      console.log("Lỗi khi đăng nhập: ", err);
      return err;
    }
  },
};
