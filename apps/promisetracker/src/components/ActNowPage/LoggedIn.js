import { Box, Button } from "@material-ui/core";
import clsx from "clsx";
import { signOut } from "next-auth/client";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import actNowLogo from "@/promisetracker/assets/Component 121 – 1@2x.png";
import ContentPage from "@/promisetracker/components/ContentPage";

function ActNowLoggedInPage({ footer, title, navigation, ...props }) {
  const classes = useStyles(props);

  const aside = (
    <Box display="flex" justifyContent="flex-end">
      <Button
        variant="outlined"
        onClick={() => signOut()}
        className={clsx(classes.accountButton, classes.accountLogout)}
      >
        Logout
      </Button>

      <Button
        variant="outlined"
        className={clsx(classes.accountButton, classes.accountEdit)}
      >
        Edit
      </Button>
    </Box>
  );
  return (
    <ContentPage
      {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      content={
        <figure className={classes.logoFigureLoggedIn}>
          <Image
            src={actNowLogo}
            layout="fill"
            alt="actNOW"
            className={classes.image}
          />
        </figure>
      }
      contentProps={{ xs: 5, lg: 4 }}
      showTitle={false}
      aside={aside}
      asideProps={{ xs: 7, lg: 4 }}
      classes={{
        section: classes.section,
        sectionTitle: classes.sectionTitle,
        footer: classes.footer,
        grid: classes.grid,
        gridAside: classes.gridAside,
        gridContent: classes.gridContent,
      }}
    />
  );
}

ActNowLoggedInPage.propTypes = {
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  title: PropTypes.string,
};

ActNowLoggedInPage.defaultProps = {
  footer: undefined,
  navigation: undefined,
  title: undefined,
};

export default ActNowLoggedInPage;
