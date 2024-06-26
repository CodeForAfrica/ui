import { RichTypography, Section } from "@commons-ui/core";
import { Box, Grid } from "@mui/material";
import React from "react";

import GranteeCard from "./GranteeCard";

const Grantees = React.forwardRef(function Grantees(props, ref) {
  const { sx, grantees, title } = props;

  if (!grantees?.length) {
    return null;
  }
  return (
    <Box bgcolor="common.white" sx={sx} ref={ref}>
      <Section sx={{ p: { xs: 2.5, sm: 4 } }}>
        <RichTypography
          color="primary.dark"
          variant="h3Small"
          component="h3"
          mb={3.5}
        >
          {title}
        </RichTypography>
        <Grid container spacing={5}>
          {grantees.map(({ id, ...grantee }) => (
            <Grid item key={id} xs={12} sm={6} md={4}>
              <GranteeCard {...grantee} />
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  );
});

export default Grantees;
