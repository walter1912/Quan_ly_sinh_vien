import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container } from "@mui/material";
import ListSinhVien from "../../components/ListSinhVien";
import { useDispatch, useSelector } from "react-redux";
import { sinhvienRequest } from "../../services/sinhvien/sinhvienRequest";
import SearchItem from "../../components/SearchItem";
import { search } from "../../services/sinhvien/sinhvienSlice";

const AllSinhVienPage = (props) => {
  const dispatch = useDispatch();
  const storeSinhVien = useSelector((state) => state.sinhVien);
  useEffect(() => {
    sinhvienRequest.getAll(dispatch);
  }, [storeSinhVien.currentRender]);

  return (
    <Container>
      <SearchItem dispatch={dispatch} searchSlice={search} />
      <ListSinhVien />
    </Container>
  );
};

AllSinhVienPage.propTypes = {};

export default AllSinhVienPage;
