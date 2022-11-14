import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";
import Image from "next/image";
import React from "react";

import { neutral } from "@/charterafrica/colors";

const MobileNavBar = React.forwardRef(function MobileNavBar(props, ref) {
  const { sx } = props;
  // const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    // setOpen(true);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={sx}
      ref={ref}
      backgroundColor={neutral[900]}
    >
      <Grid item>
        <Image
          src="images/charter-logo.svg"
          width="145"
          height="40"
          alt="Charter Africa"
        />
      </Grid>
      <Grid item>
        <MenuIcon onClick={handleClickOpen} sx={{ color: "#FFFFFF" }} />
      </Grid>
    </Grid>
  );
});

export default MobileNavBar;
