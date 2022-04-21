import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

import ImageButton from "@/commons-ui/core/ImageButton/index";

const ImageIcon = styled(ImageButton)({
  boxShadow: "none",
  textTransform: "capitalize",
  fontSize: 48,
  margin: 24,
  backgroundColor: "transparent",
  borderColor: "none",
  "&:hover, &:focus, &:active, &:focus-within": {
    backgroundColor: "transparent",
    borderColor: "transparent",
    boxShadow: "none",
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
