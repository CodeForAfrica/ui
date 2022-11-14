import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";
import Image from "next/image";
import React from "react";

import { neutral } from "@/charterafrica/colors";

const MobileNavBar = React.forwardRef(function MobileNavBar(props, ref) {
  const { logo } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ px: { xs: 5, sm: 0 }, py: { xs: 1 } }}
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
        {open ? (
          <CloseIcon onClick={handleClickOpen} sx={{ color: "#FFFFFF" }} />
        ) : (
          <MenuIcon onClick={handleClickOpen} sx={{ color: "#FFFFFF" }} />
        )}
      </Grid>
    </Grid>
  );
});

export default MobileNavBar;
