import { RichTypography } from "@commons-ui/core";
import DownloadIcon from "@mui/icons-material/Download";
import InfoIcon from "@mui/icons-material/Info";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Grid } from "@mui/material";
import React from "react";

import Action from "./Action";
import Download from "./Download";
import Share from "./Share";

const IndicatorTitle = React.forwardRef(function IndicatorTitle(
  { children, description, disableToggle, title, view, ...props },
  ref,
) {
  const actions = [
    description && {
      id: "act-description",
      title: "Description",
      header: "Learn More",
      children: (
        <RichTypography
          sx={(theme) => ({
            fontSize: theme.typography.pxToRem(11),
            lineHeight: 17 / 11,
            color: "#666666",
            padding: `${theme.typography.pxToRem(18)} ${theme.typography.pxToRem(
              20,
            )} ${theme.typography.pxToRem(31)} ${theme.typography.pxToRem(16)}`,
            "& > p > span": {
              display: "inline-block",
            },
          })}
        >
          {description}
        </RichTypography>
      ),
      icon: <InfoIcon />,
    },
    {
      id: "act-download",
      title: "Download",
      header: disableToggle ? "Download chart as" : "Chart value as:",
      children: (
        <Download
          {...props}
          title={title}
          disableToggle={disableToggle}
          height={view?.height()}
          data={[
            ...(view?.data("primary") ?? []),
            ...(view?.data("secondary") ?? []),
          ]}
        />
      ),
      icon: <DownloadIcon />,
    },
    {
      id: "act-share",
      title: "Share",
      header: "Share chart via:",
      children: <Share title={title} {...props} />,
      icon: <ShareIcon />,
    },
  ];

  return (
    <Box
      {...props}
      sx={(theme) => ({
        paddingTop: theme.typography.pxToRem(24),
        paddingBottom: theme.typography.pxToRem(25),
        ...props.sx,
      })}
      ref={ref}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={8}>
          <RichTypography variant="h6">{children || title}</RichTypography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          container
          sx={(theme) => ({
            justifyContent: "flex-start",
            marginTop: theme.typography.pxToRem(20),
            marginBottom: theme.typography.pxToRem(20),
            [theme.breakpoints.up("md")]: {
              justifyContent: "flex-end",
              margin: 0,
            },
          })}
        >
          {actions
            .filter((a) => a?.id)
            .map((act) => (
              <Grid
                item
                key={act.id}
                sx={(theme) => ({
                  marginRight: theme.typography.pxToRem(14),
                  "&:last-of-type": {
                    marginRight: 0,
                  },
                })}
              >
                <Action {...act} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Box>
  );
});

export default IndicatorTitle;
