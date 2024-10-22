import { Link } from "@commons-ui/next";
import { Card as MuiCard } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import CardActionArea from "./ActionArea";
import CardContent from "./Content";
import CardMedia from "./Media";
import useStyles from "./useStyles";

function Card({
  alt,
  chart,
  children,
  className,
  ctaText,
  description,
  descriptionProps,
  embed,
  href,
  image,
  imageProps,
  linkProps,
  media,
  mediaProps,
  onClick,
  title,
  titleProps,
  variant,
  sx,
  ...props
}) {
  const squareMedia = mediaProps?.square;
  const classes = useStyles({ ...props, squareMedia });
  const actionAreaProps = { href, onClick };
  const contentProps = {
    description,
    descriptionProps,
    href,
    linkProps,
    title,
    titleProps,
  };

  return (
    <MuiCard
      elevation={0}
      square
      sx={(theme) => ({
        backgroundColor: "inherit",
        boxShadow: "none",
        borderRadius: 0,
        padding: {
          xs: squareMedia ? `0 ${theme.typography.pxToRem(36)}` : 0,
          md: 0,
        },
        minWidth: {
          xs: theme.typography.pxToRem(350),
          md: "unset",
        },
        width: {
          xs: "100%",
          md: theme.typography.pxToRem(squareMedia ? 278 : 296),
          lg: theme.typography.pxToRem(squareMedia ? 278 : 376),
        },
        ...sx,
      })}
    >
      <CardActionArea
        {...actionAreaProps}
        classes={{
          root: classes.actionArea,
          focusHighlight: classes.actionAreaFocusHighlight,
          focusVisible: classes.actionAreaFocusVisible,
        }}
      >
        <CardMedia
          {...mediaProps}
          alt={alt}
          chart={chart}
          embed={embed}
          image={image}
          imageProps={imageProps}
          media={media}
          variant={variant}
          classes={{ root: classes.media, image: classes.mediaImage }}
        />
        <CardContent
          {...contentProps}
          classes={{
            root: classes.content,
            description: classes.contentDescription,
            link: classes.contentLink,
            title: classes.contentTitle,
          }}
        />
      </CardActionArea>
      {href && ctaText && (
        <Link
          href={href}
          underline="always"
          variant="subtitle2"
          {...linkProps}
          sx={(theme) => ({
            display: "inline-flex",
            marginTop: theme.typography.pxToRem(20),
            fontWeight: "bold",
          })}
        >
          {ctaText}
        </Link>
      )}
    </MuiCard>
  );
}

Card.propTypes = {
  alt: PropTypes.string,
  chart: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  ctaText: PropTypes.string,
  description: PropTypes.string,
  descriptionProps: PropTypes.shape({}),
  embed: PropTypes.string,
  href: PropTypes.string,
  image: PropTypes.string,
  imageProps: PropTypes.shape({}),
  linkProps: PropTypes.shape({}),
  media: PropTypes.string,
  mediaProps: PropTypes.shape({
    square: PropTypes.bool,
  }),
  onClick: PropTypes.func,
  title: PropTypes.string,
  titleProps: PropTypes.shape({}),
  variant: PropTypes.oneOf(["image", "embed"]),
};

export default Card;
