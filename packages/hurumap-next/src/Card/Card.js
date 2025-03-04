import { Link } from "@commons-ui/next";
import { Card as MuiCard } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import CardActionArea from "./ActionArea";
import CardContent from "./Content";
import CardMedia from "./Media";

function Card({
  alt,
  chart,
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
}) {
  const squareMedia = mediaProps?.square;
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
      sx={({ typography }) => ({
        backgroundColor: "inherit",
        boxShadow: "none",
        borderRadius: 0,
        padding: {
          xs: squareMedia ? `0 ${typography.pxToRem(36)}` : 0,
          md: 0,
        },
        minWidth: {
          xs: typography.pxToRem(350),
          md: "unset",
        },
        width: {
          xs: "100%",
          md: typography.pxToRem(squareMedia ? 278 : 296),
          lg: typography.pxToRem(squareMedia ? 278 : 376),
        },
        ...sx,
      })}
    >
      <CardActionArea {...actionAreaProps}>
        <CardMedia
          {...mediaProps}
          alt={alt}
          chart={chart}
          embed={embed}
          image={image}
          imageProps={imageProps}
          media={media}
          variant={variant}
        />
        <CardContent
          {...contentProps}
          TitleProps={{
            sx: ({ typography }) => ({
              marginTop: typography.pxToRem(squareMedia ? 20 : 40),
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
            }),
          }}
          DescriptionProps={{
            sx: {
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
            },
          }}
          sx={({ typography }) => ({
            backgroundColor: "inherit",
            boxShadow: "none",
            borderRadius: 0,
            padding: {
              xs: squareMedia ? `0 ${typography.pxToRem(36)}` : 0,
              md: 0,
            },
            minWidth: {
              xs: typography.pxToRem(350),
              md: "unset",
            },
            width: {
              xs: "100%",
              md: typography.pxToRem(squareMedia ? 278 : 296),
              lg: typography.pxToRem(squareMedia ? 278 : 376),
            },
          })}
        />
      </CardActionArea>
      {href && ctaText && (
        <Link
          href={href}
          underline="always"
          variant="subtitle2"
          {...linkProps}
          sx={({ typography }) => ({
            display: "inline-flex",
            marginTop: typography.pxToRem(20),
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
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
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
