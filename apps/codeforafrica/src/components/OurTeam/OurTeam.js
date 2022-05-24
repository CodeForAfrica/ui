import { Section, RichTypography } from "@commons-ui/core";
import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import regionIcon from "@/codeforafrica/assets/images/Africa@2400x 1.png";

const OurTeam = React.forwardRef(function OurTeam(props, ref) {
  const { title, description } = props;

  if (!title || !description) {
    return null;
  }
  return (
    <Box ref={ref} sx={{ bgcolor: "primary.light" }}>
      <Section
        sx={{
          px: { xs: 2.5, sm: 0 },
          py: { xs: 5, sm: 12.5, md: 12.5, lg: 7.75 },
        }}
      >
        <Grid container>
          <Grid item sm={6} sx={{ order: { sm: 2 } }}>
            <Typography variant="h2">{title}</Typography>
            <RichTypography variant="body3" sx={{ pt: 5 }}>
              {description}
            </RichTypography>
            <Button
              sx={{ width: { xs: "100%", sm: "auto" }, margin: "2.5rem 0" }}
              variant="contained-reverse"
            >
              Meet our Team
            </Button>
          </Grid>

          <Grid item sm={6}>
            <Image src={regionIcon} alt="" />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

OurTeam.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

OurTeam.defaultProps = {
  title: undefined,
  description: undefined,
};

export default OurTeam;
