import { Section } from "@commons-ui/core";
import { Link, RichTypography } from "@commons-ui/next";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

import SlackIcon from "@/codeforafrica/assets/icons/Type=slack, Size=64, Color=CurrentColor.svg";

const JoinOurSlack = React.forwardRef(function JoinOurSlack(props, ref) {
  const { action: { href, label } = {}, subtitle, sx, title, ...other } = props;

  if (!(title && label && href)) {
    return null;
  }
  return (
    <Section sx={{ px: { xs: 2.5, sm: 0 }, ...sx }} {...other} ref={ref}>
      <Paper elevation={0} square sx={{ bgcolor: "background.main", p: 2.5 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md="auto">
            <Grid
              container
              alignItems="center"
              flexWrap="nowrap"
              columnSpacing={2.5}
            >
              <Grid item>
                <SvgIcon
                  component={SlackIcon}
                  viewBox="0 0 64 64"
                  sx={{
                    color: "primary.main",
                    fill: "none",
                    fontSize: "64px",
                  }}
                />
              </Grid>
              <Grid item container flexDirection="column">
                <Grid item>
                  <RichTypography variant="body3SemiBold">
                    {title}
                  </RichTypography>
                </Grid>
                <Grid item>
                  <RichTypography variant="body1" sx={{ mt: "5px" }}>
                    {subtitle}
                  </RichTypography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md="auto">
            <Button
              variant="contained-reverse"
              component={href ? Link : undefined}
              href={href}
              sx={{ width: { xs: "100%", md: "auto" }, mt: { xs: 2.5, md: 0 } }}
            >
              {label}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Section>
  );
});

export default JoinOurSlack;
