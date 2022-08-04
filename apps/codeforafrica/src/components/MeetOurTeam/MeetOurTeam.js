import { Section, RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const MeetOurTeam = React.forwardRef(function MeetOurTeam(props, ref) {
  const { title, description, href, logo } = props;

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
            <RichTypography variant="body3" sx={{ pt: 5 }}>
              {description}
            </RichTypography>
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
            <Box
              component="figure"
              sx={{
                height: { xs: "21.93rem", sm: "26rem", lg: "32.37rem" },
                position: "relative",
                margin: 0,
                width: { xs: "21.87rem", sm: "20rem", lg: "29rem" },
              }}
            >
              <Image
                src={logo}
                layout="fill"
                objectFit="contain"
                alt="offices across africa"
              />
            </Box>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

MeetOurTeam.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  logo: PropTypes.string,
};

MeetOurTeam.defaultProps = {
  title: undefined,
  description: undefined,
  logo: undefined,
};

export default MeetOurTeam;
