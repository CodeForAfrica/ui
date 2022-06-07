import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Grid, Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import ImpactCard from "../ImpactCard/ImpactCard";

const ImpactCardList = React.forwardRef(function ImpactCardList(props, ref) {
  const { initiatives, action, title } = props;
  return (
    <Box
      sx={{
        backgroundColor: "background.main",
      }}
    >
      <Section
        sx={{
          px: { xs: 2.5, sm: 2.5, md: 0 },
          py: { xs: 5.25, sm: 5.25, md: 4.25, lg: 4.25, xl: 12.75 },
        }}
        ref={ref}
      >
        {title && (
          <Typography
            sx={{
              marginBottom: "40px",
              marginTop: { sm: 3.25, md: 3.75, lg: 0 },
            }}
            variant="h4"
          >
            {title}
          </Typography>
        )}
        <Grid container justifyContent="space-between">
          {initiatives?.map((initiative) => {
            return (
              <Grid item>
                <ImpactCard key={initiative.title} {...initiative} />
              </Grid>
            );
          })}
        </Grid>
        {action?.title && (
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              component={Link}
              href={action.href}
              sx={{ width: { xs: "100%", sm: "unset" }, marginTop: 7.25 }}
            >
              {action.title}
            </Button>
          </Box>
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
