import React from "react";
import PropTypes from "prop-types";
import Editor from "./Editor";
import Grid from "@mui/material/Unstable_Grid2";
import { postRequest } from "../../services/post/postRequest";
import { useSelector } from "react-redux";
import ErrorPage from "../ErrorPage";

const CreatePost = (props) => {
  // KIỂM TRA ROLE
  const userStore = useSelector((state) => state.user);
  var isCreate = false;
  if (userStore.current.role === 1) {
    isCreate = true;
  }
  return isCreate ? (
    <Grid
      container
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Editor handleCRUDPost={postRequest.create} isUpdate={false} />
    </Grid>
  ) : (
    <ErrorPage message="Bạn không có quyền tạo bài viết, bạn chỉ có thể tương tác với bài viết" />
  );
};

CreatePost.propTypes = {};

export default CreatePost;
