import { Section } from "@commons-ui/core";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";

import MenuButton from "./MenuButton";
import NavigationButton from "./NavigationButton";
import PageNavigation from "./PageNavigation";

import Button from "@/promisetracker/components/Link/Button";
import Logo from "@/promisetracker/components/Navigation/Logo";
import Search from "@/promisetracker/components/Search";
import i18n from "@/promisetracker/lib/i18n";

const useStyles = makeStyles(({ typography }) => ({
  root: {},
  section: {},
  mainNavigation: {
    padding: `${typography.pxToRem(54)} 0`,
  },
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
    marginLeft: "0.75rem",
    minWidth: 0,
    padding: 0,
    textTransform: "capitalize",
    width: "auto",
    "&.active": {
      color: "#EBEBEB",
    },
    "&:hover": {
      background: "inherit",
    },
  },
  buttonLanguageLast: {
    marginRight: "-5.5rem",
  },
  pageNavigation: {
    marginTop: `-${typography.pxToRem(20)}`,
  },
  searchContainer: {
    paddingLeft: "1rem",
  },
}));

function DesktopNavigation({ navigation, ...props }) {
  const classes = useStyles(props);
  const {
    promises: promisesMenu,
    analysis: { navigation: analysisMenuNavigation, ...analysisMenu },
    actNow: actNowMenu,
  } = navigation;
  const router = useRouter();
  const { asPath, locale: activeLocale } = router;
  const currentPageUrl = asPath.split("/").slice(0, 2).join("/");
  const pageNavigation =
    analysisMenu.url === currentPageUrl && analysisMenuNavigation;
  const _ = i18n();
  const { locales } = _;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.mainNavigation}>
            <Section classes={{ root: classes.section }}>
              <Grid container justify="flex-start" alignItems="center">
                <Grid item lg={4}>
                  <Logo />
                </Grid>
                <Grid
                  item
                  lg={4}
                  container
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid item>
                    <MenuButton
                      size="large"
                      variant="outlined"
                      {...promisesMenu}
                      active={currentPageUrl === promisesMenu.href}
                      classes={{ root: classes.button }}
                    />
                  </Grid>

                  <Grid item>
                    <NavigationButton
                      size="large"
                      {...analysisMenu}
                      active={currentPageUrl === analysisMenu.href}
                      classes={{ root: classes.button }}
                    >
                      <PageNavigation
                        asPath={analysisMenu.href}
                        navigation={analysisMenuNavigation}
                        classes={{ section: classes.section }}
                      />
                    </NavigationButton>
                  </Grid>
                  {actNowMenu?.href ? (
                    <Grid item>
                      <MenuButton
                        size="large"
                        variant="outlined"
                        {...actNowMenu}
                        active={currentPageUrl === actNowMenu.href}
                        classes={{ root: classes.button }}
                      />
                    </Grid>
                  ) : null}
                </Grid>

                <Grid className={classes.searchContainer} item lg={3}>
                  <Search />
                </Grid>

                <Grid
                  item
                  lg={1}
                  direction="column"
                  container
                  justify="flex-start"
                >
                  <Grid item container justify="flex-end">
                    {locales.slice(0, 2).map((locale) => (
                      <Button
                        key={locale}
                        href={asPath}
                        locale={locale}
                        variant="text"
                        className={clsx(classes.buttonLanguage, {
                          active: locale === activeLocale,
                        })}
                      >
                        {_.language(locale)}
                      </Button>
                    ))}
                  </Grid>

                  <Grid item container justify="flex-end">
                    {locales.slice(2, 4).map((locale, i) => (
                      <Button
                        key={locale}
                        href={asPath}
                        locale={locale}
                        variant="text"
                        className={clsx(classes.buttonLanguage, {
                          active: locale === activeLocale,
                          [classes.buttonLanguageLast]: i === 3,
                        })}
                      >
                        {_.language(locale)}
                      </Button>
                    ))}
                  </Grid>
                </Grid>
                <Grid />
              </Grid>
            </Section>
          </div>
        </Grid>
        {pageNavigation ? (
          <Grid item xs={12}>
            <PageNavigation
              asPath={asPath}
              navigation={analysisMenuNavigation}
              classes={{
                root: classes.pageNavigation,
                section: classes.section,
              }}
            />
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
}

DesktopNavigation.propTypes = {
  navigation: PropTypes.shape({
    promises: PropTypes.shape({}),
    analysis: PropTypes.shape({
      navigation: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    actNow: PropTypes.shape({}),
  }),
};

DesktopNavigation.defaultProps = {
  navigation: undefined,
};

export default DesktopNavigation;
