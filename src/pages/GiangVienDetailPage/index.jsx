import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { giangvienRequest } from "../../services/giangvien/giangvienRequest";
import ListSinhVien from "../../components/ListSinhVien";
import PostItem from "../../components/PostItem";
import { HrHeader } from "../../components/HrHeader";
import { updateCurrentRender } from "../../services/sinhvien/sinhvienSlice";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { actions } from "../../services/response/responseSlice";

const GiangVienDetailPage = (props) => {
  const { giangVienId } = useParams();

  const { state } = useLocation();

  let viewPosts = true;
  let viewSinhViens = true;
  if (state !== null) {
    viewPosts = state.viewPosts;
    viewSinhViens = state.viewSinhViens;
  }
  var giangVienStore = useSelector((state) => state.giangVien);
  console.log("giangvien current: ", giangVienStore);
  const [listPost, setListPost] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function handle() {
      const resGV = await giangvienRequest.getById(giangVienId, dispatch);
      dispatch(actions.otherMethods(resGV));
      // xử lý khi muốn xem danh sách sinh viên đã tạo

      if (viewSinhViens) {
        const resSV = await giangvienRequest.getAllSinhVienById(
          giangVienStore.current.id
        );
        dispatch(updateCurrentRender(resSV.data.sinhviens));
        dispatch(actions.otherMethods(resSV));
      }
      // xử lý khi muốn xem bài đăng
      if (viewPosts) {
        const resP = await giangvienRequest.getAllPostByMaGV(
          giangVienStore.current.maGV
        );
        setListPost(resP.data.posts);
        dispatch(actions.otherMethods(resP));
      }
    }
    handle();
  }, [viewPosts,viewSinhViens, dispatch, giangVienId, giangVienStore]);

  console.log("list post: ", listPost);
  return (
    <Grid2
      container
      spacing={4}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3>Giảng viên {giangVienStore.current.tenGV}</h3>
      <Link state={{ isEditGiangVien: true }} to={"/giangviens/create"}>
        Chỉnh sửa thông tin
      </Link>
      <Grid2 xs={10}>
        <HrHeader style={{ width: "100%" }}>
          <span>Danh sách sinh viên được tạo</span>
        </HrHeader>
        <ListSinhVien />
      </Grid2>
      {listPost.length > 0 && (
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <HrHeader>
            <span>Tin tức</span>
          </HrHeader>

          {listPost.map((post, index) => (
            <PostItem data={post} key={index} />
          ))}
        </Grid2>
      )}
    </Grid2>
  );
};

GiangVienDetailPage.propTypes = {};

export default GiangVienDetailPage;
