import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { khoaRequest } from "../../services/khoa/khoaRequest";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2";
import { Groups, PeopleOutline } from "@mui/icons-material";
import { HrHeader } from "../../components/HrHeader";

const KhoaPage = (props) => {
  let khoa = useSelector((state) => state.khoa);
  const dispatch = useDispatch();
  useEffect(() => {
    async function handle() {
      await khoaRequest.getAll(dispatch);
    }
    if(khoa.length < 2) handle();
  }, [khoa.length, dispatch]);
  return (
    <Grid container style={{display:'flex',  flexDirection: "column", alignItems:"center"}}>
      <Grid xs={8}>
        <HrHeader style={{width:"400px"}}>
        <span>DANH SÁCH CÁC KHOA</span>
        </HrHeader>
        <List
         style={{width: "100%"}}
        >
          {khoa.map((k, index) => (
            <>
            <KhoaItem khoa={k} key={index} />
            <Divider />
            </>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
KhoaPage.propTypes = {};
const ItemIcon = styled(IconButton)((props) => ({
  color: "var(--color-main)",
  lineHeight: "10px",
  width: "100px",
}));
const KhoaItem = (props) => {
  const { khoa } = props;

  function convertToIcon(str) {
    let words = str.split(" ");
    let acronym = words.map(function (word) {
      return word.charAt(0).toUpperCase();
    });
    return acronym.join("");
  }
  var icon = convertToIcon(khoa.ten);
  return (
    <ListItem disablePadding id={khoa.id}>
      <ListItemButton sx={{ display: "flex", flexDirection: "row" }}>
        <ItemIcon>{icon}</ItemIcon>
        <Tooltip title="Xem chi tiết khoa">
          <Link
            to={`${khoa.id}`}
            state={{ viewGiangVien: true, viewSinhVien: true }}
            style={{ width: "60%", textAlign: "center" }}
          >
            <span>
              <strong>{khoa.ten}</strong>
            </span>
          </Link>
        </Tooltip>
        <Link
          to={`${khoa.id}`}
          state={{ viewGiangVien: false, viewSinhVien: true }}
          style={{ width: "15%" }}
        >
          <Tooltip title="xem danh sách sinh viên" followCursor>
            <IconButton>
              <Groups />
            </IconButton>
          </Tooltip>
        </Link>
        <Link
          to={`${khoa.id}`}
          state={{ viewGiangVien: true, viewSinhVien: false }}
          style={{ width: "15%" }}
        >
          <Tooltip title="xem danh sách giảng viên" followCursor>
            <IconButton>
              <PeopleOutline />
            </IconButton>
          </Tooltip>
        </Link>
      </ListItemButton>
    </ListItem>
  );
};
export default KhoaPage;
