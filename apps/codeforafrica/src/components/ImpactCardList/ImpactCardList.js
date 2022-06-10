import { Section, RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Grid, Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import ImpactCard from "../ImpactCard/ImpactCard";

const ImpactCardList = React.forwardRef(function ImpactCardList(props, ref) {
  const { initiatives, action, title } = props;

  if (!initiatives?.length) {
    return null;
  }
  return (
    <Box
      sx={{
        backgroundColor: "background.main",
      }}
      ref={ref}
    >
      <Section
        sx={{
          px: { xs: 2.5, md: 0 },
          py: { xs: 5, sm: 10, md: 4, lg: 12.5 },
        }}
      >
        {title && (
          <RichTypography
            sx={{
              mb: { xs: 10, md: 5, lg: 7.55 },
              mt: { xs: 2.25, sm: 0, md: 4, lg: 0 },
            }}
            variant="h4"
          >
            {title}
          </RichTypography>
        )}
        <Grid container justifyContent="space-between">
          {initiatives.map((initiative) => (
            <Grid item key={initiative.title}>
              <ImpactCard key={initiative.title} {...initiative} />
            </Grid>
          ))}
        </Grid>
        {action?.title && (
          <Grid container justifyContent="center">
            <Button
              variant="contained"
              component={Link}
              href={action.href}
              sx={{ width: { xs: "100%", sm: "unset" }, marginTop: 7.25 }}
            >
              {action.title}
            </Button>
          </Grid>
        )}
      </Section>
    </Box>
  );
});

ImpactCardList.propTypes = {
  initiatives: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  action: PropTypes.shape({}),
};

ImpactCardList.defaultProps = {
  initiatives: undefined,
  title: undefined,
  action: undefined,
};

export default ImpactCardList;
