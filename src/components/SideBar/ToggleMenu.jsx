import * as React from "react";
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

function ToggleMenu(props) {
  const { listMenu, name } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        // onMouseOver={handleClick}
      >
        {name}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {listMenu.map((item, index) => (
          <MenuItem key={index}>
            <Link to={item.route} className="main-hover">{item.name}</Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

ToggleMenu.propTypes = {
  listMenu: PropTypes.array,
};
ToggleMenu.defaultProps = {
  listMenu: [
    {
      name: "ToggleMenu",
      route: "",
      des: "Tất cả Bài viết",
      role: 2,
    },
  ],
};

export default ToggleMenu;
