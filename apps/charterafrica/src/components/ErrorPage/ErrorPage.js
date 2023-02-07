import RichTypography from "@/commons-ui/core/RichTypography";
import Section from "@/commons-ui/core/Section";
import { Link } from "@commons-ui/next";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import { secondary, neutral } from "@/charterafrica/colors";
import BackgroundBox from "@/charterafrica/components/BackgroundBox";
import RichText from "@/charterafrica/components/RichText";
import mapLinkTypeToHref from "@/charterafrica/payload/utils/mapLinkTypeToHref";

const ErrorPage = React.forwardRef(function Error(props, ref) {
  const {
    statusCode,
    description = [],
    title = "",
    createdAt,
    updatedAt,
    action,
    ...other
  } = props;

  const link =
    action &&
    mapLinkTypeToHref({
      doc: { ...action?.doc, relationTo: "pages" },
      linkType: "internal",
    });

  return (
    <BackgroundBox
      {...other}
      bgcolor={secondary[50]}
      display="flex"
      alignItems="center"
      sx={{
        backgroundImage: {
          md: `url(/images/notFound.png)`,
        },
        height: "100%",
        width: "100%",
        position: { md: "absolute", xs: "relative" },
        backgroundSize: "50% 100%",
        ...props?.sx,
      }}
      ref={ref}
    >
      <Section sx={{ p: 10 }}>
        <RichTypography color={neutral[900]} textAlign="center" variant="h1">
          {statusCode}
        </RichTypography>
        <RichTypography
          sx={{ mt: 2.5, textTransform: "uppercase" }}
          color={neutral[900]}
          textAlign="center"
          variant="h3"
        >
          {title}
        </RichTypography>
        <RichText
          sx={{ mt: 2.5 }}
          color={neutral[900]}
          textAlign="center"
          variant="p3"
          elements={description}
        />
        <RichTypography component="div" textAlign="center">
          <Link underline="none" href={link || ""}>
            <Button sx={{ mt: 5 }} color="secondary" variant="contained">
              {action?.title}
            </Button>
          </Link>
        </RichTypography>
      </Section>
    </BackgroundBox>
  );
});

ErrorPage.propTypes = {
  statusCode: PropTypes.number,
  title: PropTypes.string,
  link: PropTypes.shape({}),
  description: PropTypes.arrayOf(PropTypes.shape({})),
};
ErrorPage.defaultProps = {
  statusCode: undefined,
  title: undefined,
  link: undefined,
  description: undefined,
};
export default ErrorPage;
