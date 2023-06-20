import { Edit } from "@mui/icons-material";
import {
  IconButton,
  Input,
  InputAdornment,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";

const ItemInfo = (props) => {
  let { icon, destext, text, isedit, onChange } = props;
  const [txtInp, setTxtInp] = useState(text);
  const [readOnl, setReadOnl] = useState(!isedit);
  return (
    <ListItem {...props}>
      <ListItemIcon>{icon}</ListItemIcon>
      <div
        style={{
          display: "flex",
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <b style={{ display: "flex", flex: "20" }}>{destext}</b>
        {isedit ? (
          <Input
            style={{
              display: "flex",
              flex: "80",
              outline: "none",
              border: "none",
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setReadOnl(!readOnl);
                  }}
                >
                  <Edit />
                </IconButton>
              </InputAdornment>
            }
            value={txtInp}
            onChange={(e) => setTxtInp(pre => {
              onChange(e);
              return e.target.value;
            })}
            readOnly={readOnl}
          />
        ) : (
          <span
            style={{
              display: "flex",
              flex: "80",
            }}
          >
            {txtInp}
          </span>
        )}
      </div>
    </ListItem>
  );
};
export default ItemInfo;
