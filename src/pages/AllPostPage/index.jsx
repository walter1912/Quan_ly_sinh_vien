import React from "react";
import PropTypes from "prop-types";
import { HrHeader } from "../../components/HrHeader";
import CustomPagination from "../../components/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PostItem from "../../components/PostItem";
import { postRequest } from "../../services/post/postRequest";

const AllPostPage = (props) => {
  const { allPost } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    async function handle() {
      await postRequest.getAll(dispatch);
    }
    if (allPost.length < 0) handle();
  }, []);
  return (
    <div>
      <HrHeader style={{ marginBottom: "20px" }}>
        <span>Tất cả bài viết</span>
      </HrHeader>
      <CustomPagination data={allPost} per_page={9} component={PostItem} />
    </div>
  );
};

AllPostPage.propTypes = {};

export default AllPostPage;
