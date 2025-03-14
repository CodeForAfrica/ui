import { Link } from "@commons-ui/next";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Share from "@/promisetracker/components/Share";
import { replaceAll } from "@/promisetracker/utils";
import site from "@/promisetracker/utils/site";

function DataSource({ classes: classesProp, documents, label, promise }) {
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
        <Share title={promise.title} link={site.url + (promise.href || "")} />
      </div>
      <div className={classes.documentContainer}>
        {documents.map((document) => (
          <Link
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
          </Link>
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
  promise: PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string,
  }),
};

export default DataSource;
