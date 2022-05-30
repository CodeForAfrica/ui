import { Section, RichTypography } from "@commons-ui/core";
import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import regionIconlg from "@/codeforafrica/assets/images/Africa@2400x 1lg.png";

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
            <Box
              sx={{
                maxWidth: { xs: "350px", sm: "372px", lg: "464px" },
                maxHeight: { xs: "351px", sm: "416px", lg: "518px" },
              }}
            >
              <Image src={regionIconlg} alt="offices across africa" />
            </Box>
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
