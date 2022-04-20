import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

import ImageButton from "../ImageButton/index";

const ImageIcon = styled(ImageButton)({
  boxShadow: "none",
  textTransform: "capitalize",
  fontSize: "3rem",
  margin: "1.5rem",
  backgroundColor: "none",
  borderColor: "none",
  "&:hover": {
    backgroundColor: "none",
    borderColor: "none",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "none",
    borderColor: "none",
  },
  "&:focus": {
    boxShadow: "none",
    backgroundColor: "none",
    borderColor: "none",
  },
});

function NavIcon({ links }) {
  if (!links?.length) {
    return null;
  }

  return (
    <Grid item xs={3}>
      {links.map((item) => (
        <ImageIcon
          key={item.alt}
          alt={item.alt}
          src={item.src}
          height={item.height}
          width={item.width}
        />
      ))}
    </Grid>
  );
}

NavIcon.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      height: PropTypes.string,
      width: PropTypes.string,
    }).isRequired
  ).isRequired,
};

export default NavIcon;
