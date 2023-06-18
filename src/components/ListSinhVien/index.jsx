import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import CustomTableHead from "./CustomTableHead";
import CustomTableBody, { rows } from "./CustomTableBody";
import { useSelector } from "react-redux";
import { useState } from "react";

function ListSinhVien(props) {
  let listSinhVien = [];
  const sinhVienStore = useSelector((state) => state.sinhVien);
  if (sinhVienStore.currentRender.length > 0) {
    listSinhVien = sinhVienStore.currentRender;
  } else {
    listSinhVien = sinhVienStore.allSinhVien;
  }
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <CustomTableHead />
          <CustomTableBody
            page={page}
            rowsPerPage={rowsPerPage}
            listSinhVien={listSinhVien}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
export default ListSinhVien;
