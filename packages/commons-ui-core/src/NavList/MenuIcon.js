import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import * as React from "react";

function MenuIcon({ links }) {
  if (!links?.length) {
    return null;
  }

  return (
    <Grid
      item
      xs={8}
      container
      direction="row"
      alignItems="center"
      justifyContent="space-around"
    >
      {links.map((item) => (
        <Button key={item.alt}>
          <img src={item.src} alt={item.alt} />
        </Button>
      ))}
    </Grid>
  );
}

MenuIcon.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }).isRequired
  ).isRequired,
};

export default MenuIcon;
