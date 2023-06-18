import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { TableBody } from "@mui/material";
import SinhVien from "./SinhVien";
import { useDispatch, useSelector } from "react-redux";

var rows = [];
const CustomTableBody = ({ page, rowsPerPage, listSinhVien }) => {
  
  rows = listSinhVien.map((sv) => sv);
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((sinhvien, index) => {
          return <SinhVien key={index} sinhvien={sinhvien} />;
        })}
    </TableBody>
  );
};

CustomTableBody.propTypes = {};

export { rows };
export default CustomTableBody;
