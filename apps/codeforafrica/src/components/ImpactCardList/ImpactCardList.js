import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import ImpactCard from "@/codeforafrica/components/ImpactCard";

const ImpactCardList = React.forwardRef(function ImpactCardList(props, ref) {
  const { list, sx } = props;

  if (!list?.length) {
    return null;
  }
  return (
    <Grid
      container
      rowSpacing={10}
      justifyContent="space-between"
      sx={sx}
      ref={ref}
    >
      {list.map((impact) => (
        <Grid item key={impact.title}>
          <ImpactCard {...impact} />
        </Grid>
      ))}
    </Grid>
  );
});

ImpactCardList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ),
};

ImpactCardList.defaultProps = {
  list: undefined,
};

export default ImpactCardList;
