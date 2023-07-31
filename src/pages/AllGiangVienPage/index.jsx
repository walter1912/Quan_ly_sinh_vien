import { useDispatch, useSelector } from "react-redux";
import { giangvienRequest } from "../../services/giangvien/giangvienRequest";
import { giangvienActions } from "../../services/giangvien/giangvienSlice";
import ListGiangVien from "../../components/ListGiangVien";
import SearchItem from "../../components/SearchItem";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { actions } from "../../services/response/responseSlice";

const AllGiangVienPage = (props) => {
  const dispatch = useDispatch();
  const storeGiangVien = useSelector((state) => state.giangVien);
  useEffect(() => {
    async function handle() {
      const res = await giangvienRequest.getAll(dispatch);
      dispatch(actions.otherMethods(res));
    }
    handle();
  }, [storeGiangVien.currentRender, dispatch]);

  return (
    <Container>
      <SearchItem dispatch={dispatch} searchSlice={giangvienActions.search} />
      <ListGiangVien />
    </Container>
  );
};

AllGiangVienPage.propTypes = {};

export default AllGiangVienPage;
