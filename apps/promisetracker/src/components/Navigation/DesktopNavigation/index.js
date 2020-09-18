import React from "react";

import { Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import clsx from "clsx";

import { Section } from "@commons-ui/core";
import Logo from "@/promisetracker/components/Navigation/Logo";
import Search from "@/promisetracker/components/Search";
import MenuButton from "@/promisetracker/components/Navigation/DesktopNavigation/MenuButton";
import PageNavigation from "@/promisetracker/components/Navigation/DesktopNavigation/PageNavigation";
import NavigationButton from "@/promisetracker/components/Navigation/DesktopNavigation/NavigationButton";

import config from "@/promisetracker/config";

const useStyles = makeStyles(({ widths }) => ({
  root: {
    width: widths.values.lg,
    padding: "1.5rem 0rem",
  },
  button: {
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: "0.5rem",
    "&:hover": {
      backgroundColor: "white",
    },
    width: "auto",
  },
  buttonLanguage: {
    color: "#9D9C9C",
    "&.active": {
      color: "#D6D6D6",
    },
    marginLeft: "0.75rem",
    width: "auto",
  },
  buttonLanguageLast: {
    marginRight: "-5.5rem",
  },
}));

function DesktopNavigation(props) {
  const classes = useStyles(props);
  const { analysisMenu } = config;

  const activeClassName = clsx(classes.buttonLanguage, "active");
  const className = clsx(classes.buttonLanguage, classes.buttonLanguageLast);

  return (
    <Grid container>
      <Grid container item xs={12} justify="center">
        <Section classes={{ root: classes.root }}>
          <Grid container justify="flex-start" alignItems="center">
            <Grid item md={3}>
              <Logo />
            </Grid>

            <Grid item md={5} container direction="row" justify="center">
              <Grid item>
                <MenuButton
                  href="/promises"
                  color="secondary"
                  size="large"
                  title="Promises"
                  variant="outlined"
                  className={classes.button}
                />
              </Grid>

              <Grid item>
                <NavigationButton
                  color="secondary"
                  title="Analysis"
                  size="large"
                  className={classes.button}
                >
                  <PageNavigation navigation={analysisMenu} />
                </NavigationButton>
              </Grid>

              <Grid item>
                <MenuButton
                  href="/act-now"
                  color="secondary"
                  size="large"
                  title="Act Now"
                  variant="outlined"
                  className={classes.button}
                />
              </Grid>
            </Grid>

            <Grid item md={3}>
              <Search />
            </Grid>

            <Grid item md={1} direction="column" container justify="flex-start">
              <Grid item>
                <Link
                  href="/#"
                  underline="none"
                  variant="overline"
                  className={activeClassName}
                >
                  En
                </Link>
                {/* TODO(kilemens): Hide other languages for MVP */}

                <Link
                  href="/#"
                  underline="none"
                  variant="overline"
                  className={classes.buttonLanguage}
                >
                  Am
                </Link>
              </Grid>

              <Grid item>
                <Link
                  href="/#"
                  underline="none"
                  variant="overline"
                  className={activeClassName}
                >
                  Fr
                </Link>
                {/* TODO(kilemens): Hide other languages for MVP */}

                <Link
                  href="/#"
                  underline="none"
                  variant="overline"
                  className={className}
                >
                  عربى
                </Link>
              </Grid>
            </Grid>
            <Grid />
          </Grid>
        </Section>
      </Grid>
    </Grid>
  );
}

export default DesktopNavigation;
