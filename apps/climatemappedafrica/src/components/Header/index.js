import { RichTypography } from "@commons-ui/core";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import RichText from "@/climatemappedafrica/components/RichText";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {},
  overline: {
    marginBottom: `${typography.pxToRem(12)}`,
  },
  title: {
    "& .highlight": {
      display: "inline-block",
      position: "relative",
      "&:after": {
        borderBottom: `${typography.pxToRem(30)} solid ${palette.primary.main}`,
        bottom: 0,
        content: '""',
        left: 0,
        opacity: 0.1,
        position: "absolute",
        width: "100%",
      },
    },
  },
  subtitle: {
    marginTop: `${typography.pxToRem(20)}`,
  },
}));

function Header({ className, overline, subtitle, children, ...props }) {
  const classes = useStyles(props);

  return (
    <header className={clsx(classes.root, className)}>
      <RichTypography variant="overline" className={classes.overline}>
        {overline}
      </RichTypography>
      <RichTypography variant="h1" className={classes.title}>
        {children}
      </RichTypography>
      {typeof subtitle === "string" ? (
        <RichTypography variant="subtitle1" className={classes.subtitle}>
          {subtitle}
        </RichTypography>
      ) : (
        <RichText className={classes.subtitle} elements={subtitle} />
      )}
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  overline: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Header;
