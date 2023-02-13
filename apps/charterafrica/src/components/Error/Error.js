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
  const {
    statusCode,
    description = [],
    title = "",
    createdAt,
    updatedAt,
    blockType,
    action,
    ...other
  } = props;
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
        <RichTypography color="neutral.dark" textAlign="center" variant="h1">
          {statusCode}
        </RichTypography>
        <RichTypography
          sx={{ mt: 2.5, textTransform: "uppercase" }}
          color="neutral.dark"
          textAlign="center"
          variant="h3"
        >
          {title}
        </RichTypography>
        <RichText
          sx={{ mt: 2.5 }}
          color="neutral.dark"
          textAlign="center"
          variant="p3"
          elements={description}
        />
        <RichTypography component="div" textAlign="center">
          <Link underline="none" href={action.href || ""}>
            <Button sx={{ mt: 5 }} color="secondary" variant="contained">
              {action?.title}
            </Button>
          </Link>
        </RichTypography>
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
