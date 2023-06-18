import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
const SearchItem = (props) => {

  const {dispatch, searchSlice } = props;
  
  // xử lý tìm kiếm thông tin sinh viên
  function handleSearch() {
    const txtTuKhoa = document.getElementById("txtTuKhoa");
    const chbType = document.getElementById("chbType");

    const keyword = txtTuKhoa.value.trim().toLowerCase();
    const type = chbType.value;
    if (keyword === "") {
      alert("vui lòng nhập từ khóa để tìm kiếm");
    }
    dispatch(searchSlice({ type, keyword }));
    console.log("handlSearch", keyword, type);
  }

  return (
    <>
      <FormControl size="small" sx={{ display: "flex", flexDirection: "row" }}>
        <TextField
          id="txtTuKhoa"
          name="txtTuKhoa"
          type="search"
          placeholder={"Tìm kiếm"}
          InputProps={{
            startAdornment: (
              <InputAdornment
              position="start"
              >
                <IconButton variant="contained" onClick={() => handleSearch()}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
              position="start"
              >
                <select
                name="chbType" id="chbType" defaultValue={"Ten"} style={{outline:'none', border:'none',boxShadow:'none', overflow:'hidden'}}>
                  <option value="Ten">Tên</option>
                  <option value="Ma">Mã</option>
                </select>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </>
  );
};

SearchItem.propTypes = {};

export default SearchItem;
