import { RichTypography } from "@commons-ui/core";
import { CardContent } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import Link from "@/twoopstracker/components/Link";

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
      <RichTypography variant="body1" {...titleProps} className={classes.title}>
        {title}
      </RichTypography>
      <RichTypography
        variant="body1"
        {...descriptionProps}
        className={classes.description}
      >
        {description}
      </RichTypography>
      {href && (
        <Link
          href={href}
          underline="always"
          variant="body1"
          {...linkProps}
          className={classes.link}
        >
          {ctaText}
        </Link>
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

Content.defaultProps = {
  className: undefined,
  description: undefined,
  descriptionProps: undefined,
  title: undefined,
  titleProps: undefined,
  href: undefined,
  ctaText: "Read me",
  linkProps: undefined,
};

export default Content;
