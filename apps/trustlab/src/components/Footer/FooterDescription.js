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
      <Stack alignItems={{ xs: "center", md: "flex-start" }} sx={sx} ref={ref}>
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
              "&::after": {
                content: '""',
                display: "block",
                backgroundColor: "text.secondary",
                width: "18px",
                height: "2px",
                position: "absolute",
                bottom: "0",
              },
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
            textAlign: { xs: "center", md: "left" },
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
