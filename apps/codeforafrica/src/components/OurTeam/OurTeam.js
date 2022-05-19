import { Section } from "@commons-ui/core";
import { Typography, Button, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Image from "next/image";
import React from "react";

import regionIcon from "@/codeforafrica/assets/images/Africa@2400x 1.png";

const OurTeam = React.forwardRef(function OurTeam(props, ref) {
  return (
    <Box ref={ref} sx={{ bgcolor: "primary.light" }}>
      <Section
        sx={{
          px: { xs: 2.5, sm: 0 },
          py: { xs: 5, md: 8, lg: 10 },
        }}
      >
        <Grid container>
          <Grid item sm={6} sx={{ order: { sm: 2 } }}>
            <Typography variant="h3">
              A truly pan-African team across the continent
            </Typography>
            <Typography sx={{ paddingTop: "40px" }} variant="body2">
              Lorem ipsum dolor sit amet consectetur adipiscing elit gravida
              sociosqu, nisl aliquet ullamcorper praesent bibendum volutpat
              sodales urna, ultrices dui parturient vitae ac netus convallis
              integer. <br />
              <br /> Euismod posuere fusce mollis etiam himenaeos non aliquam
              nulla dis consequat ornare, velit odio condimentum augue felis na.
            </Typography>
            <Button
              sx={{ width: { xs: "100%", sm: "auto" }, margin: "40px 0" }}
              variant="contained"
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

export default OurTeam;
