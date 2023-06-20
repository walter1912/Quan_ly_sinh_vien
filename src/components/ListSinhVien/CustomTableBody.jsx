import { TableBody } from "@mui/material";
import SinhVien from "./SinhVien";

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
