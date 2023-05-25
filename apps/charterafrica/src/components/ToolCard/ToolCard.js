import { Link } from "@commons-ui/next";
import { CardContent, CardMedia, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import Card, { StyledActionArea } from "@/charterafrica/components/StyledCard";

const ToolCard = React.forwardRef(function ToolCard(props, ref) {
  const {
    description,
    lastActive,
    elevation,
    topic,
    image,
    link,
    square,
    name,
    variant = "outlined",
    orientation = "vertical",
  } = props;
  const ownerState = {
    elevation,
    square,
    variant,
  };

  const horizontalDisplay = orientation !== "vertical";
  return (
    <Card
      elevation={elevation}
      ownerState={ownerState}
      variant={variant}
      sx={{ display: "flex", flexWrap: "wrap" }}
      ref={ref}
    >
      <StyledActionArea
        component={link?.href ? Link : undefined}
        href={link?.href}
      >
        <Grid container>
          <Grid item xs={12} lg={horizontalDisplay ? 4 : 12}>
            <CardMedia
              image={image}
              component="img"
              sx={{
                width: "100%",
                maxWidth: horizontalDisplay ? 585 : "100%",
                minWidth: 330,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={horizontalDisplay ? 8 : 12}>
            <CardContent
              sx={(theme) => ({
                p: 3.75,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                [theme.breakpoints.up("md")]: {},
              })}
            >
              <LineClampedRichTypography
                color="neutral.dark"
                html={false}
                lineClamp={1}
                textAlign="left"
                variant="h5SmallSemiBold"
                sx={(theme) => ({
                  [theme.breakpoints.up("md")]: {
                    typography: "h5SemiBold",
                  },
                })}
              >
                {name}
              </LineClampedRichTypography>
              <LineClampedRichTypography
                color="neutral.dark"
                html={false}
                lineClamp={1}
                textAlign="left"
                variant="caption"
                sx={(theme) => ({
                  mt: 2.5,
                  [theme.breakpoints.up("md")]: {
                    typography: "h5SmallSemiBold",
                  },
                })}
              >
                {topic}
              </LineClampedRichTypography>
              <LineClampedRichTypography
                variant="p1"
                color="neutral.main"
                sx={() => ({
                  mt: 2.5,
                })}
                lineClamp={3}
              >
                {description}
              </LineClampedRichTypography>
              <LineClampedRichTypography
                color="neutral.dark"
                lineClamp={1}
                variant="p1"
                sx={{ mt: 2.5, height: 18 }}
              >
                {lastActive}
              </LineClampedRichTypography>
            </CardContent>
          </Grid>
        </Grid>
      </StyledActionArea>
    </Card>
  );
});

ToolCard.propTypes = {
  name: PropTypes.string,
  lastActive: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  topic: PropTypes.string,
  link: PropTypes.text,
};

ToolCard.defaultProps = {
  name: undefined,
  lastActive: undefined,
  description: undefined,
  image: undefined,
  topic: undefined,
  link: undefined,
};

export default ToolCard;
