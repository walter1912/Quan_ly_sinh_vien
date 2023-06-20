import { Formik } from "formik";
import { initialGiangVien } from "../../models";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useState } from "react";
import { giangvienRequest } from "../../services/giangvien/giangvienRequest";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import moment from "moment/moment";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { khoaRequest } from "../../services/khoa/khoaRequest";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ErrorPage from "../ErrorPage";

const validationSchema = yup.object({
  tenGV: yup.string().required("Yêu cầu nhập tên giảng viên"),
  maGV: yup.string().required("Yêu cầu nhập mã giảng viên"),
  // ngaySinh:yup.date().required("Yêu cầu nhập ngày sinh của giảng viên"),
  gioiTinh: yup.string().required("Yêu cầu chọn giới tính"),
  email: yup.string().email().required("Yêu cầu nhập email"),
});
const CreateGiangVienpage = (props) => {
  const dispatch = useDispatch();

  // KIỂM TRA phân quyền
  const userStore = useSelector((state) => state.user);
  const giangVienStore = useSelector((state) => state.giangVien);
  var isCreate = false;
  if (userStore.current.username === giangVienStore.current.maGV) {
    isCreate = true;
  }
  // lấy ra danh sách các khoa
  const khoas = useSelector((state) => state.khoa);
  useEffect(() => {
    async function handle() {
      await khoaRequest.getAll(dispatch);
    }
    if (khoas.length < 1) handle();
  }, [dispatch,khoas.length ]);
  const dataList = khoas.map((k) => ({ id: k.id, value: k.ten }));
  //kiểm tra xem là cập nhật hay tạo mới
  let { state } = useLocation();
  var ma = undefined;
  var isEditGiangVien = true;
  if (state !== null) {
    isEditGiangVien = state.isEditGiangVien;
    ma = state.ma;
  }

  const [currentGiangVien, setCurrentGiangVien] = useState(initialGiangVien);

  useEffect(() => {
    function handle() {
      console.log("edit giảng viên");
      setCurrentGiangVien(giangVienStore.current);
    }

    if (isEditGiangVien) handle();
    if (ma !== undefined) {
      setCurrentGiangVien((pre) => ({ ...pre, maGV: ma }));
    }
  }, [ma, isEditGiangVien, giangVienStore]);

  const [messageAlert, setMessageAlert] = useState("tạo thành công");
  const [severity, setSeverity] = useState("success");
  const [ngaySinh, setNgaySinh] = useState(
    moment(giangVienStore.current.ngaySinh) ?? moment()
  );
  async function handleCreateGV(values) {
    let data = {
      ...values,
      ngaySinh: ngaySinh.format(),
    };
    console.log("create giangvien: ", data);
    let resp = await giangvienRequest.create(data, dispatch);

    setMessageAlert(resp.data.mes);
    if (resp.status !== 200) {
      setSeverity("error");
    }
  }
  async function handleEditGV(values) {
    let data = {
      ...values,
      id: giangVienStore.current.id,
      ngaySinh: ngaySinh.format(),
    };
    console.log("update giangvien: ", data);

    const res = await giangvienRequest.update(data, dispatch);
    console.log("res  giangvienRequest.update(data, dispatch): ", res);
    if (res.status !== 200) {
      if (res.data.errors !== undefined)
        setMessageAlert(JSON.stringify(res.data.errors));
      else setMessageAlert("Chỉnh sửa thông tin giảng viên không thành công");
      setSeverity("error");
    } else {
      setSeverity("success");
      setMessageAlert("Chỉnh sửa giảng viên thành công!");
    }
  }
  return isCreate ? (
    <Grid2
      container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid2 xs={6}>
        <Formik
          enableReinitialize
          initialValues={currentGiangVien}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (isEditGiangVien) {
              handleEditGV(values);
            } else {
              handleCreateGV(values);
            }
          }}
        >
          {({ touched, errors, values, handleChange, handleSubmit }) => (
            <FormControl
              style={{
                width: "100%",
                backgroundColor: "var(--color-bg)",
                padding: "20px 10px",
              }}
            >
              <TextField
                type="text"
                id="maGV"
                label="Mã GV "
                name="maGV"
                InputProps={{
                  readOnly: isEditGiangVien,
                }}
                value={values.maGV}
                onChange={handleChange}
                sx={{ margin: "20px 0" }}
                error={touched.maGV && Boolean(errors.maGV)}
                helperText={touched.maGV && errors.maGV}
              />
              <TextField
                type="text"
                id="tenGV"
                label="Tên GV "
                name="tenGV"
                value={values.tenGV}
                onChange={handleChange}
                sx={{ margin: "20px 0" }}
                error={touched.tenGV && Boolean(errors.tenGV)}
                helperText={touched.tenGV && errors.tenGV}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateField"]}>
                  <DateField
                    label="Ngày sinh"
                    name="ngaySinh"
                    value={ngaySinh}
                    id="ngaySinh"
                    onChange={(value) => {
                      console.log("onChange: ", value.format());
                      setNgaySinh(value);
                    }}
                    sx={{ margin: "20px 0" }}
                    fullWidth
                  />
                </DemoContainer>
              </LocalizationProvider>
              <label>Giới tính: </label>
              <RadioGroup
                name="gioiTinh"
                defaultValue={"Nam"}
                value={values.gioiTinh}
                onChange={handleChange}
                sx={{ margin: "20px 0" }}
                error={touched.gioiTinh && Boolean(errors.gioiTinh)}
                helperText={touched.gioiTinh && errors.gioiTinh}
              >
                <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
              </RadioGroup>
              <FormControl style={{ margin: "20px 0" }}>
                <InputLabel id="khoaId">Tên khoa</InputLabel>
                <Select
                  id="khoaId"
                  name="khoaId"
                  value={values.khoaId}
                  defaultValue={1}
                  onChange={handleChange}
                  label="Tên khoa"
                >
                  {dataList.map((khoa, index) => (
                    <MenuItem key={index} value={khoa.id}>
                      {khoa.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                type="email"
                id="email"
                label="Email "
                name="email"
                value={values.email}
                onChange={handleChange}
                sx={{ margin: "20px 0" }}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <CustomSnackbar
                severity={severity}
                txtBtn={isEditGiangVien ? "Lưu thông tin" : "Thêm giảng viên"}
                handleClick={handleSubmit}
                messageAlert={messageAlert}
              />
            </FormControl>
          )}
        </Formik>
      </Grid2>
    </Grid2>
  ) : (
    <ErrorPage message="Bạn không có quyền chỉnh sửa giảng viên" />
  );
};

CreateGiangVienpage.propTypes = {};

export default CreateGiangVienpage;
