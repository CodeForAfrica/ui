import LogoButton from "@commons-ui/core/LogoButton";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Image from "@/climatemappedafrica/components/Image";
import Link from "@/climatemappedafrica/components/Link";
import Menu from "@/climatemappedafrica/components/Menu";
import Section from "@/climatemappedafrica/components/Section";

function DesktopNavigation({ logo, menus, socialLinks }) {
  return (
    <div>
      <Section>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <LogoButton href="/" component={Link} sx={{ paddingLeft: 0 }}>
              <Image {...logo} width={200} height={80} />
            </LogoButton>
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
