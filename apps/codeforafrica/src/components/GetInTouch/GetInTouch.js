import { Section } from "@commons-ui/core";
import { Link, RichTypography } from "@commons-ui/next";
import { Button, Stack, SvgIcon } from "@mui/material";
import React from "react";

import MailIcon from "@/codeforafrica/assets/icons/Type=mail, Size=24, Color=CurrentColor.svg";
import TwoToneBackground from "@/codeforafrica/components/TwoToneBackground";

const GetInTouch = React.forwardRef(function GetInTouch(props, ref) {
  const {
    action: { href, label },
    subtitle,
    title,
    sx,
  } = props;

  return (
    <TwoToneBackground
      sx={{ py: { xs: "82.5px", sm: "102.5px", md: "94.5" }, ...sx }}
      ref={ref}
    >
      <Section sx={{ px: { xs: 2.5, sm: 0 }, zIndex: 1 }}>
        <Stack alignItems="center">
          <RichTypography
            align="center"
            variant="h2"
            sx={{ typography: { md: "h1" } }}
          >
            {title}
          </RichTypography>
          <RichTypography
            align="center"
            color="primary"
            variant="h5"
            sx={{ mt: "30px" }}
          >
            {subtitle}
          </RichTypography>
          <Button
            href={href}
            component={href ? Link : undefined}
            startIcon={
              <SvgIcon
                component={MailIcon}
                sx={{
                  color: "inherit",
                  fill: "none",
                  fontSize: "16px",
                }}
              />
            }
            size="large"
            variant="contained"
            sx={{
              color: "text.secondary",
              mt: "30px",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            {label}
          </Button>
        </Stack>
      </Section>
    </TwoToneBackground>
  );
});

export default GetInTouch;
