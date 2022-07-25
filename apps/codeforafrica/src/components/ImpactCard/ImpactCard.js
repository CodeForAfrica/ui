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

const ImpactCard = React.forwardRef(function ImpactCard(props, ref) {
  const { image, title, value, content } = props;

  if (!image && !title) {
    return null;
  }
  const imageSrc = image?.src || image?.url || image;
  const imageAlt = image?.alt || title;
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
          <Image src={imageSrc} alt={imageAlt} width={32} height={32} />
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
          {content}
        </RichTypography>
      </CardContent>
    </ImpactCardRoot>
  );
});

ImpactCard.propTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string,
  }),
};

ImpactCard.defaultProps = {
  content: undefined,
  title: undefined,
  value: undefined,
  image: undefined,
};

export default ImpactCard;
