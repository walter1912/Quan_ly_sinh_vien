import SideBar from "../SideBar";
import { Outlet } from "react-router-dom";
import { Box, Container, CssBaseline } from "@mui/material";
import Footer from "../Footer";

const Layout = (props) => {
  return (
    <Container maxWidth="100vw" >
      <Box component="div">
        <CssBaseline />
        <SideBar />
        <Outlet />

        <Footer />
      </Box>
    </Container>
  );
};

Layout.propTypes = {};

export default Layout;
