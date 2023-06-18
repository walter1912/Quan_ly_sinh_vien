import {
  Avatar,
  Chip,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../services/user/userRequest";

import ReplyComment from "./ReplyComment";

const CommentItem = (props) => {
  const { comment, handleViewRepCmt, allRepCommentId, currentUser } = props;

  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  const [viewMore, setViewMore] = useState(true);
  const [openComment, setOpenComment] = useState(false);

  useEffect(() => {
    const change = async () => {
      let userRes = await userRequest.getById(comment.userId);
      let inforUser = await userRequest.getInfor(userRes, dispatch, false);
      let ten = "";
      let ma = "";

      if (userRes.username.includes("GV")) {
        ten = inforUser.tenGV;
        ma = inforUser.maGV;
        delete inforUser.tenGV;
        delete inforUser.maGV;
      } else {
        ten = inforUser.tenSV;
        ma = inforUser.maSV;
        delete inforUser.tenSV;
        delete inforUser.maSV;
      }
      inforUser = { ...inforUser, ten, ma };

      setUser(inforUser);
    };
    change();
  }, [comment.id]);

  function handleViewCmt() {
    setViewMore(!viewMore);
    try {
      if (viewMore) {
        handleViewRepCmt(comment.id);
      }
      if (!viewMore) {
        let repCmtClass = `.rep_cmt_${comment.id}`;
        let allRepCmt = document.querySelectorAll(repCmtClass);
        Array.from(allRepCmt).forEach((ele) => (ele.style.display = "none"));
        return;
      }
      if (viewMore) {
        let repCmtClass = `.rep_cmt_${comment.id}`;

        let allRepCmt = document.querySelectorAll(repCmtClass);
        Array.from(allRepCmt).forEach((ele) => (ele.style.display = "block"));
        return;
      }
    } catch (err) {
      console.log("hfskgfsa");
    }
  }

  return (
    <div className={`rep_cmt_${comment.repCommentId}`}>
      <ListItem
        alignItems="flex-start"
        style={{ paddingLeft: `${20 * comment.level}px` }}
      >
        <ListItemAvatar>
          <Avatar alt={user.ten} src={user.ten} />
        </ListItemAvatar>
        <ListItemText
          primary={user.ten}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {moment(comment.createAt).format("DD-MM, h:mm:ss a")}
              </Typography>
              <p>{comment.content}</p>
              <div
                className="action_cmt"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Chip
                  label={`${viewMore ? "Xem thêm" : "ẩn bớt"}`}
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    handleViewCmt();
                  }}
                />

                <Chip
                  label={`${openComment ? "ẩn" : "trả lời"}`}
                  variant="outlined"
                  size="small"
                  onClick={() => setOpenComment(!openComment)}
                />
              </div>
              {openComment ? (
                <ReplyComment
                  comment={comment}
                  currentUser={currentUser}
                  user={user}
                />
              ) : (
                <></>
              )}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider />
    </div>
  );
};
export default CommentItem;
