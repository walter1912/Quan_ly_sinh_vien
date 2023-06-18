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
  let { Icon, desText, text, isEdit, onChange } = props;
  const [txtInp, setTxtInp] = useState(text);
  const [readOnl, setReadOnl] = useState(!isEdit);
  return (
    <ListItem {...props}>
      <ListItemIcon>{Icon}</ListItemIcon>
      <div
        style={{
          display: "flex",
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <b style={{ display: "flex", flex: "20" }}>{desText}</b>
        {isEdit ? (
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
