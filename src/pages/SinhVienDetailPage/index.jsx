import React from "react";
import { useParams } from "react-router-dom";
import CRUDSinhVien from "../../components/CRUDSinhVien";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useSelector } from "react-redux";
import ErrorPage from "../ErrorPage";

const SinhVienDetailPage = (props) => {
  let { sinhVienId } = useParams();
  console.log("sihVienId: ", sinhVienId);
  const userStore = useSelector((state) => state.user);
  const giangVienStore = useSelector((state) => state.giangVien);
  const sinhVienStore = useSelector((state) => state.sinhVien);
  // KIỂM TRA ROLE
  var isEdit = false;
  if (userStore.current.role === 1) {
    isEdit = true;
  }

  if (
    userStore.current.username === sinhVienStore.current.maSV &&
    sinhVienId !== undefined &&
    sinhVienId == sinhVienStore.current.id
  ) {
    isEdit = true;
  }

  return isEdit ? (
    <Grid2
      container
      spacing={4}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {giangVienStore.current.id > 0 && (
        <h3>
          Giảng viên đã thêm sinh viên {giangVienStore.current.tenGV} có id ={" "}
          {giangVienStore.current.id}
        </h3>
      )}
      <Grid2 xs={6}>
        <CRUDSinhVien />
      </Grid2>
    </Grid2>
  ) : (
    <ErrorPage
      message={
        sinhVienId !== undefined
          ? "Bạn không thể chỉnh sửa sinh viên này"
          : "Bạn không thể thêm sinh viên"
      }
    />
  );
};

SinhVienDetailPage.propTypes = {};

export default SinhVienDetailPage;
