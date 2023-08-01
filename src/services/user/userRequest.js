import axiosInstance from "../../utils/axiosInstance";
import { setLocalStorage } from "../../utils/localStorage";
import { actions } from "../response/responseSlice";
import { userActions } from "./userSlice";

const { add, changeCurrent } = userActions;
export const userRequest = {
  register: async function (data, dispatch) {
    try {
      let url = `/Users/register`;

      const res = await axiosInstance.post(url, data);
      console.log("Kết quả thêm tài khoản: ", res);
      if (res.status === 201) {
        dispatch(add(res.data.user));
        dispatch(changeCurrent(res.data.user));
      }
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log("Lỗi khi thêm tài khoản: ", err);
      return { status: err.status, data: err.data };
    }
  },
  getById: async function (id) {
    try {
      let url = `/Users/${id}`;
      const res = await axiosInstance.get(url);
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log("Lỗi khi get user có id=", id, err);
      return { status: err.status, data: err.data };
    }
  },
  getInfor: async function (data, dispatch, isChange) {
    try {
      if (data.username.includes("GV")) {
        try {
          let url = `/GiangViens/maGV/${data.username}`;
          const res = await axiosInstance.get(url);
          if (res.status === 200) {
            console.log(
              "lấy thông tin giảng viên thành công: ",
              res.data.giangvien
            );
            if (isChange) {
              const { tenGV: ten, maGV: ma } = res.data.giangvien;
              delete res.data.giangvien.tenGV;
              delete res.data.giangvien.maGV;
              const user = {
                ...res.data.giangvien,
                ten,
                ma,
              };
              dispatch(changeCurrent(user));
              console.log("dispatch(changeCurrent(user)) giảng viên: ", user);
            }
            res.data.user = res.data.giangvien;
          }
          return { status: res.status, data: res.data };
        } catch (errGV) {
          console.log("Lấy thông tin giảng viên bị lỗi: ", errGV.data);
          return { status: errGV.status, data: errGV.data };
        }
      } else {
        try {
          let url = `/SinhViens/maSV/${data.username}`;
          const res = await axiosInstance.get(url);
          if (res.status === 200) {
            console.log(
              "lấy thông tin sinh viên thành công: ",
              res.data.sinhvien
            );
            if (isChange) {
              const { tenSV: ten, maSV: ma } = res.data.sinhvien;
              delete res.data.sinhvien.tenSV;
              delete res.data.sinhvien.maSV;
              const user = {
                ...res.data.sinhvien,
                ten,
                ma,
              };
              dispatch(changeCurrent(user));
              console.log("dispatch(changeCurrent(user)) sinh viên: ", user);
            }
            res.data.user = res.data.giangvien;
          }
          return { status: res.status, data: res.data };
        } catch (errSV) {
          console.log("Lấy thông tin sinh viên bị lỗi: ", errSV.data);
          return { status: errSV.status, data: errSV.data };
        }
      }
    } catch (err) {
      console.log("Lỗi khi lấy thông tin user: ", err);
      return { status: err.status, data: err.data };
    }
  },
  checkLogin: async function (data, dispatch) {
    try {
      let url = `/Users/login`;
      const res = await axiosInstance.post(url, data);
      if (res.status === 200) {
        console.log("login thành công");
        dispatch(changeCurrent(res.data.user));
        setLocalStorage("accessToken", res.data.accessToken);
      }
      return { status: res.status, data: res.data };
    } catch (err) {
      console.log("Lỗi khi đăng nhập: ", err);
      return { status: err.status, data: err.data };
    }
  },
};
