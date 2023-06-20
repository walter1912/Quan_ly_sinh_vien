import {
  Button,
  FormControl,
  Snackbar,
  TextareaAutosize,
  Tooltip,
  styled,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  Facebook,
  Instagram,
  Telegram,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { useState } from "react";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Container = styled("div")((props) => ({
  display: "flex",
  flexDirection: "row",
  padding: "40px 10px",
  backgroundColor: "var(--color-gray)",
}));
const Information = styled("div")((props) => ({
  flex: 2,
  "& > div": {
    display: "flex",
    flexDirection: "row",
    "& > div": {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      "& + div": {
        marginLeft: "10px",
      },
    },
  },
}));
const Connection = styled("div")((props) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  flex: 1,
}));

const Email = styled("div")((props) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1.5,
}));

const ShareButton = styled(Button)((props) => ({
  textTransform: "none",
  color: "var(--color-text)",
  borderColor: "var(--color-text)",
  "& svg": {
    fill: props.iconcolor,
  },
  "&:hover": {
    color: props.iconcolor,
    borderColor: props.iconcolor,
  },
}));

const Footer = (props) => {
  const [contentEmail, setContentEmail] = useState("");
  const [openSnackbar, setOpenSackbar] = useState(false);
  function sendEmail() {
    setOpenSackbar(true);
    console.log("contentEmail: ", contentEmail);
  }
  function handleCloseSnackbar() {
    setOpenSackbar(false);
  }
  return (
    <Container style={{marginTop:"80px"}}>
      <Information>
        <h4 className="fw-bold main-color">
          Học viện công nghệ bưu chính viễn thông
        </h4>
        <div>
          <div className="office">
            <h6 className="fw-bold">Trụ sở</h6>
            <Tooltip
              title="trụ sở chính"
              placement="top-start"
              followCursor={true}
            >
              <p>122 Hoàng Quốc Việt, Quận Cầu Giấy, Hà Nội</p>
            </Tooltip>
            <p>11 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, TP Hồ Chí Minh</p>
          </div>
          <div className="training">
            <h6 className="fw-bold">Cơ sở đào tạo</h6>
            <p>KM 10, Đường Nguyễn Trãi, Quận Hà Đông, Hà Nội</p>
            <p>Đường Man Thiện, Phường Hiệp Phú, Quận 9, TP Hồ Chí Minh</p>
          </div>
        </div>
      </Information>
      <Connection>
        <h6 className="text-center fw-bold">Kết nối với PTIT qua</h6>

        <ShareButton
          variant="text"
          iconcolor={"#0470e5"}
          startIcon={<Facebook />}
        >
          <a href="https://www.facebook.com/phonggiaovu" target="_blank" rel="noopener noreferrer" >
            Facebook
          </a>
        </ShareButton>
        <ShareButton
          variant="text"
          iconcolor={"#ff3131"}
          startIcon={<YouTube />}
        >
          <a href="https://www.youtube.com/@PChannels" target="_blank" rel="noopener noreferrer" >
            YouTube
          </a>
        </ShareButton>
        <ShareButton
          variant="text"
          iconcolor={"#f60a60"}
          startIcon={<Instagram />}
        >
          <a href="https://www.instagram.com/ptit_29/" target="_blank" rel="noopener noreferrer" >
            Instagram
          </a>
        </ShareButton>
        <ShareButton
          variant="text"
          iconcolor={"#1da1f2"}
          startIcon={<Twitter />}
        >
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" >
            Twitter
          </a>
        </ShareButton>
      </Connection>
      <Email>
        <FormControl sx={{ width: "100%" }}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Hãy gửi ý kiến cho chúng tôi"
            value={contentEmail}
            onChange={(e) => setContentEmail(e.target.value)}
          />

          <Tooltip title="mail to ptit@gmail.com" placement="top">
            <Button variant="contained" onClick={() => sendEmail()}>
              <Telegram />
            </Button>
          </Tooltip>
          {/* thông báo khi nhấn vào gửi mail */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Bạn đã gửi mail cho chúng tôi {"<"}3
            </Alert>
          </Snackbar>
        </FormControl>
        <Tooltip title="trụ sở đào tạo chính" followCursor={true}>
          <iframe
            style={{ margin: "20px 10px" }}
            title="bản đồ ptit"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4430.156035754973!2d105.78456683308819!3d20.980514790166218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdcf7b0bd1%3A0xc1cf5dd00247628a!2zSOG7jWMgVmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IENow61uaCBWaeG7hW4gVGjDtG5n!5e0!3m2!1svi!2s!4v1491884697566"
          ></iframe>
        </Tooltip>
      </Email>
    </Container>
  );
};

Footer.propTypes = {};

export default Footer;
