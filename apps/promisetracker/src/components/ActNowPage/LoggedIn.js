import { Box, Button } from "@material-ui/core";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import actNowLogo from "@/promisetracker/assets/actNowLogo2x.png";
import ContentPage from "@/promisetracker/components/ContentPage";
import Section from "@/promisetracker/components/ContentPage/Section";
import Petitions from "@/promisetracker/components/Petitions";
import Tabs from "@/promisetracker/components/Tabs";

function ActNowLoggedInPage({
  footer,
  title,
  navigation,
  signedPetitions,
  ownedPetitions,
  ...props
}) {
  const classes = useStyles(props);
  const formatedItems = [
    { title: "Signed", petitions: signedPetitions },
    { title: "Started", petitions: ownedPetitions },
  ].map((item) => {
    return {
      label: `${item.title} (${item.petitions.length})`,
      href: `#${item.title}`,
      children: <Petitions items={item.petitions} />,
    };
  });

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
    >
      <Section
        classes={{
          section: classes.section,
          sectionTitle: classes.sectionTitle,
        }}
        title="My Petitions"
        content={
          <Tabs
            name="signed-started-actnow"
            items={formatedItems}
            classes={{
              root: classes.tabs,
              tab: classes.tab,
            }}
          />
        }
      />
    </ContentPage>
  );
}

ActNowLoggedInPage.propTypes = {
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  signedPetitions: PropTypes.arrayOf(PropTypes.shape({})),
  ownedPetitions: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

ActNowLoggedInPage.defaultProps = {
  footer: undefined,
  navigation: undefined,
  ownedPetitions: undefined,
  signedPetitions: undefined,
  title: undefined,
};

export default ActNowLoggedInPage;
