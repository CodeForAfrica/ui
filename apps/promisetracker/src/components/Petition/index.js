import { Section, RichTypography } from "@commons-ui/core";
import { Grid, Hidden, Typography, LinearProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Status from "@/promisetracker/components/PromiseStatus";

// replace
const petition = {
  image:
    "http://dashboard.hurumap.org/promisetracker/wp-content/uploads/sites/2/2021/08/adeboro-odunlami-bJgTryACMF0-unsplash.jpg",
  status: {
    name: "Closed",
    description: "",
    title: "Closed",
    color: "#EBEBEB",
  },
};

function Petition({ petitionPost }) {
  const {
    title,
    description,
    signatures,
    number_of_signatures_required: requiredSignatures,
  } = petitionPost;
  const classes = useStyles({ image: petition.image });

  return (
    <Section classes={{ root: classes.section }}>
      <Grid container>
        <Grid item xs={12} lg={8}>
          <RichTypography variant="h1" className={classes.promiseTitle}>
            {title}
          </RichTypography>
          <div className={classes.featuredImageContainer} />
          <Typography>Gertrude Nyenyeshi started this petition</Typography>
          {/* <ActNowCard {...props} /> */}
          <Hidden lgUp implementation="css">
            <div className={classes.mobileStatusContainer}>
              <Grid item className={classes.mobileStatusLabelGrid}>
                <RichTypography variant="h5" className={classes.statusLabel}>
                  Promise rating status:
                </RichTypography>
                <Status
                  {...petition.status}
                  classes={{ root: classes.mobileStatus }}
                />
              </Grid>
            </div>
          </Hidden>
          <RichTypography className={classes.promiseBody} variant="body1">
            {description}
          </RichTypography>
        </Grid>
        <Grid item md={1} implementation="css" smDown component={Hidden} />
        <Hidden mdDown>
          <Grid item xs={12} lg={3}>
            <RichTypography variant="h4" className={classes.statusLabel}>
              Promise rating status:
            </RichTypography>
            <Status {...petition.status} classes={{ root: classes.status }} />
            <RichTypography className={classes.label} variant="h4">
              <span>{signatures.length}</span> have signed, let us get to{" "}
              {requiredSignatures}
            </RichTypography>
            <LinearProgress
              value={signatures.length}
              valueBuffer={requiredSignatures}
              variant="determinate"
              className={classes.progressBar}
            />
          </Grid>
        </Hidden>
      </Grid>
    </Section>
  );
}

Petition.propTypes = {
  petitionPost: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
    signatures: PropTypes.arrayOf(PropTypes.string),
    number_of_signatures_required: PropTypes.number,
  }),
};

Petition.defaultProps = {
  petitionPost: undefined,
};

export default Petition;
