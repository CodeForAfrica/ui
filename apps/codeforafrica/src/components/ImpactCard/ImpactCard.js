import { Figure, RichTypography } from "@commons-ui/next";
import { Card, CardContent, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import RichText from "@/codeforafrica/components/RichText";

const ImpactCardRoot = styled(Card, {
  slot: "Root",
})(({ theme: { breakpoints } }) => ({
  backgroundColor: "inherit",
  boxShadow: "none",
  width: "100%",
  [breakpoints.up("md")]: {
    width: "326px",
  },
  [breakpoints.up("lg")]: {
    width: "332px",
  },
}));

const ImpactCard = React.forwardRef(function ImpactCard(props, ref) {
  const { image, title, value, description } = props;

  if (!(image && title)) {
    return null;
  }
  const imageSrc = image?.src || image?.url || image;
  const imageAlt = image?.alt || title;
  return (
    <ImpactCardRoot ref={ref}>
      <CardContent
        sx={{
          padding: 0,
          "&:last-child": {
            padding: 0,
          },
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid",
            borderColor: "primary.main",
            display: "flex",
            pb: "12px",
          }}
        >
          <Figure
            ImageProps={{ alt: imageAlt, src: imageSrc }}
            sx={{ height: "32px", width: "32px" }}
          />
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
            borderBottom: "solid 1px",
            borderColor: "secondary.main",
            color: "primary.main",
            display: "block",
            py: "10px",
          }}
        >
          {value}
        </RichTypography>
        <RichText
          elements={description}
          sx={{
            display: "block",
            pt: "10px",
          }}
          typographyProps={{
            variant: "body3",
          }}
        />
      </CardContent>
    </ImpactCardRoot>
  );
});

ImpactCard.propTypes = {
  description: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string,
  }),
};

ImpactCard.defaultProps = {
  description: undefined,
  title: undefined,
  value: undefined,
  image: undefined,
};

export default ImpactCard;
