import styled from "@emotion/styled";
import { Search, Share } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";

const ImgDes = styled("div")((props) => ({
    position: "relative",
    width: "360px",
    height: "204px",
  
    "&:hover .overlay": {
      display: "block",
    },
  }));
  
  const Overlay = styled("div")((props) => ({
    display: "none",
    position: "absolute",
    top: "0",
    right: "0",
    left: "0",
    bottom: "0",
    background: "rgba(0, 0, 0, 0.5)",
    // opacity:'0'
  }));
  const Btnmore = styled("div")((props) => ({
    position: "absolute",
    bottom: 0,
    height: "48px",
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    "& .btn-more": {
      display: "flex",
      flex: 1,
      opacity: 0.8,
      borderRadius: 0,
    },
    ".btn-more:first-of-type": {
      borderRight: "1px solid white",
    },
  }));
  function PostItem({ data }) {
    return (
      <Grid xs={2} sm={4} md={4} style={{display:"flex", flexDirection:"column", width:"380px"}} >
        <ImgDes>
          <img
            src={data.thumbnail}
            alt={data.title}
            title={data.title}
            width="360px"
            height="204px"
          />
          <Overlay className="overlay">
            <Btnmore>
              <Link to={`/posts/${data.id}`} className="btn-more btn-main">
                {" "}
                <Search />
              </Link>
              <Link to="https://www.facebook.com/" className="btn-more btn-main">
                <Share />
              </Link>
            </Btnmore>
          </Overlay>
        </ImgDes>
        <Link to={`/posts/${data.id}`} className="text-hover">
          <h6 className="text-center">{data.title}</h6>
        </Link>
     </Grid>
    );
  }

  export default PostItem;