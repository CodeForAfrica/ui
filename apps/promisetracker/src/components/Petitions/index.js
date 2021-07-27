import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import PetitionCard from "@/promisetracker/components/PetitionCard";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    marginBottom: typography.pxToRem(40),
  },
  petitionCard: {
    marginBottom: typography.pxToRem(20),
  },
}));

function Index({ items, ...props }) {
  const classes = useStyles(props);

  if (!items?.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      {items.map((petition) => (
        <PetitionCard
          key={petition.id}
          {...petition}
          classes={{ root: classes.petitionCard }}
        />
      ))}
    </div>
  );
}

Index.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

Index.defaultProps = {
  items: undefined,
};

export default Index;
