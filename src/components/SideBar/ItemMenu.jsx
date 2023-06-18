import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { LinkOff, RouteTwoTone } from "@mui/icons-material";
import ToggleMenu from "./ToggleMenu";

const STListItemButton = styled(ListItemButton)((props) => ({
  margin: "0",
  textAlign: "center",
  color: props.color,
  height: "100%",
  "&:hover": {
    backgroundColor: "#fff",
  },
}));
const STLink = styled(Link)((props) => ({
  color: "currentColor",
  whiteSpace: "nowrap",
  textDecoration: "none",
}));

const ItemMenu = (props) => {
  const { item, index, color } = props;
  const { name, route, des, listMenu } = item;

  return (
    <ListItem disablePadding>
      <STListItemButton color={color} {...props}>
        {listMenu !== undefined ? (
          <STLink className="main-hover">
            <ToggleMenu listMenu={listMenu} name={name} />
          </STLink>
        ) : (
          <STLink className="main-hover" to={route}>
            {name}
          </STLink>
        )}
      </STListItemButton>
    </ListItem>
  );
};

ItemMenu.propTypes = {
  color: PropTypes.string,
};
ItemMenu.defaultProps = {
  color: "curentColor",
};
export default ItemMenu;
