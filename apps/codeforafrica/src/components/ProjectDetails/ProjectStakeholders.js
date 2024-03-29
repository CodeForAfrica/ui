import { RichTypography } from "@commons-ui/next";
import { Chip as MuiChip, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

import ShareThisPage from "@/codeforafrica/components/ShareThisPage";

const Chip = styled(MuiChip, {
  slot: "Root",
})(({ theme }) => ({
  ...theme.typography.caption,
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.primary,
  padding: 0,
  "& .MuiChip-label": {
    padding: theme.spacing(1),
  },
}));

const ProjectStakeholders = React.forwardRef(
  function ProjectStakeholders(props, ref) {
    const { donors, partners, title, ...other } = props;

    if (!title?.length) {
      return null;
    }
    return (
      <Stack spacing={{ xs: 2.5, md: 5 }} {...other} ref={ref}>
        <RichTypography variant="h5Small" sx={{ typography: { md: "h5" } }}>
          {title}
        </RichTypography>
        {partners?.list?.length > 0 ? (
          <>
            <RichTypography variant="captionCap" sx={{ mb: 2.5 }}>
              {partners.title}
            </RichTypography>
            <Stack
              direction="row"
              flexWrap="wrap"
              sx={{ columnGap: "13px", rowGap: "10px" }}
            >
              {partners.list.map(({ name }) => (
                <Chip label={name} key={name} />
              ))}
            </Stack>
          </>
        ) : null}
        {donors?.list?.length > 0 ? (
          <>
            <RichTypography variant="captionCap" sx={{ mb: 2.5 }}>
              {donors.title}
            </RichTypography>
            <Stack
              direction="row"
              flexWrap="wrap"
              sx={{ columnGap: "13px", rowGap: "10px" }}
            >
              {donors.list.map(({ name }) => (
                <Chip label={name} key={name} />
              ))}
            </Stack>
          </>
        ) : null}
        <ShareThisPage
          direction="column"
          title="Share This Project"
          sx={{
            alignItems: "flex-start",
          }}
        />
      </Stack>
    );
  },
);

export default ProjectStakeholders;
