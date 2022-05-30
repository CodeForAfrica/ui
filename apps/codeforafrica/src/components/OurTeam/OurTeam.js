import { Section, RichTypography } from "@commons-ui/core";
import { Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const OurTeam = React.forwardRef(function OurTeam(props, ref) {
  const { title, description, logo } = props;

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

          <Grid
            item
            container
            justifyContent={{ sm: "flex-start", xs: "center" }}
            sm={6}
            xs={12}
          >
            <Box
              sx={{
                width: { xs: "21.87rem", sm: "20rem", lg: "29rem" },
                height: { xs: "21.93rem", sm: "26rem", lg: "32.37rem" },
                position: "relative",
              }}
            >
              <Image
                src={logo}
                layout="fill"
                objectFit="contain"
                alt="offices across africa"
                priority
              />
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
  logo: PropTypes.string,
};

OurTeam.defaultProps = {
  title: undefined,
  description: undefined,
  logo: undefined,
};

export default OurTeam;
