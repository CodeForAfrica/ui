import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Menu from "@/climatemappedafrica/components/Menu";
import NextImageButton from "@/climatemappedafrica/components/NextImageButton";
import Section from "@/climatemappedafrica/components/Section";

function DesktopNavigation({ logo, menus, socialLinks }) {
  return (
    <div>
      <Section>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <NextImageButton
              href="/"
              {...logo}
              width={200}
              height={100}
              priority
            />
          </Grid>
          <Grid
            item
            xs={9}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Menu links={menus} socialLinks={socialLinks} />
          </Grid>
          <Grid />
        </Grid>
      </Section>
    </div>
  );
}

DesktopNavigation.propTypes = {
  logo: PropTypes.shape({}),
  menus: PropTypes.arrayOf(PropTypes.shape({})),
  socialLinks: PropTypes.arrayOf(PropTypes.shape({})),
};

export default DesktopNavigation;
