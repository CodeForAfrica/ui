/* eslint-env browser */
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Stack } from "@mui/material";
import React from "react";

const FooterDescription = React.forwardRef(
  function FooterDescription(props, ref) {
    const { description, logo, sx } = props;

    if (!(logo || description)) {
      return null;
    }
    return (
      <Stack alignItems="flex-start" sx={sx} ref={ref}>
        <Link href="/">
          <Figure
            ImageProps={logo}
            sx={{
              display: {
                sm: "block",
              },
              filter: "grayscale(100%)",
              height: "60px",
              width: "140px",
              borderBottom: "2px solid",
              borderColor: "text.secondary",
            }}
          />
        </Link>
        <LexicalRichText
          TypographyProps={{
            variant: "p1",
            LinkProps: {
              color: "text.secondary",
              textDecoration: "underline",
              textDecorationColor: "text.secondary",
            },
            sx: {
              mt: { xs: 2, md: 2.5 },
            },
          }}
          sx={{
            mt: 0,
          }}
          ref={ref}
          elements={description}
        />
      </Stack>
    );
  },
);

export default FooterDescription;
