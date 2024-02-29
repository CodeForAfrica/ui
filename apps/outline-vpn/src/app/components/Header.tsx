import { AppBar, Toolbar } from "@mui/material";
import { Figure } from "@commons-ui/next";
import React, { FC } from "react";

interface Props {}

const Header: FC<Props> = () => {
  return (
    <AppBar sx={{ backgroundColor: "common.white" }} position="sticky">
      <Toolbar
        sx={{
          margin: "auto",
          maxWidth: "1440px",
          width: "100%",
          backgroundColor: "common.white",
          px: { xs: 3, sm: 5, md: 8 },
          py: "10px",
        }}
      >
        <Figure
          ImageProps={{
            src: "/cfa-logo.svg",
          }}
          sx={{
            borderColor: "common.white",
            height: "60px",
            width: "136px",
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
