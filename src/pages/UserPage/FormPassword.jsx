import styled from "@emotion/styled";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";


const EditPassword = styled(Stack)((props) => ({
  width: "40%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const FormPassword = (props) => {
    const { user } = props;
    const [oldPassword, setOldPassword] = useState("");
    const [errOldPassword, setErrOldPassword] = useState(true);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errNewPassword, setErrNewPassword] = useState(true);
  
    return (
      <EditPassword spacing={3}>
        <TextField
          fullWidth
          label="Mật khẩu cũ"
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
          variant="standard"
        />
        {errOldPassword ? (
          <Alert severity="error">Nhập mật khẩu cũ không chính xác</Alert>
        ) : (
          <Alert severity="success">Nhập mật cũ chính xác</Alert>
        )}
        <TextField
          fullWidth
          label="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setErrOldPassword((pre) => oldPassword !== user.password);
          }}
          variant="standard"
        />
        <TextField
          fullWidth
          label="Nhập lại mật khẩu mới"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrNewPassword(confirmPassword !== newPassword);
          }}
          variant="standard"
        />
        {confirmPassword && confirmPassword !== newPassword && !errOldPassword ? (
          <Alert severity="error">Nhập mật khẩu mới không khớp</Alert>
        ) : (
          <Button variant="contained">Xác nhận mật khẩu</Button>
        )}
      </EditPassword>
    );
  };

  export default FormPassword;