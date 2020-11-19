import React from "react";
import PropTypes from "prop-types";
import { IconButton, Typography } from "@material-ui/core";
import { A } from "@commons-ui/core";

import { replaceAll } from "@/promisetracker/utils";
import ShareIcon from "@/promisetracker/icons/Share";
import useStyles from "./useStyles";

function DataSource({ classes: classesProp, documents, label }) {
  const classes = useStyles({ classes: classesProp });

  if (!documents?.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      <div className={classes.titleShareContainer}>
        <Typography className={classes.title} variant="h4">
          {label}
        </Typography>
        <IconButton aria-label="share" className={classes.share}>
          <ShareIcon color="primary" fontSize="inherit" />
        </IconButton>
      </div>
      <div className={classes.documentContainer}>
        {documents.map((document) => (
          <A
            key={document.dataSourceUrl}
            href={document.dataSourceUrl}
            className={classes.document}
          >
            <img
              className={classes.image}
              alt=""
              src={replaceAll(document.resources.page.image, {
                "{page}": `${document.pageNumber || 1}`,
                "{size}": "large",
              })}
            />
            <Typography variant="body2" className={classes.name}>
              {document.title}
            </Typography>
          </A>
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
    titleShareContainer: PropTypes.string,
    share: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
  }),
  documents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  label: PropTypes.string,
};

DataSource.defaultProps = {
  classes: undefined,
  label: undefined,
};

export default DataSource;
