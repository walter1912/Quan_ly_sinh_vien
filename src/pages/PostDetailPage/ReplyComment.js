import { useState } from "react";
import { useDispatch } from "react-redux";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { commentRequest } from "../../services/comment/commentRequest";
import CustomSnackbar from "../../components/CustomSnackbar";
function ReplyComment(props) {
  const { currentUser, user, comment } = props;
  const dispatch = useDispatch();

  const [messageComment, setMessageComment] = useState("");
  const [messageAlert, setMessageAlert] = useState("Bạn vừa gửi câu trả lời");
  const [severity, setSeverity] = useState("success");
  async function handleReplyCmt() {
      let data = {
        content: messageComment,
        postId: comment.postId,
        repCommentId: comment.id,
        userId: currentUser.id,
        level: comment.level + 1,
      };
      const res = await commentRequest.create(data, dispatch);
      setMessageAlert(res.data.message);
      if (res.status === 200) {
        setSeverity("success");
      } else {
        setSeverity("error");
      }
  }

  return (
    <div>
      <div className="message_comment" style={{ width: "100%" }}>
        <TextareaAutosize
          style={{ width: "100%", minWidth: " 300px" }}
          placeholder={` reply ${user.ten}`}
          minRows={3}
          value={messageComment}
          onChange={(e) => setMessageComment(e.target.value)}
        />
        <CustomSnackbar
          handleClick={() => {
            handleReplyCmt();
          }}
          messageAlert={messageAlert}
          severity={severity}
          txtBtn={"Gửi"}
        />
      </div>
    </div>
  );
}

export default ReplyComment;
