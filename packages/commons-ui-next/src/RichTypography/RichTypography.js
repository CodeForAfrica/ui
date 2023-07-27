/* eslint-env browser */

import { RichTypography as CuiRichTypography } from "@commons-ui/core";
import { useRouter } from "next/router";
import React from "react";

import isExternalUrl from "@/commons-ui/next/utils/isExternalUrl";

const RichTypography = React.forwardRef(function RichTypography(
  { LinkProps, ...props },
  ref
) {
  const router = useRouter();
  const onClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (isExternalUrl(href)) {
      window.open(href, "_blank", "noreferrer noopener");
    } else {
      router.push(href);
    }
  };

  return (
    <CuiRichTypography
      {...props}
      LinkProps={{ onClick, ...LinkProps }}
      ref={ref}
    />
  );
});

export default RichTypography;
