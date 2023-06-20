import { TableCell, TableHead, TableRow } from "@mui/material";
import { columns } from "./dataColumns";

const CustomTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{
              minWidth: column.minWidth,
              backgroundColor: "#7AA874",
              color: "#fff",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
