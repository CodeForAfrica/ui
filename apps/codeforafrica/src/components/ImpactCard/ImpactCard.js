import { RichTypography } from "@commons-ui/core";
import { Card, CardContent, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const ImpactCardRoot = styled(Card, {
  slot: "Root",
})(({ theme: { breakpoints } }) => ({
  width: "100%",
  boxShadow: "none",
  [breakpoints.up("md")]: {
    width: "326px",
  },
  [breakpoints.up("lg")]: {
    width: "332px",
  },
}));

const ImpactCard = React.forwardRef(function ImpactCard(
  { image, title, value, description },
  ref
) {
  if (!image && !title) {
    return null;
  }

  return (
    <ImpactCardRoot ref={ref}>
      <CardContent
        sx={{
          backgroundColor: "background.main",
          padding: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid",
            borderColor: "primary.main",
            paddingBottom: "0.75rem",
          }}
        >
          <Image src={image.url} alt={image.alt} width={32} height={32} />
          <RichTypography
            variant="h5"
            sx={{
              display: "inline",
              color: "primary.main",
              ml: "0.93rem",
            }}
          >
            {title}
          </RichTypography>
        </Box>

        <RichTypography
          variant="display1"
          sx={{
            color: "primary.main",
            padding: "1.25rem 0",
            display: "block",
          }}
        >
          {value}
        </RichTypography>
        <RichTypography
          sx={{
            display: "block",
            padding: "1.25rem 0",
            borderColor: "secondary.main",
            borderTop: "solid 1px",
          }}
          variant="body3"
        >
          {description}
        </RichTypography>
      </CardContent>
    </ImpactCardRoot>
  );
});

ImpactCard.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.number,
  image: PropTypes.shape({
    alt: PropTypes.string,
    url: PropTypes.string,
  }),
};

ImpactCard.defaultProps = {
  description: undefined,
  title: undefined,
  value: undefined,
  image: undefined,
};

export default ImpactCard;
