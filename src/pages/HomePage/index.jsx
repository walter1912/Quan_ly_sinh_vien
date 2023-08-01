import  { useEffect } from "react";

import { Box, Button, styled } from "@mui/material";
import { banner } from "../../assets/assets";
import Carousel from "react-material-ui-carousel";
import Grid from "@mui/material/Unstable_Grid2";

import { useDispatch, useSelector } from "react-redux";
import { postRequest } from "../../services/post/postRequest";

import PostItem from "../../components/PostItem";
import { HrHeader } from "../../components/HrHeader";
import { Link } from "react-router-dom";

const GridSection = styled(Grid)((props) => ({
  marginTop: "10px",
}));

const HomePage = (props) => {
  const { allPost } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
   async function handle(){
    await postRequest.getAll(dispatch);
   }
   handle();
  }, []);
  return (
    <Box component="a" sx={{ bgcolor: "#fafafa" }}>
      <Carousel>
        {banner.map((img, index) => (
          <img
            src={img.src}
            alt={img.title}
            title={img.title}
            width="60%"
            height="60%"
            className="d-flex m-auto"
            key={index}
          />
        ))}
      </Carousel>
      <GridSection
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <HrHeader>
          <span>Tin tức</span>
        </HrHeader>

        {allPost.slice(0, 6).map((post, index) => (
          <PostItem data={post} key={index} />
        ))}
       
      </GridSection>
      <Link to="/posts">
      <Button variant="outlined">
        Xem tất cả bài viết
        </Button>
        </Link>
    </Box>
  );
};
HomePage.propTypes = {};

export default HomePage;
