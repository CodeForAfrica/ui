import { RichTypography } from "@commons-ui/core";
import { RichText } from "@commons-ui/payload";
import { CardContent } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    padding: 0,
    "&:last-child": {
      padding: 0,
    },
  },
  title: {},
  description: {
    marginTop: typography.pxToRem(20),
  },
  link: {
    display: "inline-flex",
    marginTop: typography.pxToRem(20),
    fontWeight: "bold",
  },
}));

function Content({
  className,
  description,
  descriptionProps,
  title,
  titleProps,
  href,
  ctaText,
  linkProps,
  ...props
}) {
  const classes = useStyles(props);
  if (!(title || description || href)) {
    return null;
  }

  return (
    <CardContent className={clsx(classes.root, className)}>
      <RichTypography variant="h5" {...titleProps} className={classes.title}>
        {title}
      </RichTypography>
      {/* Support for rich text while keeping backwards compatibility */}
      {Array.isArray(description) ? (
        <RichText
          {...descriptionProps}
          className={classes.description}
          elements={description}
        />
      ) : (
        <RichTypography
          variant="subtitle2"
          {...descriptionProps}
          className={classes.description}
        >
          {description}
        </RichTypography>
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
