import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrent } from "../../../services/sinhvien/sinhvienSlice";
import { sinhvienRequest } from "../../../services/sinhvien/sinhvienRequest";
import { IconButton, TableCell, TableRow } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SinhVien = (props) => {
  let sinhvien = props.sinhvien;
  const khoa = useSelector((state) => state.khoa);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // kiểm tra phân quyền
  var disabled = true;
  const userStore = useSelector((state) => state.user);

  if (userStore.current.role === 1) {
    disabled = false;
  }
  const sinhVienStore = useSelector((state) => state.sinhVien);
  if (sinhVienStore.current.maSV === userStore.current.username) {
    disabled = false;
  }

  // xử lý khi edit
  function handleEdit() {
    dispatch(changeCurrent(sinhvien));
  }
  function handleDelete() {
    sinhvienRequest.delete(sinhvien.id, dispatch);
  }
  const { id, maSV, tenSV, ngaySinh, gioiTinh, khoaId } = sinhvien;
  var khoaSV = khoa.find((khoa) => khoa.id === khoaId);
  // console.log("tên khoa Sinh viên: ", maSV, khoaSV.ten);
  return (
    <TableRow hover>
      <TableCell align="center">
        <input
          type="checkbox"
          className="sinhvienCheck"
          name="sinhvien"
          value={id}
        />
      </TableCell>
      <TableCell align="center">{id}</TableCell>
      <TableCell align="center">{maSV} </TableCell>
      <TableCell align="center">{tenSV} </TableCell>
      <TableCell align="center">
        {moment(ngaySinh).format("DD-MM-YYYY")}{" "}
      </TableCell>
      <TableCell align="center">{khoaSV.ten} </TableCell>
      <TableCell align="center">{gioiTinh} </TableCell>
      <TableCell>
        <Link
          onClick={() => handleEdit()}
          state={{ isEditSinhVien: true }}
          to={`/sinhviens/${sinhvien.id}`}
        >
          <IconButton>
            <Edit />
          </IconButton>
        </Link>
      </TableCell>
      <TableCell>
        <IconButton disabled={disabled} onClick={() => handleDelete()}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

SinhVien.propTypes = {};

export default SinhVien;
