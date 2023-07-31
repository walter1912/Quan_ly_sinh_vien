import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { khoaRequest } from "../../services/khoa/khoaRequest";
import ListSinhVien from "../../components/ListSinhVien";
import ListGiangVien from "../../components/ListGiangVien";
import { useDispatch, useSelector } from "react-redux";
import { giangvienActions } from "../../services/giangvien/giangvienSlice";
import { updateCurrentRender } from "../../services/sinhvien/sinhvienSlice";
import { HrHeader } from "../../components/HrHeader";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { actions } from "../../services/response/responseSlice";

const KhoaDetailPage = (props) => {
  let { khoaId } = useParams();

  let { state } = useLocation();
  let { viewGiangVien, viewSinhVien } = state;
  const khoas = useSelector((state) => state.khoa);
  let indexKhoa = 0;
  for (let i = 0; i < khoas.length; i++) {
    if (khoas[i].id == khoaId) {
      indexKhoa = i;
      break;
    }
  }
  const dispatch = useDispatch();
  useEffect(() => {
    async function handle() {
      if (viewGiangVien) {
        let res = await khoaRequest.getAllGiangVienByKhoa(khoaId);
        dispatch(giangvienActions.updateListRender(res.data.giangviens));
        dispatch(actions.otherMethods(res));
      }

      if (viewSinhVien) {
        let res = await khoaRequest.getAllSinhVienByKhoa(khoaId);
        dispatch(updateCurrentRender(res.data.sinhviens));
        dispatch(actions.otherMethods(res));
      }
    }
    handle();
  }, []);

  return (
    <Grid2
      container
      spacing={4}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2 style={{ textAlign: "center" }}>Khoa {khoas[indexKhoa].ten}</h2>
      {viewSinhVien && (
        <Grid2 xs={10}>
          <HrHeader style={{ width: "500px" }}>
            <span>Danh sách sinh viên</span>
          </HrHeader>
          <ListSinhVien style={{ with: "100%" }} />
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
