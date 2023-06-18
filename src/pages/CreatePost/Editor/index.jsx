import React from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useState } from "react";
import { formats, modules } from "./props";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import CustomSnackbar from "../../../components/CustomSnackbar";

// encode html để lưu vào database
import { decode, encode } from "html-entities";
import UploadImage from "../../../components/UploadImage";

const StyledTextarea = styled(TextareaAutosize)(
  (props) => `width: 100%;
    font-weight: 500;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    // firefox
    &:focus-visible {
      outline: 0;
    }
    `
);
const Editor = (props) => {
  const { handleCRUDPost, updatePost, isUpdate } = props;
  const { title = "", content = "", thumbnail: updateThumbnail } = updatePost;

  const [editorHtml, setEditorHtml] = useState(decode(content));
  const [titlePost, setTitlePost] = useState(title);
  const [thumbnailPost, setThumbnailPost] = useState({
    url: updateThumbnail,
  });

  //alert
  const [severity, setSeverity] = useState("success");
  const [messageAlert, setMessageAlert] = useState("Thành công");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleChange(html) {
    console.log("html: ", html);
    setEditorHtml(html);
  }
  async function handleSavePost() {
    const encodedHTML = encode(editorHtml);

    let data = {
      userId: user.current.id,
      title: titlePost,
      content: encodedHTML,
      thumbnail: thumbnailPost.url,
    };
    if (isUpdate) {
      data = {
        ...data,
        id: updatePost.id,
        createAt: updatePost.createAt,
        userId: updatePost.userId,
      };
    }
    const res = await handleCRUDPost(data, dispatch);

    if (res.status === 400) {
      setSeverity("error");
      setMessageAlert(res.err);
    } else {
      setMessageAlert(
        `${user.current.username} ${
          isUpdate ? "cập nhật" : "thêm"
        } bài đăng thành công.`
      );
    }
  }
  return (
    <div className="create-post">
      {!isUpdate && (
        <>
          <h2>Upload ảnh chủ đề: </h2>
          <UploadImage setImage={setThumbnailPost} />
        </>
      )}
      <h2>Tiêu đề: </h2>
      <StyledTextarea
        value={titlePost}
        onChange={(e) => {
          setTitlePost(e.target.value);
        }}
      />
      <ReactQuill
        value={editorHtml}
        onChange={(e) => {
          handleChange(e);
        }}
        modules={modules}
        formats={formats}
        placeholder="Hãy tạo bài viết của bạn"
        bounds={".create-post"}
      />
      <CustomSnackbar
        variant="contained"
        handleClick={() => handleSavePost()}
        txtBtn={"Lưu bài viết"}
        messageAlert={messageAlert}
        severity={severity}
      />
    </div>
  );
};

Editor.propTypes = {
  handleCRUDPost: PropTypes.func,
  updatePost: PropTypes.object,
  isUpdate: PropTypes.bool,
};
Editor.defaultProps = {
  isUpdate: false,
  updatePost: { title: "", content: "", thumbnail: "" },
};
export default Editor;
