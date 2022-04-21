import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

import A from "../A";
import RichTypography from "../RichTypography";

const TitleRoot = styled(Grid, {
  slot: "Root",
  name: "StayInTouchTitle",
})(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
  },
}));

const LinksRoot = styled(Grid, {
  slot: "Root",
  name: "StayInTouchLinks",
})(({ theme }) => ({
  "& > a": {
    display: "inline-block",
    borderRight: "1px solid white",
  },
  "& > a:last-of-type": {
    border: "none",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
    width: "auto",
  },
}));

const SocialLinkRoot = styled(A, {
  slot: "Root",
  name: "StayInTouchSocialLink",
})(() => ({
  display: "inline-block",
  padding: "0 0.625rem",
}));

const SupportLinkRoot = styled(A, {
  slot: "Root",
  name: "StayInTouchSupportLink",
})(() => ({
  display: "inline-block",
  padding: "0 0.625rem",
}));

const IconRoot = styled("img", {
  slot: "Root",
  name: "StayInTouchIcon",
})(() => ({
  width: "1.375rem",
  height: "1.375rem",
  objectFit: "contain",
}));

const StayInTouch = React.forwardRef(function StayInTouch(
  { children, support, socialMedia, title, ...props },
  ref
) {
  if (!(socialMedia && socialMedia.length)) {
    return null;
  }

  return (
    <Grid container ref={ref} {...props}>
      {title && (
        <TitleRoot item xs={12} md="auto">
          <RichTypography>{title}</RichTypography>
        </TitleRoot>
      )}
      <LinksRoot item xs={12} md="auto" container>
        {support && (
          <SupportLinkRoot href={`mailto:${support.email}`}>
            <IconRoot src={support.image.url} alt={support.image.alt} />
          </SupportLinkRoot>
        )}
        {socialMedia.map((media) => (
          <SocialLinkRoot key={media.url} href={media.url}>
            <IconRoot src={media.image.url} alt={media.image.alt} />
          </SocialLinkRoot>
        ))}
      </LinksRoot>
    </Grid>
  );
});

StayInTouch.propTypes = {
  socialMedia: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      image: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  support: PropTypes.shape({
    email: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
  }),
  title: PropTypes.string,
};

StayInTouch.defaultProps = {
  support: undefined,
  title: "Stay in touch with us @ &nbsp;",
};

export default StayInTouch;
