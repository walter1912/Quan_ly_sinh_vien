import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { postRequest } from "../../services/post/postRequest";
import { userRequest } from "../../services/user/userRequest";
import Grid from "@mui/material/Unstable_Grid2";
import Editor from "../CreatePost/Editor";
import ErrorPage from "../ErrorPage";

const UpdatePostPage = (props) => {
  let { postId } = useParams();
  let postStore = useSelector((state) => state.post);
  const [currentPost, setCurrentPost] = useState(postStore.current);
  const dispatch = useDispatch();
  // kiểm tra xem user hiện tại có được chỉnh sửa hay không 
  let checkEditable = false;
  const userStore = useSelector(state => state.user);
  if(userStore.current.id === postStore.current.userId) {
    checkEditable = true;
  }
  // lấy dữ liệu bài viết
  useEffect(() => {
    async function handle() {
      await postRequest.getById(postId, dispatch);

      var userPost = await userRequest.getById(postStore.current.userId);
      var post = {
        ...postStore.current,
        username: userPost.username,
      };
      setCurrentPost(post);
    }
    handle();
  }, [dispatch, postId, postStore]);
  return (
      checkEditable ? <Grid
        container
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <p>Người đăng bài: {currentPost.username}</p>
        <Editor
          handleCRUDPost={postRequest.update}
          updatePost={currentPost}
          isUpdate={true}
        />
      </Grid>
      : <ErrorPage message="Bạn không có quyền chỉnh sửa vì bạn không phải người tạo bài viết" />

    
  
  );
};

UpdatePostPage.propTypes = {};

export default UpdatePostPage;
