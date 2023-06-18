import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef, useState } from "react";
import PropTypes from "prop-types";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = (props) => {
  const { handleClick, messageAlert, severity, txtBtn, iconBtn , variant, children} = props;
  const [open, setOpen] = useState(false);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Button
        variant={variant}
        onClick={() => {
          handleClick();
          setOpen(true);
        }}
      >
        {txtBtn}
        {children}
      </Button>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {messageAlert}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
CustomSnackbar.propTypes = {
  handleClick: PropTypes.func,
  messageAlert: PropTypes.string,
  txtBtn: PropTypes.string,
  iconBtn: PropTypes.elementType,
  variant: PropTypes.string,
  // const ComponentType = props.iconBtn;
  // return <ComponentType />;
};
CustomSnackbar.defaultProps = {
  variant: 'outlined'
}

export default CustomSnackbar;
