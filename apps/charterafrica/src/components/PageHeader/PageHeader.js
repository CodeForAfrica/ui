import React from "react";

import ImagePageHeader from "./ImagePageHeader";
import LogoPageHeader from "./LogoPageHeader";

const PageHeader = React.forwardRef(function PageHeader(props, ref) {
  const { variant, ...other } = props;

  const Header = variant === "logo" ? LogoPageHeader : ImagePageHeader;
  return <Header {...other} ref={ref} />;
});

export default PageHeader;
