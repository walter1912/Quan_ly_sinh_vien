import { useEffect } from "react";
import { Container } from "@mui/material";
import ListSinhVien from "../../components/ListSinhVien";
import { useDispatch, useSelector } from "react-redux";
import { sinhvienRequest } from "../../services/sinhvien/sinhvienRequest";
import SearchItem from "../../components/SearchItem";
import { search } from "../../services/sinhvien/sinhvienSlice";
import { actions } from "../../services/response/responseSlice";

const AllSinhVienPage = (props) => {
  const dispatch = useDispatch();
  const storeSinhvien = useSelector(state => state.sinhVien);
  useEffect(() => {
    async function handle() {
      const res = await sinhvienRequest.getAll(dispatch);
      dispatch(actions.otherMethods(res));
    }
    handle();
  }, [storeSinhvien.currentRender, dispatch]);

  return (
    <Container>
      <SearchItem dispatch={dispatch} searchSlice={search} />
      <ListSinhVien />
    </Container>
  );
};

AllSinhVienPage.propTypes = {};

export default AllSinhVienPage;
