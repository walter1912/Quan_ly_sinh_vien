import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const apiToastConfig = {
  position: "top-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const CustomToastify = (props) => {
  let navigate = useNavigate();
  const response = useSelector((state) => state.response);
  // if(response.status === 404) {
  //   navigate('/')
  // }
  if (response.toast) {
    if (response.type === "success") {
      let func = () => toast.success(response.message, apiToastConfig);
      func();
    }
    if (response.type === "error") {
      let func = () => toast.error(response.message, apiToastConfig);
      func();
    }
    if (response.type === "warning") {
      let func = () => toast.warning(response.message, apiToastConfig);
      func();
    }
  }

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

CustomToastify.propTypes = {};

export default CustomToastify;
