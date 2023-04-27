import { Link } from "@commons-ui/next";
import { Box, Button, CardContent, CardMedia, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import GithubIcon from "@/charterafrica/assets/icons/github.svg";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import Card from "@/charterafrica/components/StyledCard";

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
    showButton,
    variant = "outlined",
  } = props;
  const ownerState = {
    elevation,
    square,
    variant,
  };

  return (
    <Card
      elevation={elevation}
      ownerState={ownerState}
      variant={variant}
      sx={{ display: "flex", flexWrap: "wrap" }}
      ref={ref}
    >
      <CardMedia image={image} sx={{ height: 200, minWidth: 314 }} />
      <CardContent
        sx={(theme) => ({
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minWidth: 314,
          [theme.breakpoints.up("md")]: {
            px: 7.5,
          },
        })}
      >
        <Box display="flex" justifyContent="space-between">
          <LineClampedRichTypography
            color="neutral.dark"
            html={false}
            lineClamp={1}
            textAlign="left"
            variant="h5SmallSemiBold"
            sx={(theme) => ({
              minHeight: theme.typography.h5SmallSemiBold.fontSize,
              [theme.breakpoints.up("md")]: {
                minHeight: theme.typography.h5SmallSemiBold.fontSize,
                typography: "h5SemiBold",
              },
            })}
          >
            {name}
          </LineClampedRichTypography>
          {showButton ? (
            <Button
              variant="contained"
              href={link?.href}
              component={link?.href ? Link : undefined}
              sx={{ width: "fit-content" }}
            >
              <SvgIcon
                component={GithubIcon}
                sx={{
                  color: "text.secondary",
                  display: "inline-flex",
                  fill: "none",
                  mr: 0.5,
                }}
              />
              {link?.label}
            </Button>
          ) : null}
        </Box>
        <LineClampedRichTypography
          color="neutral.dark"
          html={false}
          lineClamp={1}
          textAlign="left"
          variant="h5SmallSemiBold"
          sx={(theme) => ({
            mt: 2.5,
            minHeight: theme.typography.h5SmallSemiBold.fontSize,
            [theme.breakpoints.up("md")]: {
              minHeight: theme.typography.h5SemiBold.fontSize,
              typography: "h5SmallSemiBold",
            },
          })}
        >
          {topic}
        </LineClampedRichTypography>
        <LineClampedRichTypography
          variant="p1"
          color="neutral.main"
          sx={(theme) => ({
            mt: 2.5,
            maxHeight: `calc(${theme.typography.p1.fontSize}px * ${theme.typography.p1.lineHeight} * 3)`,
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
    </Card>
  );
});

ToolCard.propTypes = {
  name: PropTypes.string,
  lastActive: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  topic: PropTypes.string,
  showButton: PropTypes.bool,
  link: PropTypes.text,
};

ToolCard.defaultProps = {
  name: undefined,
  lastActive: undefined,
  description: undefined,
  image: undefined,
  topic: undefined,
  showButton: undefined,
  link: undefined,
};

export default ToolCard;
