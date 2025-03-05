import { RichText } from "@commons-ui/payload";
import { CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function Content({
  description,
  DescriptionProps,
  title,
  TitleProps,
  href,
  sx,
}) {
  if (!(title || description || href)) {
    return null;
  }

  return (
    <CardContent
      sx={{
        padding: 0,
        "&:last-child": {
          padding: 0,
        },
        ...sx,
      }}
    >
      <Typography
        variant="h5"
        {...TitleProps}
        sx={{
          ...TitleProps?.sx,
        }}
      >
        {title}
      </Typography>
      {/* Support for rich text while keeping backwards compatibility */}
      {Array.isArray(description) ? (
        <RichText {...DescriptionProps} elements={description} />
      ) : (
        <Typography
          variant="subtitle2"
          {...DescriptionProps}
          sx={({ typography }) => ({
            marginTop: typography.pxToRem(20),
            ...DescriptionProps?.sx,
          })}
        >
          {description}
        </Typography>
      )}
    </CardContent>
  );
}

Content.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  descriptionProps: PropTypes.shape({}),
  title: PropTypes.string,
  titleProps: PropTypes.shape({}),
  href: PropTypes.string,
  ctaText: PropTypes.string,
  linkProps: PropTypes.shape({}),
};

export default Content;
