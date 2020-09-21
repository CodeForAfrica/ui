import React from "react";

import clsx from "clsx";

import { useRouter } from "next/router";

import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Section } from "@commons-ui/core";

import Logo from "@/promisetracker/components/Navigation/Logo";
import Search from "@/promisetracker/components/Search";
import config from "@/promisetracker/config";

import MenuButton from "./MenuButton";
import NavigationButton from "./NavigationButton";
import PageNavigation from "./PageNavigation";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    padding: `${typography.pxToRem(54)} 0`,
  },
  section: {},
  button: {
    border: "none",
    height: 48,
    "&:hover": {
      border: "none",
    },
    width: "auto",
  },
  buttonLanguage: {
    color: "#909090",
    fontFamily: typography.fontFamily,
    fontWeight: 400,
    "&.active": {
      color: "#EBEBEB",
    },
    "&:hover": {
      background: "inherit",
    },
    padding: 0,
    marginLeft: "0.75rem",
    minWidth: 0,
    width: "auto",
  },
  buttonLanguageLast: {
    marginRight: "-5.5rem",
  },
  pageNavigation: {
    marginTop: `-${typography.pxToRem(20)}`,
  },
}));

function DesktopNavigation(props) {
  const classes = useStyles(props);
  const { analysisMenu } = config;
  const router = useRouter();
  const { asPath } = router;
  const currentPageUrl = asPath.split("/").slice(0, 2).join("/");
  const pageNavigation = analysisMenu.url === currentPageUrl && analysisMenu;

  return (
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        <Section classes={{ root: classes.section }}>
          <Grid container justify="flex-start" alignItems="center">
            <Grid item lg={3}>
              <Logo />
            </Grid>

            <Grid item lg={5} container justify="flex-end" alignItems="center">
              <Grid item>
                <MenuButton
                  active={currentPageUrl === "/promises"}
                  href="/promises"
                  size="large"
                  title="Promises"
                  variant="outlined"
                  classes={{ root: classes.button }}
                />
              </Grid>

              <Grid item>
                <NavigationButton
                  title={analysisMenu.title}
                  size="large"
                  active={analysisMenu.url === currentPageUrl}
                  classes={{ root: classes.button }}
                >
                  <PageNavigation
                    asPath={analysisMenu.url}
                    navigation={analysisMenu.subnav}
                    classes={{ section: classes.section }}
                  />
                </NavigationButton>
              </Grid>

              <Grid item>
                <MenuButton
                  active={currentPageUrl === "/act-now"}
                  href="/act-now"
                  size="large"
                  title="Act Now"
                  variant="outlined"
                  classes={{ root: classes.button }}
                />
              </Grid>
            </Grid>

            <Grid item lg={3}>
              <Search />
            </Grid>

            <Grid item lg={1} direction="column" container justify="flex-start">
              <Grid item>
                <Button
                  variant="overline"
                  className={clsx(classes.buttonLanguage, "active")}
                >
                  En
                </Button>
                <Button variant="overline" className={classes.buttonLanguage}>
                  Am
                </Button>
              </Grid>

              <Grid item>
                <Button variant="overline" className={classes.buttonLanguage}>
                  Fr
                </Button>
                <Button
                  variant="overline"
                  className={clsx(
                    classes.buttonLanguage,
                    classes.buttonLanguageLast
                  )}
                >
                  عربى
                </Button>
              </Grid>
            </Grid>
            <Grid />
          </Grid>
        </Section>
      </Grid>
      {pageNavigation && pageNavigation.subnav && (
        <Grid item xs={12}>
          <PageNavigation
            asPath={asPath}
            navigation={pageNavigation.subnav}
            classes={{ root: classes.pageNavigation, section: classes.section }}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default DesktopNavigation;
