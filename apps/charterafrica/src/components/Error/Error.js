import RichTypography from "@/commons-ui/core/RichTypography";
import Section from "@/commons-ui/core/Section";
import { Link } from "@commons-ui/next";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import { secondary } from "@/charterafrica/colors";
import BackgroundBox from "@/charterafrica/components/BackgroundBox";
import RichText from "@/charterafrica/components/RichText";

const Error = React.forwardRef(function Error(props, ref) {
  const { statusCode, description, title, link } = props;

  if (!title?.length) {
    return null;
  }
  return (
    <BackgroundBox
      bgcolor={secondary[50]}
      display="flex"
      alignItems="center"
      sx={{
        backgroundImage: {
          md: `url(/images/notFound.png)`,
        },
        height: "100%",
        width: "100%",
        minHeight: 516,
        backgroundSize: "50% 100%",
        ...props?.sx,
      }}
      ref={ref}
    >
      <Section sx={{ p: 12, textAlign: "center" }}>
        <RichTypography
          color="neutral.dark"
          display={{ xs: "block", sm: "none" }}
          textAlign="center"
          textTransform="uppercase"
          variant="h3"
          sx={{ mt: { xs: 0, sm: 2.5 } }}
        >
          {statusCode} - {title}
        </RichTypography>
        <RichTypography
          color="neutral.dark"
          display={{ xs: "none", sm: "block" }}
          textAlign="center"
          variant="h1"
        >
          {statusCode}
        </RichTypography>
        <RichTypography
          color="neutral.dark"
          display={{ xs: "none", sm: "block" }}
          textAlign="center"
          textTransform="uppercase"
          variant="h3"
          sx={{ mt: { xs: 0, sm: 2.5 } }}
        >
          {title}
        </RichTypography>
        <RichText
          color="neutral.dark"
          elements={description}
          textAlign="center"
          variant="p3"
          sx={{ mt: 2.5 }}
        />

        {link?.label?.length ? (
          <Button
            color="secondary"
            component={link.href ? Link : undefined}
            href={link.href}
            variant="contained"
            sx={{ mt: 5 }}
          >
            {link.label}
          </Button>
        ) : null}
      </Section>
    </BackgroundBox>
  );
});

Error.propTypes = {
  statusCode: PropTypes.number,
  title: PropTypes.string,
  link: PropTypes.shape({}),
  description: PropTypes.arrayOf(PropTypes.shape({})),
};

Error.defaultProps = {
  statusCode: undefined,
  title: undefined,
  link: undefined,
  description: undefined,
};

export default Error;
