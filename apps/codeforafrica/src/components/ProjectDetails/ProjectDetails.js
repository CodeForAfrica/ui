import { Section } from "@commons-ui/core";
import { useMediaQuery, Divider, Grid } from "@mui/material";
import React from "react";

import ProjectDescription from "./ProjectDescription";
import ProjectStakeholders from "./ProjectStakeholders";

const ProjectDetails = React.forwardRef(function ProjectDetails(props, ref) {
  const { description, donors, links, partners, ...other } = props;
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Section {...other} ref={ref}>
      <Grid container alignItems="stretch" ref={ref}>
        <Grid item xs={12} md sx={{ order: { xs: 0, md: 2 } }}>
          <ProjectStakeholders
            donors={donors}
            partners={partners}
            title="Details"
          />
        </Grid>
        <Divider
          flexItem
          orientation={isDesktop ? "vertical" : "horizontal"}
          sx={{
            borderColor: "grey.main",
            flexBasis: { xs: "100%", md: "auto" },
            maxWidth: { xs: "100%", md: "none" },
            mx: { md: "73px" },
            my: { xs: "22.5px", md: "unset" },
            order: 1,
          }}
        />
        <Grid item xs={12} md="auto" sx={{ order: { xs: 2, md: 0 } }}>
          <ProjectDescription
            description={description}
            links={links}
            title="Description"
          />
        </Grid>
      </Grid>
    </Section>
  );
});

export default ProjectDetails;
