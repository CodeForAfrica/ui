import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";
import CtAButton from "@/promisetracker/components/CtAButton";
import BaseContent from "./BaseContent";

import useStyles from "./useStyles";

const ConnectCard = ({ closeCard }) => {
  const classes = useStyles();

  return (
    <BaseContent
      close
      onCloseCard={closeCard}
      title="Connect!"
      description="Connect with others who care about this promise"
    >
      <Grid>
        <CtAButton
          color="secondary"
          classes={{
            root: classes.cardButtonRoot,
            button: `${classes.connectButton} ${classes.cardButton} `,
          }}
        >
          CTA TBC
        </CtAButton>
      </Grid>
    </BaseContent>
  );
};

ConnectCard.propTypes = {
  closeCard: PropTypes.func.isRequired,
};

export default ConnectCard;
