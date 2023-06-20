import React from "react";
import { Alert, Button, IconButton, List, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { userRequest } from "../../services/user/userRequest";
import Grid from "@mui/material/Unstable_Grid2";
import styled from "@emotion/styled";
import {
  AlternateEmail,
  Badge,
  Cake,
  MoreVert,
  Place,
  Source,
  Transgender,
} from "@mui/icons-material";
import moment from "moment/moment";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import FormPassword from "./FormPassword";
import ItemInfo from "./ItemInfo";
import { userActions } from "../../services/user/userSlice";
import { giangvienRequest } from "../../services/giangvien/giangvienRequest";
import { sinhvienRequest } from "../../services/sinhvien/sinhvienRequest";
import CustomSnackbar from "../../components/CustomSnackbar";
import { Link } from "react-router-dom";

const Information = styled(Grid)((props) => ({
  backgroundColor: "#fafafa",
  position: "relative",
}));

const MoreActions = styled("div")((props) => ({
  position: "absolute",
  right: 10,
  top: 10,
  backgroundColor: "#ccc",
}));

const UserPage = (props) => {
  const user = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState(user.current);
  const [isEdit, setIsEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [messageAlert, setMessageAlert] = useState("Chỉnh sửa user thành công");
  const [severity, setVeverity] = useState("success");

  const dispatch = useDispatch();

  // kiểm tra xem đã tạo giảng viên hoặc sinh viên chưa;
  const [checkInforUser, setCheckInforUser] = useState({
    role: 0,
    ma: "ma",
    info: {},
    mes: "chưa tạo",
  });
  const [oneGet, setOneGet] = useEffect(true);
  useEffect(() => {
    const fetchUserInformation = async () => {
      setOneGet(false);
      const response = await userRequest.getInfor(user.current, dispatch, true);
      // kiểm tra xem đã có giangvien hoặc sinhvien có mã = user.current.username chưa
      if (response.status === 404) {
        let role = user.current.role;
        let ma = user.current.username;
        if (ma.includes("GV")) {
          setCheckInforUser({
            role: role,
            ma: "GV",
            info: {
              maGV: ma,
            },
            mes: `Bạn chưa tạo giảng viên có mã ${ma}`,
          });
        } else {
          setCheckInforUser({
            role: role,
            ma: "SV",
            info: {
              maSV: ma,
            },
            mes: `Bạn chưa tạo sinh viên có mã ${ma}`,
          });
        }
      }
      if (response) {
        setCurrentUser(user.current);
      }
    };
    if(oneGet) fetchUserInformation();
  }, [dispatch, user, oneGet]);

  // hàm cập nhật thông tin currentUser
  async function handleUpdateUser() {
    console.log("Cập nhật current User ở  localStorage: ", user.current);

    //cập nhật nếu là giảng viên
    if (currentUser.ma.includes("GV")) {
      const {
        id,
        ten: tenGV,
        ma: maGV,
        ngaySinh,
        gioiTinh,
        khoaId,
        email,
      } = currentUser;
      const data = { id, tenGV, maGV, ngaySinh, gioiTinh, khoaId, email };
      const res = await giangvienRequest.update(data, dispatch);
      console.log("res  giangvienRequest.update(data, dispatch): ", res);
      if (res.status !== 200) {
        if (res.data.errors !== undefined)
          setMessageAlert(JSON.stringify(res.data.errors));
        else setMessageAlert("Chỉnh sửa thông tin giảng viên không thành công");
        setVeverity("error");
      } else {
        setMessageAlert("Chỉnh sửa giảng viên thành công!");

        dispatch(userActions.changeCurrent(currentUser));
      }
    }
    //cập nhật nếu là sinh viên
    else if (currentUser.ma.includes("DC")) {
      const {
        id,
        ten: tenSV,
        ma: maSV,
        ngaySinh,
        gioiTinh,
        khoaId,
        giangVienId,
      } = currentUser;
      const data = { id, tenSV, maSV, ngaySinh, gioiTinh, khoaId, giangVienId };

      const res = await sinhvienRequest.update(data, dispatch);

      if (res.status !== 200) {
        if (res.data.errors !== undefined)
          setMessageAlert(JSON.stringify(res.data.errors));
        else setMessageAlert("Chỉnh sửa sinh viên không thành công!!!");
        setVeverity("error");
      } else {
        setMessageAlert("Chỉnh sửa sinh viên thành công!");

        dispatch(userActions.changeCurrent(currentUser));
      }
    }
  }

  // user.current, currentUser, dispatch
  console.log("currentUser: ", currentUser);
  return (
    <Grid
      container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {checkInforUser.role !== 0 && (
        <Grid>
          <Alert severity="warning"> {checkInforUser.mes}</Alert>
          <Button variant="contained">
            <Link
              state={{ isEditGiangVien: false, isEditSinhVien: false , ma: currentUser.username }}
              to={`${
                checkInforUser.ma === "GV"
                  ? "/giangviens/create"
                  : "/sinhviens/create"
              }`}
            >
              Tạo {checkInforUser.ma}
            </Link>
          </Button>
        </Grid>
      )}
      <Information xs={8}>
        <h2>Thông tin cá nhân</h2>
        <List>
          <ItemInfo
            icon={<Badge />}
            destext={"Tên người dùng: "}
            text={currentUser.ten}
            onChange={(e) => {
              setCurrentUser((pre) => {
                let ten = e.target.value;
                return { ...pre, ten };
              });
            }}
            isedit={isEdit}
          />
          <ItemInfo
            icon={<Source />}
            destext={"Mã người dùng: "}
            text={currentUser.ma}
            onChange={(e) => {
              setCurrentUser((pre) => {
                let ma = e.target.value;
                return { ...pre, ma };
              });
            }}
            isedit={isEdit}
          />
          <ItemInfo
            icon={<Cake />}
            destext={"Ngày sinh: "}
            text={moment(currentUser.ngaySinh).format("DD-MM-YYYY")}
            onChange={(e) => {
              setCurrentUser((pre) => {
                let ngaySinh = e.target.value;
                return { ...pre, ngaySinh };
              });
            }}
            isedit={isEdit}
          />
          <ItemInfo
            icon={<Transgender />}
            destext={"Giới tính: "}
            text={currentUser.gioiTinh}
            onChange={(e) => {
              setCurrentUser((pre) => {
                let gioiTinh = e.target.value;
                return { ...pre, gioiTinh };
              });
            }}
            isedit={isEdit}
          />
          <ItemInfo
            icon={<AlternateEmail />}
            destext={"Email: "}
            text={currentUser.email ?? "user@gmail.com"}
            onChange={(e) => {
              setCurrentUser((pre) => {
                let email = e.target.value;
                return { ...pre, email };
              });
            }}
            isedit={isEdit}
          />
          <ItemInfo
            icon={<Place />}
            destext={"Địa chỉ: "}
            text={
              currentUser.address ??
              "Học viện Công nghệ Bưu chính Viễn thông Hà Nội"
            }
            onChange={(e) => {
              setCurrentUser((pre) => {
                let address = e.target.value;
                return { ...pre, address };
              });
            }}
            isedit={isEdit}
          />
        </List>
        <MoreActions>
          <PopupState variant="popover">
            {(popupState) => (
              <React.Fragment>
                <IconButton {...bindTrigger(popupState)}>
                  <MoreVert />
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  >
                    Chỉnh sửa thông tin chung
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setEditPassword(true);
                    }}
                  >
                    Đổi mật khẩu
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
          {isEdit && (
            <CustomSnackbar
              handleClick={() => {
                handleUpdateUser();
              }}
              messageAlert={messageAlert}
              severity={severity}
              txtBtn={"Lưu thông tin"}
            />
          )}
        </MoreActions>
        {editPassword && (
          <FormPassword user={currentUser} editPassword={editPassword} />
        )}
      </Information>
    </Grid>
  );
};

UserPage.propTypes = {};

export default UserPage;
