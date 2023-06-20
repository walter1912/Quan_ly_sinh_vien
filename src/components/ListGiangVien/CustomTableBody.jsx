import { TableBody } from "@mui/material";
import GiangVien from "./GiangVien";


var rows = [];
const CustomTableBody = ({ page, rowsPerPage, listGiangVien }) => {
  
  rows = listGiangVien.map((gv) => gv);
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((giangvien, index) => {
          return <GiangVien key={index} giangvien={giangvien} />;
        })}
    </TableBody>
  );
};

CustomTableBody.propTypes = {};

export { rows };
export default CustomTableBody;
