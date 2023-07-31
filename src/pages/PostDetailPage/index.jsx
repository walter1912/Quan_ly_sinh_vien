import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect } from "react";
import { useState } from "react";
import { postRequest } from "../../services/post/postRequest";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { decode } from "html-entities";
import { initialComment } from "../../models";
import { userRequest } from "../../services/user/userRequest";
import { commentRequest } from "../../services/comment/commentRequest";
import { commentActions } from "../../services/comment/commentSlice";
import { red } from "@mui/material/colors";
import { Share, MoreVert, Favorite } from "@mui/icons-material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import CommentItem from "./CommentItem";
import ReplyComment from "./ReplyComment";
import { favoriteRequest } from "../../services/favorite/favoriteRequest";

const PostDetailPage = (props) => {
  let { postId } = useParams();
  let postStore = useSelector((state) => state.post);
  const [openComment, setOpenComment] = useState(false);

  const userStore = useSelector((state) => state.user);

  const [currentPost, setCurrentPost] = useState(postStore.current);
  const [userCreatePost, setUserPost] = useState({
    ten: "undefined",
    tenGV: "",
  });

  const { allCmtRender, allRepCommentId } = useSelector(
    (state) => state.comment
  );

  const dispatch = useDispatch();

  // phần xử lý favorite
  const [numberLove, setNumberLove] = useState(0);
  //hàm đếm số người thích bài viết
  useEffect(() => {
    async function handle() {
      let res = await favoriteRequest.getByPostId(postId);
      let count = 0;
      Array.from(res).forEach((fav) => {
        if (fav.type === 1) count += 1;
      });
      setNumberLove(count);
    }
    handle();
  }, [numberLove, postId]);

  // phần xử lý lấy thông tin bài viết
  useEffect(() => {
    // lấy thông tin post

    async function handle() {
    
      await postRequest.getById(postId, dispatch);
      // lấy username từ user
      let userPost = await userRequest.getById(postStore.current.userId);
      // lấy thông tin user (có check xem là giảng viên hay là sinh viên) từ username của user
      //get infor isEdit = false vì thông tin của user này không phải là thông tin user của người đăng nhập
      let inforUser = await userRequest.getInfor(userPost, dispatch, false);
      // khi láy thông tin thì lấy từ table sinhVien hoặc là table giangVien nên cần xử lý lại
      // chỉ xử lý tự động khi isEdit = true
      if (inforUser.tenGV === "") {
        inforUser.ten = inforUser.tenSV;
      } else {
        inforUser.ten = inforUser.tenGV;
      }
      setUserPost(inforUser);
      let post = {
        ...postStore.current,
        username: userPost.username,
        avatar: userPost.username.slice(0, 1),
      };
      setCurrentPost(post);
    }
    handle();
  }, []);

  useEffect(()=> {
      //lấy danh sách comment từ postId
      async function handle(){
        await commentRequest.getAllCommentByPostId(postId, dispatch);
      }
      handle();
  }, [postId])
  //cập nhật danh sách comment khi nhấn vào các comment đã rep

  // hiển thị các cmt rep cmt vừa chọn
  function handleViewRepCmt(repCommentId) {
    dispatch(commentActions.addRepCmtId(repCommentId));
  }

  // phần xử lý favorite
  const [favorite, setFavorite] = useState(true);

  async function handleAddFavorite() {
    setFavorite(!favorite);
    // kiểm tra xem đã tương tác chưa
    let checkFavorite = await favoriteRequest.checkExist(
      userStore.current.id,
      postId
    );
    // xử lý khi đã tương tác trước đó
    if (checkFavorite.status === 200) {
      let type = 2;
      if (favorite) type = 1;
      let dataUpdate = { ...checkFavorite.data, type };
      await favoriteRequest.update(dataUpdate);

      if (checkFavorite.data.type === 1) {
        if (type === 2) {
          setNumberLove((pre) => pre - 1); // đã thích sẵn và giờ không thích nữa
        }
      } else {
        if (type === 1) setNumberLove((pre) => pre + 1); //trước là không thích và giờ thích
      }
    }
    // thêm mới tương tác
    else {
      let type = 2;
      if (favorite) type = 1;
      let dataPost = {
        userId: userStore.current.id,
        postId,
        type,
      };
      await favoriteRequest.create(dataPost);
      if (type === 1) {
        setNumberLove((pre) => pre + 1);
      }
    }
  }
  return (
    <Grid
      container
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid xs={10}>
        <Card>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label={userCreatePost.ten}
              >
                {currentPost.avatar}
              </Avatar>
            }
            action={
              <PopupState variant="popover">
                {(popupState) => (
                  <React.Fragment>
                    <IconButton {...bindTrigger(popupState)}>
                      <MoreVert />
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem>
                        <Link to={`/posts/update/${postId}`}>
                          <Button>Cập nhật bài đăng</Button>
                        </Link>
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            }
            title={currentPost.title}
            subheader={
              moment(currentPost.createAt).format("MMMM Do YYYY") +
              " by " +
              userCreatePost.ten
            }
          />
          <CardMedia
            component="img"
            height="360px"
            image={currentPost.thumbnail}
            alt={currentPost.title}
          />
          <CardContent>
            <div
              dangerouslySetInnerHTML={{ __html: decode(currentPost.content) }}
            ></div>
          </CardContent>
          <CardActions disableSpacing>
            <Chip
              icon={
                <Favorite
                  onClick={() => handleAddFavorite()}
                  style={{
                    color: `${favorite ? "#ccc" : "var(--color-main)"}`,
                  }}
                />
              }
              label={numberLove}
            />

            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
      <Grid xs={6}>
        <List>
          <ListItem key={0}>
            <div
              onClick={() => {
                setOpenComment(!openComment);
              }}
            >
              {!openComment ? "bình luận" : "ẩn"}
            </div>
            {openComment ? (
              <ReplyComment
                currentUser={userStore.current}
                user={userCreatePost}
                comment={{
                  ...initialComment,
                  postId: currentPost.id,
                  level: -1,
                }}
              />
            ) : (
              <></>
            )}
          </ListItem>
          {allCmtRender.map((comment, index) => {
            if (comment.postId === postId)
              return (
                <CommentItem
                  comment={comment}
                  key={index + 1}
                  handleViewRepCmt={handleViewRepCmt}
                  allRepCommentId={allRepCommentId}
                  currentUser={userStore.current}
                />
              );
            else return <></>;
          })}
        </List>
      </Grid>
    </Grid>
  );
};

PostDetailPage.propTypes = {};

export default PostDetailPage;
