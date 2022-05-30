import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const ImpactCardRoot = styled(Card, {
  slot: "Root",
})(() => ({}));

const ImpactCard = React.forwardRef(function ImpactCard(props, ref) {
  const { image, title, number, description } = props;

  if (!image && !title) {
    return null;
  }

  return (
    <ImpactCardRoot ref={ref}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            borderBottom: "1px solid",
            borderColor: "primary.main",
            paddingBottom: "0.75rem",
          }}
        >
          <Image src={image.url} alt={image.alt} width={32} height={32} />
          <Typography
            variant="display3"
            sx={{
              display: "inline",
              color: "primary.main",
              ml: "0.93rem",
            }}
          >
            {title}
          </Typography>
        </Box>
        {number && (
          <Typography
            variant="display1"
            sx={{
              color: "primary.main",
              fontWeight: 300,
              padding: "1.25rem 0",
              display: "block",
            }}
          >
            {number}
          </Typography>
        )}
        {description && (
          <Typography
            sx={{
              display: "block",
              padding: "1.25rem 0",
              borderColor: "secondary.main",
              borderTop: "solid 1px",
            }}
            variant="body3"
          >
            {description}
          </Typography>
        )}
      </CardContent>
    </ImpactCardRoot>
  );
});

ImpactCard.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  image: PropTypes.shape({
    alt: PropTypes.string,
    url: PropTypes.string,
  }),
};

ImpactCard.defaultProps = {
  description: undefined,
  title: undefined,
  number: undefined,
  image: undefined,
};

export default ImpactCard;
