import  { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { sinhvienRequest } from "../../services/sinhvien/sinhvienRequest";
import { khoaRequest } from "../../services/khoa/khoaRequest";

import moment from "moment/moment";
// dùng formik
import {  Formik } from "formik";
import { initialSinhVien } from "../../models";
import {
  ButtonGroup,
  Button,
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

const CRUDSinhVien = (props) => {
  // dùng useContext để lấy sinhVien hiện tại (có thể được lấy khi mình nhấn nút chỉnh sửa ở Component ListSinhVien)
  // let sinhVien = useSinhVien();

  //dùng redux
  let giangVienStore = useSelector((state) => state.giangVien);
  const dispatch = useDispatch();

  // lấy ra danh sách các khoa
  const khoas = useSelector((state) => state.khoa);
  useEffect(() => {
    async function handle() {
      await khoaRequest.getAll(dispatch);
    }
    if (khoas.length < 1) handle();
  }, [dispatch, khoas.length]);
  const dataList = khoas.map((k) => ({ id: k.id, value: k.ten }));


  let storeSinhVien = useSelector((state) => state.sinhVien);
  const [sinhVien, setSinhVien] = useState(storeSinhVien.current);

  //kiểm tra xem là tạo mới sinh viên hay là cập nhật
  const { state } = useLocation();
  let isEditSinhVien = false;
 if(state != null) {
    isEditSinhVien = state.isEditSinhVien;
 }
  
  const [ngaySinh, setNgaySinh] = useState(
    moment(storeSinhVien.current.ngaySinh) ?? moment()
  );
  // sinhVien sẽ luôn được cập nhật nên là dùng useEffect để cập nhật các trường nhập sinh viên.
  useEffect(() => {
    function handle() {
      setSinhVien(initialSinhVien);
      setNgaySinh(moment());
    }
    if (isEditSinhVien === false) handle();
  }, [isEditSinhVien]);

  function checkForm(sinhVien) {
    let allFielded = true;
    // neu co truong chua nhap thi khong luu
    function logWarning(element, text) {
      allFielded = false;
      let e = document.getElementById(element);
      e.innerText = `Vui lòng nhập ${text}`;
      e.style.display = "block";
    }
    // gỡ lỗi khi người dùng đã điền vào input
    function unLogWarning(element) {
      document.getElementById(element).style.display = "none";
    }

    // hiển thị ra lỗi trường trống

    if (sinhVien.maSV.trim() === "") logWarning("warningMaSV", "mã sinh viên");
    else unLogWarning("warningMaSV");
    if (sinhVien.tenSV.trim() === "")
      logWarning("warningTenSV", "tên sinh viên");
    else unLogWarning("warningTenSV");
    if (sinhVien.khoaId === 0) logWarning("warningKhoa", "tên khoa");
    else unLogWarning("warningKhoa");
    return allFielded;
  }
  function handleAdd(sinhVien) {
    if (checkForm(sinhVien)) {
      const data = {
        ...sinhVien,
        ngaySinh: ngaySinh.format(),
        giangVienId: giangVienStore.current.id,
      };
      // nếu tất cả các trường đã nhập thì sẽ dùng reducer để thêm sinhVien vào ListSinhVien
      sinhvienRequest.create(data, dispatch);
      setSinhVien(initialSinhVien);
    }
  }

  // hàm xác nhận edit sinhVien
  function handleEdit(sinhVien) {
    if (checkForm(sinhVien)) {
      const data = { ...sinhVien, ngaySinh: ngaySinh.format() };

      sinhvienRequest.update(data, dispatch);
      setSinhVien(initialSinhVien);
    }
  }

  function handleDeleteAll() {
    let listToDelete = document.querySelectorAll(".sinhvienCheck");
    for (let i = 0; i < listToDelete.length; i++) {
      if (listToDelete[i].checked) {
        sinhvienRequest.delete(listToDelete[i].value, dispatch);
      }
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={sinhVien}
        onSubmit={() => this.preventDefault()}
      >
        {(props) => (
          <FormControl
            style={{
              width: "100%",
              backgroundColor: "var(--color-bg)",
              padding: "20px 10px",
            }}
          >
            <ButtonGroup
              variant="contained"
              fullWidth
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                margin: "0",
              }}
            >
              <Button
                color="success"
                id="themSV"
                onClick={() => handleAdd(props.values)}
              >
                Thêm mới
              </Button>
              <Button
                color="primary"
                id="capnhapSV"
                onClick={() => handleEdit(props.values)}
              >
                Cập nhật
              </Button>
              <Button
                color="secondary"
                id="xoaSV"
                onClick={() => handleDeleteAll()}
              >
                Xóa
              </Button>
            </ButtonGroup>
            <TextField
              type="text"
              id="maSV"
              label="Mã SV "
              name="maSV"
              value={props.values.maSV}
              onChange={props.handleChange}
              sx={{ margin: "20px 0" }}
            />
            <span className="text--warning " id="warningMaSV"></span>
            <TextField
              type="text"
              id="tenSV"
              label="Tên SV "
              name="tenSV"
              value={props.values.tenSV}
              onChange={props.handleChange}
              sx={{ margin: "20px 0" }}
            />
            <span className="text--warning" id="warningTenSV"></span>
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
              value={props.values.gioiTinh}
              onChange={props.handleChange}
              sx={{ margin: "20px 0" }}
            >
              <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
              <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
            </RadioGroup>
            <FormControl style={{ margin: "20px 0" }}>
              <InputLabel id="khoaId">Tên khoa</InputLabel>
              <Select
                id="khoaId"
                name="khoaId"
                value={props.values.khoaId}
                defaultValue={1}
                onChange={props.handleChange}
                label="Tên khoa"
              >
                {dataList.map((khoa, index) => (
                  <MenuItem key={index} value={khoa.id}>
                    {khoa.value}
                  </MenuItem>
                ))}
              </Select>
              <span className="text--warning" id="warningKhoa"></span>
            </FormControl>
          </FormControl>
        )}
      </Formik>
    </>
  );
};

CRUDSinhVien.propTypes = {};

export default CRUDSinhVien;
