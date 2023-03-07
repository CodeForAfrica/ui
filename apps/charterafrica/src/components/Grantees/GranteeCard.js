import { Link } from "@commons-ui/next";
import { Box, Button, CardContent, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import { neutral } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import RichText from "@/charterafrica/components/RichText";
import Card, { StyledActionArea } from "@/charterafrica/components/StyledCard";

const GranteeCard = React.forwardRef(function GranteeCard(props, ref) {
  const {
    description,
    image,
    name,
    sx,
    square,
    variant = "outlined",
    elevation,
    href,
    tags,
  } = props;
  const ownerState = {
    elevation,
    square,
    variant,
  };

  return (
    <Card
      elevation={elevation}
      sx={sx}
      ref={ref}
      ownerState={ownerState}
      variant={variant}
    >
      <StyledActionArea component={href ? Link : undefined} href={href}>
        <CardMedia image={image.url} sx={{ height: 264 }} />
        <CardContent>
          <LineClampedRichTypography
            color="neutral.dark"
            html={false}
            lineClamp={2}
            textAlign="left"
            variant="h5"
            sx={(theme) => ({
              mb: 2.5,
              fontWeight: 400,
              minHeight: `calc(${theme.typography.h5.fontSize}px * ${theme.typography.h5.lineHeight} * 2)`,
            })}
          >
            {name}
          </LineClampedRichTypography>
          <RichText
            color={neutral[500]}
            elements={description}
            sx={(theme) => ({
              minHeight: `calc(${theme.typography.p1.fontSize}px * ${theme.typography.p1.lineHeight} * 3)`,
            })}
            lineClamp={3}
          />
          <Box sx={{ height: 94, overflow: "hidden", mt: 1.25 }}>
            {tags?.map((tag, i) => {
              return (
                <Button
                  component="div"
                  key={tag.id}
                  sx={{
                    mt: 1.25,
                    mr: 1.25,
                    textTransform: "uppercase",
                    fontSize: 10,
                    color: "neutral.dark",
                  }}
                  size="small"
                  variant="contained"
                  color={i ? "error" : "success"}
                >
                  {tag.name}
                </Button>
              );
            })}
          </Box>
        </CardContent>
      </StyledActionArea>
    </Card>
  );
});

GranteeCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.arrayOf(PropTypes.shape({})),
  image: PropTypes.shape({}),
  tags: PropTypes.arrayOf(PropTypes.shape({})),
};

GranteeCard.defaultProps = {
  name: undefined,
  description: undefined,
  image: undefined,
  tags: undefined,
};

export default GranteeCard;
