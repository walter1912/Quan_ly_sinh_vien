import {  useSelector } from "react-redux";

import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { Article, Groups } from "@mui/icons-material";
import moment from "moment";
import { Link } from "react-router-dom";

const GiangVien = (props) => {
  let giangvien = props.giangvien;
  const khoa = useSelector((state) => state.khoa);
  const { id, maGV, tenGV, ngaySinh, gioiTinh, khoaId } = giangvien;
  var khoaGV = khoa.find((khoa) => khoa.id === khoaId);
  // console.log("tên khoa Sinh viên: ", maGV, khoaGV.ten);

  return (
    <TableRow hover>
      <TableCell align="center">{id}</TableCell>
      <TableCell align="center">{maGV} </TableCell>
      <TableCell align="center">{tenGV} </TableCell>
      <TableCell align="center">
        {moment(ngaySinh).format("DD-MM-YYYY")}{" "}
      </TableCell>
      <TableCell align="center">{khoaGV.ten} </TableCell>
      <TableCell align="center">{gioiTinh} </TableCell>
      <TableCell>
        <Tooltip title="xem danh sách sinh viên" followCursor>
          <Link
            to={`/giangviens/${id}`}
            state={{ viewSinhViens: true, viewPosts: false }}
          >
            <IconButton>
              <Groups />
            </IconButton>
          </Link>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title="xem danh sách bài đăng" followCursor>
          <Link
            to={`/giangviens/${id}`}
            state={{ viewSinhViens: false, viewPosts: true }}
          >
            <IconButton>
              <Article />
            </IconButton>
          </Link>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

GiangVien.propTypes = {};

export default GiangVien;
