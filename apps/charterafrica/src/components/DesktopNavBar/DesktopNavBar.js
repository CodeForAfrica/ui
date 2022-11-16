import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Grid, Button } from "@mui/material";
import Image from "next/image";
import React from "react";

import { neutral, secondary } from "@/charterafrica/colors";

const DesktopNavBar = React.forwardRef(function DesktopNavBar(props, ref) {
  const { logo, sx } = props;
  const [loggedIn, login] = React.useState(false);

  const handleClickOpen = () => {
    login(!loggedIn);
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ px: { xs: 5, sm: 0 }, py: { xs: 1 }, ...sx }}
      ref={ref}
      backgroundColor={neutral[900]}
    >
      <Grid item>
        <Image
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt={logo.alt}
        />
      </Grid>
      <Grid item>
        {loggedIn ? (
          <AccountCircleOutlinedIcon
            onClick={handleClickOpen}
            sx={{
              color: secondary[500],
              height: "43px",
              width: "43px",
            }}
          />
        ) : (
          <Button
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              backgroundColor: secondary[500],
              color: neutral[900],
              "&:hover": {
                backgroundColor: secondary[600],
              },
            }}
          >
            Join
          </Button>
        )}
      </Grid>
    </Grid>
  );
});

export default DesktopNavBar;
