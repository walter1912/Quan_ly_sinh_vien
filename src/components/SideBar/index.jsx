import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ItemMenu from "./ItemMenu";

import { navItems } from "./navItems";
import { img } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userActions } from "../../services/user/userSlice";

const drawerWidth = 240;

function SideBar(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const currentUser = user.current;

  var navItem = navItems.filter((item, index) => index < navItems.length - 4);
  const [userItem, setUserItem] = useState(navItems.find((item)=> item.route === "user"))
 
  useEffect(()=> {
    if(user.login === true) {
      setUserItem(
        pre => ({...pre, name:user.current.username})
      )
    }
  }, [user])
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItem.map((item, index) => (
          <ItemMenu item={item} key={index} />
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          fontWeight: "500",
          fontSize: "1.2rem",
          position: "absolute",
          left: "0",
          width: "100%",
        }}
      >
        <div className="main-color ">
          <h1 className="fs-2 text-center mt-4">
            HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG
          </h1>
        </div>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="div" sx={{ padding: "10px 4px" }}>
            <img src={img.logo} alt="PTIT" />
          </Typography>
          <Box style={{ display: "flex", flexDirection: "row" }}>
            {navItem.map((item, index) => {
              return <ItemMenu item={item} key={index} />;
            })}
            {user.login ? (
              <>
                <ItemMenu
                  item={userItem}
                />
                <ItemMenu
                  item={navItems.find((item) => item.des === "logout")}
                  onClick={() => {
                    dispatch(userActions.logout(currentUser));
                  }}
                />
              </>
            ) : (
              <>
                <ItemMenu
                  item={navItems.find((item) => item.route === "login")}
                />
                <ItemMenu
                  item={navItems.find((item) => item.route === "register")}
                />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideBar;
