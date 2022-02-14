import { Box, Button } from "@material-ui/core";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/client";
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
  petitions,
  ...props
}) {
  const classes = useStyles(props);
  const session = useSession();
  const started = petitions?.filter(
    (petition) => petition.owner.id === session.user.id
  );
  const signed = petitions?.filter((petition) =>
    petition.signatures.find(({ id }) => id === session.user.id)
  );
  const formatedItems = [
    { title: "Signed", petitions: signed },
    { title: "Started", petitions: started },
  ].map((item) => {
    return {
      label: item.title,
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
        content={
          <Tabs
            name="signed-started-actnow"
            items={formatedItems}
            classes={{}}
          />
        }
      />
    </ContentPage>
  );
}

ActNowLoggedInPage.propTypes = {
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  petitions: PropTypes.shape(PropTypes.shape({})),
  title: PropTypes.string,
};

ActNowLoggedInPage.defaultProps = {
  footer: undefined,
  navigation: undefined,
  petitions: undefined,
  title: undefined,
};

export default ActNowLoggedInPage;
