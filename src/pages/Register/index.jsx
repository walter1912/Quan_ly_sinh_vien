import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { userRequest } from "../../services/user/userRequest";
import { useState } from "react";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useDispatch } from "react-redux";

const STForm = styled(Form)(({ theme }) => ({
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const BoxStyled = styled(Box)(({ theme }) => ({
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

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  marginBottom: "40px",
}));
const IconButtonDelete = styled(IconButton)((props) => ({
  position: "absolute",
  top: "0",
  right: "0",
  padding: "5px 10px",
}));
const validationSchema = yup.object({
  username: yup
    .string("Nhập username của bạn")
    .required("Yêu cầu nhập username"),
  password: yup
    .string("Nhập password của ban")
    .min(6, "Password tối thiểu 6 chữ số")
    .required("Yêu cầu nhập password"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
});

function Register(props) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    navigate(-1);
    setOpen(false);
  };
  //  khi click đăng ký
  const [messageAlert, setMessageAlert] = useState("");
  const [severity, setSeverity] = useState("success");
  const dispatch = useDispatch();
  async function handleRegister(values) {
    const { username, password, role } = values;
    const data = {
      username,
      password,
      role,
    };
    let res = await userRequest.register(data, dispatch);
    setMessageAlert(res.mes);
    if (res.status === 404) {
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
                rePassword: "",
                role: 2,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleRegister(values);
              }}
            >
              {({ touched, errors, values, handleChange, handleSubmit }) => (
                <STForm>
                  <h2 style={{ fontWeight: "400", fontSize: "1.6rem" }}>
                    Tạo tài khoản mới
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
                  <TextFieldStyled
                    fullWidth
                    id="rePassword"
                    name="rePassword"
                    label="Nhập lại password"
                    type="password"
                    value={values.rePassword}
                    onChange={handleChange}
                    error={touched.rePassword && Boolean(errors.rePassword)}
                    helperText={touched.rePassword && errors.rePassword}
                  />

                  <FormControl fullWidth>
                    <InputLabel id="role">Vị Trí</InputLabel>
                    <Select
                      id="role"
                      name="role"
                      value={values.role}
                      labelId="role"
                      label="Vị trí"
                      onChange={handleChange}
                      error={touched.role && Boolean(errors.role)}
                      helperText={touched.role && errors.role}
                    >
                      <MenuItem value={1}>Giảng Viên</MenuItem>
                      <MenuItem value={2}>Sinh Viên</MenuItem>
                    </Select>
                  </FormControl>

                  <CustomSnackbar
                    handleClick={handleSubmit}
                    txtBtn="Đăng ký"
                    severity={severity}
                    messageAlert={messageAlert}
                    variant="contained"
                  />
                </STForm>
              )}
            </Formik>
          </BoxStyled>
        </Fade>
      </Modal>
    </div>
  );
}
export default Register;
