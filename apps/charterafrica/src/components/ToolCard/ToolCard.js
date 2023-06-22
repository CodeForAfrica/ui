import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import {
  Button,
  Box,
  CardContent,
  CardMedia,
  Grid,
  SvgIcon,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import ShareIcon from "@/charterafrica/assets/icons/Type=Share, Size=24, Color=CurrentColor.svg";
import StarIcon from "@/charterafrica/assets/icons/Type=Star, Size=24, Color=CurrentColor.svg";
import UsersIcon from "@/charterafrica/assets/icons/Type=users, Size=24, Color=CurrentColor.svg";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import Card, { StyledActionArea } from "@/charterafrica/components/StyledCard";

const ToolCard = React.forwardRef(function ToolCard(props, ref) {
  const {
    description,
    elevation,
    topic,
    image,
    link,
    square,
    name,
    contributorsCount,
    stars,
    forks,
    variant = "outlined",
    orientation = "vertical",
    exploreText,
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
              <Box display="flex" justifyContent="space-between">
                <LineClampedRichTypography
                  color="neutral.dark"
                  html={false}
                  lineClamp={2}
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
                {horizontalDisplay ? (
                  <Button variant="contained">{exploreText}</Button>
                ) : null}
              </Box>
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
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mt: 2, maxWidth: 575 }}
              >
                <Box display="flex" alignItems="center">
                  <SvgIcon
                    inheritViewBox
                    component={UsersIcon}
                    sx={{
                      color: "text.primary",
                      display: "inline-flex",
                      fill: "none",
                      width: 24,
                      height: 24,
                      mr: 1,
                    }}
                  />
                  <RichTypography color="neutral.dark">
                    {contributorsCount}
                  </RichTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <SvgIcon
                    inheritViewBox
                    component={ShareIcon}
                    sx={{
                      color: "text.primary",
                      display: "inline-flex",
                      fill: "none",
                      width: 24,
                      height: 24,
                      mr: 1,
                    }}
                  />
                  <RichTypography color="neutral.dark">{forks}</RichTypography>
                </Box>
                <Box display="flex" alignItems="center">
                  <SvgIcon
                    inheritViewBox
                    component={StarIcon}
                    sx={{
                      color: "text.primary",
                      display: "inline-flex",
                      fill: "none",
                      width: 24,
                      height: 24,
                      mr: 1,
                    }}
                  />
                  <RichTypography color="neutral.dark">{stars}</RichTypography>
                </Box>
              </Box>
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
              {!horizontalDisplay ? (
                <Button
                  sx={{ mt: 2, width: "max-content" }}
                  variant="contained"
                >
                  {exploreText}
                </Button>
              ) : null}
            </CardContent>
          </Grid>
        </Grid>
      </StyledActionArea>
    </Card>
  );
});

ToolCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  topic: PropTypes.string,
  link: PropTypes.text,
};

ToolCard.defaultProps = {
  name: undefined,
  description: undefined,
  image: undefined,
  topic: undefined,
  link: undefined,
};

export default ToolCard;
