import { Section } from "@commons-ui/core";
import { Figure, Link, RichTypography } from "@commons-ui/next";
import { Box, Button, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RichText from "@/codeforafrica/components/RichText";

const MeetOurTeam = React.forwardRef(function MeetOurTeam(props, ref) {
  const { title, description, href, image } = props;

  if (!title || !description) {
    return null;
  }
  return (
    <Box ref={ref} sx={{ bgcolor: "primary.light" }}>
      <Section
        sx={{
          px: { xs: 2.5, sm: 3.75 },
          py: { xs: 5, sm: 3.75, lg: 7.75 },
        }}
      >
        <Grid container>
          <Grid item sm={6} xs={12} sx={{ order: { sm: 2 } }}>
            <RichTypography
              variant="h2"
              sx={{ typography: { xs: "h3", md: "h2" } }}
            >
              {title}
            </RichTypography>
            <RichText sx={{ pt: 5 }} variant="body3" elements={description} />
            <Button
              component={href ? Link : undefined}
              href={href}
              sx={{ width: { xs: "100%", sm: "auto" }, margin: "2.5rem 0" }}
              variant="contained-reverse"
            >
              Meet our Team
            </Button>
          </Grid>

          <Grid
            item
            container
            justifyContent={{ sm: "flex-start", xs: "center" }}
            sm={6}
            xs={12}
          >
            <Figure
              ImageProps={{
                ...image,
              }}
              sx={{
                height: { xs: "21.93rem", sm: "26rem", lg: "32.37rem" },
                width: { xs: "21.87rem", sm: "20rem", lg: "29rem" },
              }}
            />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

MeetOurTeam.propTypes = {
  title: PropTypes.string,
  description: PropTypes.arrayOf(PropTypes.shape({})),
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
};

MeetOurTeam.defaultProps = {
  title: undefined,
  description: undefined,
  image: undefined,
};

export default MeetOurTeam;
