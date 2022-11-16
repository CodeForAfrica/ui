import { Grid, Button, IconButton } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import Image from "next/image";
import React from "react";

import UserIcon from "@/charterafrica/assets/icons/Type=user, Size=32, Color=CurrentColor.svg";
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
          <IconButton
            onClick={handleClickOpen}
            sx={{
              borderRadius: "50%",
              border: "2.5px solid",
              borderColor: secondary[500],
            }}
          >
            <SvgIcon
              component={UserIcon}
              viewBox="0 0 32 32"
              sx={{
                fill: "none",
                fontSize: "32px",
              }}
            />
          </IconButton>
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
