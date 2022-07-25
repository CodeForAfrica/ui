import { RichTypography, Section } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

const CMSContent = React.forwardRef(function CMSContent({ sx, ...other }, ref) {
  return (
    <Section
      component="section"
      sx={{ px: { xs: 2.5, sm: 0 }, ...sx }}
      ref={ref}
    >
      <RichTypography
        {...other}
        sx={{
          typography: { xs: "body2", md: "body3" },
          "& blockquote": {
            bgcolor: "background.main",
            mx: 0,
            my: { xs: 2.5 },
            p: { xs: 1.25, md: "50px 55.5px" },
            typography: { xs: "body2" },
          },
          "& figure": {
            mx: 0,
            my: { xs: 2.5 },
            "& img": {
              height: "auto",
              objectFit: "contain",
              width: "100%",
            },
            "& figcaption": {
              color: "primary.main",
              mt: 2.5,
              textAlign: "center",
              typography: { xs: "caption" },
            },
          },
          "& hr": {
            borderWidth: 0,
            borderBottomWidth: "thin",
            borderColor: "divider",
            borderStyle: "solid",
          },
          ...other?.sx,
        }}
      />
    </Section>
  );
});

CMSContent.propTypes = {
  sx: PropTypes.shape({}),
};

CMSContent.defaultProps = {
  sx: undefined,
};

export default CMSContent;
