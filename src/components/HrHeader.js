import styled from "@emotion/styled";

export const HrHeader = styled("div")((props) => ({
    width: "100vw",
    borderBottom: "2px solid var(--color-main)",
    position: "relative",
    "& span": {
      position: "absolute",
      bottom: 0,
      background: "var(--color-main)",
      color: "#fff",
      padding: "0 20px 0 10px",
      borderTopRightRadius: "40px",
    },
  }));