import { useDispatch, useSelector } from 'react-redux';
import { giangvienRequest } from '../../services/giangvien/giangvienRequest';
import { giangvienActions } from '../../services/giangvien/giangvienSlice';
import ListGiangVien from '../../components/ListGiangVien';
import SearchItem from '../../components/SearchItem';
import { Container } from '@mui/material';
import { useEffect } from 'react';

const AllGiangVienPage = props => {
    const dispatch = useDispatch();
  const storeGiangVien = useSelector((state) => state.giangVien);
  useEffect(() => {
    giangvienRequest.getAll(dispatch);
  }, [storeGiangVien.currentRender, dispatch]);

  return (
    <Container>
      <SearchItem dispatch={dispatch} searchSlice={giangvienActions.search} />
      <ListGiangVien />
    </Container>
  );
};

AllGiangVienPage.propTypes = {
    
};

export default AllGiangVienPage;