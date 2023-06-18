import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { khoaRequest } from "../../services/khoa/khoaRequest";
import ListSinhVien from "../../components/ListSinhVien";
import ListGiangVien from "../../components/ListGiangVien";
import { useDispatch, useSelector } from "react-redux";
import { giangvienActions } from "../../services/giangvien/giangvienSlice";
import { updateCurrentRender } from "../../services/sinhvien/sinhvienSlice";
import { HrHeader } from "../../components/HrHeader";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const KhoaDetailPage = (props) => {
  let { khoaId } = useParams();
  let { state } = useLocation();
  let { viewGiangVien, viewSinhVien } = state;
  const khoas = useSelector(state => state.khoa);

  const dispatch = useDispatch();
  useEffect(() => {
    async function handle() {
      if (viewGiangVien) {
        let listGV = await khoaRequest.getAllGiangVienByKhoa(khoaId);
        dispatch(giangvienActions.updateListRender(listGV.giangVien));
      }

      if (viewSinhVien) {
        let listSV = await khoaRequest.getAllSinhVienByKhoa(khoaId);
        dispatch(updateCurrentRender(listSV.sinhVien));
      }
    }
    handle();
  }, [khoaId]);

  return (
    <Grid2 container spacing={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
     <h2 style={{textAlign:"center"}}>Khoa {khoas[khoaId - 1].ten}</h2>
      {viewSinhVien && (
        <Grid2 xs={10} >
          <HrHeader style={{ width: "500px"}}>
            <span>Danh sách sinh viên</span>
          </HrHeader>
          <ListSinhVien style={{with:"100%"}}/>
        </Grid2>
      )}
      {viewGiangVien && (
        <Grid2 xs={10}>
          <HrHeader style={{ width: "500px" }}>
            <span>Danh sách giảng viên</span>
          </HrHeader>
          <ListGiangVien />
        </Grid2>
      )}
    </Grid2>
  );
};

KhoaDetailPage.propTypes = {};

export default KhoaDetailPage;
