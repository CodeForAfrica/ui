import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { Stack } from "@mui/material";
import React from "react";

import BackgroundBox from "@/charterafrica/components/BackgroundBox";
import RichText from "@/charterafrica/components/RichText";

const LogoPageHeader = React.forwardRef(function LogoPageHeader(props, ref) {
  const { title, logo: logoProp, sx } = props;

  if (!title) {
    return null;
  }
  const logo = {
    alt: logoProp.alt || title,
    priority: true,
    src: logoProp.src || logoProp.url,
  };
  return (
    <BackgroundBox sx={sx} ref={ref}>
      <Section ref={ref} sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: 10 } }}>
        <Stack alignItems="center" spacing={3.75}>
          <Figure
            ImageProps={{
              ...logo,
            }}
            sx={{
              borderColor: "common.white",
              height: "173.5px",
              width: "173.5px",
            }}
          />
          <RichText
            component="h1"
            color="text.secondary"
            elements={title}
            textAlign="center"
            typography={{ md: "h1" }}
            variant="h1Small"
            sx={() => ({
              "& > em, & > strong": {
                color: "secondary.main",
                fontStyle: "normal",
              },
            })}
          />
        </Stack>
      </Section>
    </BackgroundBox>
  );
});

export default LogoPageHeader;
