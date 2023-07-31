import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IconButton, TextField } from "@mui/material";
import { styled as makeStyles } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../../services/user/userRequest";
import { useDispatch } from "react-redux";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useState } from "react";

const STForm = makeStyles(Form)(({ theme }) => ({
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
const BoxStyled = makeStyles(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  padding: "40px",
  backgroundColor: "#fff",
  borderRadius: "20px",
  boxShadow: "24",
  borderColor: "none",
}));

const TextFieldStyled = makeStyles(TextField)(({ theme }) => ({
  marginBottom: "40px",
}));
const IconButtonDelete = makeStyles(IconButton)((props) => ({
  position: "absolute",
  top: "0",
  right: "0",
  padding: "5px 10px",
}));
const Option = makeStyles("div")((props) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "20px",
}));
const validationSchema = yup.object({
  username: yup
    .string("Nhập username của bạn")
    .required("Yêu cầu nhập username"),
  password: yup
    .string("Nhập password của ban")
    .required("Yêu cầu nhập password"),
  // .min(8, "Password tối thiểu 6 chữ số")
});

function Login(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };
  const navigate = useNavigate();
  // hàm check login
  const [severity, setSeverity] = useState("success");
  const [messageAlert, setMessageAlert] = useState("đăng nhập");
  async function handleCheckLogin(values) {
    const res = await userRequest.checkLogin(values, dispatch);
      
    setMessageAlert(res.data.message);
    if (res.status === 200) {
      setSeverity("success");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setSeverity("error");
    }
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <BoxStyled>
            <IconButtonDelete onClick={handleClose}>x</IconButtonDelete>

            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleCheckLogin(values);
              }}
            >
              {({ touched, errors, values, handleChange, handleSubmit }) => (
                <STForm>
                  <h2 style={{ fontWeight: "400", fontSize: "1.6rem" }}>
                    Đăng nhập vào tài khoản của bạn
                  </h2>
                  <TextFieldStyled
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={values.username}
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <TextFieldStyled
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <Option>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="checkbox"
                        name="saveUser"
                        value={values.username}
                      />
                      <span>Lưu mật khẩu</span>
                    </div>

                    <Link to={`/forgetPassword/${values.username}`}>
                      <span className="text-primary">Quên mật khẩu</span>
                    </Link>
                  </Option>
                  <CustomSnackbar
                    handleClick={handleSubmit}
                    txtBtn={"Đăng nhập"}
                    variant={"contained"}
                    messageAlert={messageAlert}
                    severity={severity}
                  />

                  <div style={{ marginTop: "20px" }}>
                    <span>Bạn chưa có tài khoản?</span>
                    <Link to={`/register`}>
                      <span className="text-primary"> Đăng ký ngay</span>
                    </Link>
                  </div>
                </STForm>
              )}
            </Formik>
          </BoxStyled>
        </Fade>
      </Modal>
    </div>
  );
}
export default Login;
