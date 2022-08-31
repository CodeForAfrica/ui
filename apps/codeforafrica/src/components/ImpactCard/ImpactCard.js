import { RichTypography } from "@commons-ui/next";
import { Card, CardContent, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

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
  const { image, title, value, content } = props;

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
            borderBottom: "solid 1px",
            borderColor: "secondary.main",
            color: "primary.main",
            display: "block",
            py: "10px",
          }}
        >
          {value}
        </RichTypography>
        <RichTypography
          sx={{
            display: "block",
            pt: "10px",
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
