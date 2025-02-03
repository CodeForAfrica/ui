import makeStyles from "@mui/styles/makeStyles";
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
          {...petition}
          key={petition.id}
          classes={{ root: classes.petitionCard }}
        />
      ))}
    </div>
  );
}

Index.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Index;
