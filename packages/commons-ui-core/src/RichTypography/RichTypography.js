import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React, { useEffect, useImperativeHandle, useRef } from "react";

const RichTypographyRoot = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "LinkProps",
})(({ LinkProps, theme }) => {
  const color = LinkProps?.color || "primary.main";
  return {
    "& a, & a:visited": {
      color: color.split(".").reduce((acc, curr) => acc[curr], theme.palette),
    },
  };
});

const RichTypography = React.forwardRef(function RichTypography(
  { LinkProps, children: childrenProp, component, html = true, ...props },
  ref
) {
  const typographyRef = useRef();
  useImperativeHandle(ref, () => typographyRef.current);
  useEffect(() => {
    if (html && LinkProps?.onClick) {
      const { current: el } = typographyRef;
      if (el) {
        const anchors = el.getElementsByTagName("a");
        for (let i = 0; i < anchors.length; i += 1) {
          anchors[i].onclick = LinkProps.onClick;
        }
      }
    }
  }, [LinkProps?.onClick, html]);

  if (!childrenProp) {
    return null;
  }
  let children;
  let dangerouslySetInnerHTML;
  if (typeof childrenProp === "string" && html) {
    dangerouslySetInnerHTML = {
      __html: childrenProp,
    };
  } else {
    children = childrenProp;
  }
  return (
    <RichTypographyRoot
      LinkProps={LinkProps}
      // We default to `div` to allow other block elements like <p> to be used inside
      // `children`
      component={component || (html ? "div" : undefined)}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      {...props}
      ref={typographyRef}
    >
      {children}
    </RichTypographyRoot>
  );
});

RichTypography.propTypes = {
  children: PropTypes.node,
  html: PropTypes.bool,
  component: PropTypes.elementType,
};

RichTypography.defaultProps = {
  children: undefined,
  html: undefined,
  component: undefined,
};

export default RichTypography;
