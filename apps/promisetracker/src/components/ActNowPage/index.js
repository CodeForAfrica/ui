import { RichTypography } from "@commons-ui/core";
import { Button, Grid } from "@material-ui/core";
import clsx from "clsx";
import { signIn } from "next-auth/client";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import actNowLogo from "@/promisetracker/assets/Component 121 – 1@2x.png";
import actNowImg from "@/promisetracker/assets/illo-aboutTheProject@2x.png";
import ContentPage from "@/promisetracker/components/ContentPage";
import ContentSection from "@/promisetracker/components/ContentPage/Section";

function ActNow({ footer, title, navigation, description, ...props }) {
  const classes = useStyles(props);

  const aside = (
    <>
      <figure className={classes.figure}>
        <Image
          src={actNowImg}
          layout="fill"
          alt="actNOW"
          className={classes.image}
        />
      </figure>
    </>
  );
  return (
    <ContentPage
      {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      content={
        <>
          <figure className={classes.logoFigure}>
            <Image
              src={actNowLogo}
              layout="fill"
              alt="actNOW"
              className={classes.image}
            />
          </figure>
          {description?.length && (
            <RichTypography variant="body2" className={classes.description}>
              {description}
            </RichTypography>
          )}
        </>
      }
      contentProps={{ lg: 7 }}
      showTitle={false}
      aside={aside}
      asideProps={{ lg: 3 }}
      classes={{
        section: classes.section,
        sectionTitle: classes.sectionTitle,
        footer: classes.footer,
        grid: classes.grid,
        gridAside: classes.gridAside,
        gridContent: classes.gridContent,
      }}
    >
      <div className={classes.contentSection}>
        <ContentSection
          contentProps={{ lg: 9, title: null }}
          aside={
            <Grid container classes={{ root: classes.imageContainer }}>
              <Grid item xs={12}>
                <RichTypography variant="h4">NEW USER</RichTypography>
              </Grid>
              <Grid item xs={12}>
                <RichTypography variant="body2">
                  Create an account here
                </RichTypography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={() => signIn("google")}
                  className={clsx(classes.authButton, classes.authGoogle)}
                >
                  Continue with Google
                </Button>
              </Grid>
            </Grid>
          }
          asideProps={{ lg: 3 }}
          classes={{
            section: classes.section,
            grid: clsx(classes.grid, classes.contentSectionGrid),
            gridAside: classes.gridAside,
            gridContent: classes.gridContent,
          }}
        />
      </div>
    </ContentPage>
  );
}

ActNow.propTypes = {
  actNow: PropTypes.shape({}),
  description: PropTypes.string,
  title: PropTypes.string,
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
};

ActNow.defaultProps = {
  actNow: null,
  description: null,
  footer: null,
  navigation: null,
  title: null,
};

export default ActNow;
