import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Grid, Chip } from "@mui/material";
import React from "react";

import StarIcon from "@/charterafrica/assets/icons/Type=Star, Size=24, Color=CurrentColor.svg";
import { neutral } from "@/charterafrica/colors";
import formatDateTime from "@/charterafrica/utils/formatDate";

const RepositoryCard = React.forwardRef(function Tools(props, ref) {
  const {
    name,
    stargazers,
    visibility,
    description,
    url,
    updatedAt,
    techSkills,
    sx,
  } = props;
  const updatedDate = formatDateTime(updatedAt, { includeTime: false });

  return (
    <Link
      ref={ref}
      underline="none"
      color="text.primary"
      href={url}
      sx={{
        boxShadow: "none",
        my: 2,
        border: "none",
        borderRadius: "0",
        borderBottom: "1px solid ",
        borderColor: neutral[50],
        width: "100%",
        ...sx,
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item>
          <RichTypography variant="h6" mb={2}>
            {name}
          </RichTypography>
          <RichTypography variant="body2" mb={1}>
            {description}
          </RichTypography>
          <RichTypography variant="body2" mb={1}>
            {techSkills}
          </RichTypography>
          <RichTypography variant="body2" mb={1}>
            {updatedDate}
          </RichTypography>
        </Grid>
        <Grid item container direction="column" md={1} gap={1}>
          <Grid container gap={1} alignItems="center" justifyContent="center">
            <StarIcon
              sx={{
                width: "25px",
                height: "25px",
              }}
            />
            <RichTypography variant="p1SemiBold">{stargazers}</RichTypography>
          </Grid>
          <Chip label={visibility} variant="outlined" />
        </Grid>
      </Grid>
    </Link>
  );
});

export default RepositoryCard;
