import React from "react";
import PropTypes from "prop-types";
import { IconButton, Typography } from "@material-ui/core";

import { replaceAll } from "@/promisetracker/utils";
import ShareIcon from "@/promisetracker/icons/Share";
import useStyles from "./useStyles";

function DataSource({ classes: classesProp, documents }) {
  const classes = useStyles({ classes: classesProp });
  return (
    <div className={classes.root}>
      <div className={classes.shareContainer}>
        <IconButton aria-label="share" className={classes.share}>
          <ShareIcon color="primary" fontSize="inherit" />
        </IconButton>
      </div>
      <div className={classes.documentContainer}>
        {documents.map((document) => (
          <div className={classes.document}>
            <img
              className={classes.image}
              alt=""
              src={replaceAll(document.resources.page.image, {
                "{page}": `${document.pageNumber || 1}`,
                "{size}": "large",
              })}
            />
            <Typography variant="body2" className={classes.title}>
              {document.title}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

DataSource.propTypes = {
  classes: PropTypes.shape({
    documentContainer: PropTypes.string,
    document: PropTypes.string,
    root: PropTypes.string,
    shareContainer: PropTypes.string,
    share: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
  documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

DataSource.defaultProps = {
  classes: undefined,
};

export default DataSource;
