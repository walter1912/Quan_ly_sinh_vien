import  { useEffect} from "react";
import { Container } from "@mui/material";
import ListSinhVien from "../../components/ListSinhVien";
import { useDispatch } from "react-redux";
import { sinhvienRequest } from "../../services/sinhvien/sinhvienRequest";
import SearchItem from "../../components/SearchItem";
import { search } from "../../services/sinhvien/sinhvienSlice";

const AllSinhVienPage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    sinhvienRequest.getAll(dispatch);
  }, [dispatch]);

  return (
    <Container>
      <SearchItem dispatch={dispatch} searchSlice={search} />
      <ListSinhVien />
    </Container>
  );
};

AllSinhVienPage.propTypes = {};

export default AllSinhVienPage;
