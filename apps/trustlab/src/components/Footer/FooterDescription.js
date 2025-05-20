/* eslint-env browser */
import { Figure, Link } from "@commons-ui/next";
import { Stack } from "@mui/material";
import React from "react";

import RichText from "@/trustlab/components/RichText";

const FooterDescription = React.forwardRef(
  function FooterDescription(props, ref) {
    const { description, logo, sx } = props;

    if (!(logo || description)) {
      return null;
    }
    return (
      <Stack alignItems={{ xs: "center", md: "flex-start" }} sx={sx} ref={ref}>
        <Link href="/">
          <Figure
            ImageProps={logo}
            sx={{
              display: {
                sm: "block",
              },
              filter: "grayscale(100%)",
              height: { xs: "113px", md: "113px", lg: "113px" },
              width: { xs: "251px", md: "251px", lg: "251px" },
            }}
          />
        </Link>
        <RichText
          variant="footer"
          typographyProps={{
            LinkProps: {
              color: "text.secondary",
              sx: { textDecorationColor: "text.secondary" },
            },
          }}
          sx={(theme) => ({
            a: {
              textDecorationColor: theme.palette.text.secondary,
            },
            mt: "52px",
            textAlign: { xs: "center", md: "left" },
            typography: "footer",
          })}
          ref={ref}
          elements={description}
        />
      </Stack>
    );
  },
);

export default FooterDescription;
