import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { A } from "@commons-ui/core";

import { replaceAll } from "@/promisetracker/utils";
import Share from "@/promisetracker/components/Share";
import server from "@/promisetracker/lib/server";
import useStyles from "./useStyles";

function DataSource({ classes: classesProp, documents, label, promise }) {
  const classes = useStyles({ classes: classesProp });
  const siteServer = server();

  if (!documents?.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      <div className={classes.titleShareContainer}>
        <Typography className={classes.title} variant="h4">
          {label}
        </Typography>
        <Share
          title={promise.title}
          link={siteServer.url + (promise.href || "")}
        />
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
  promise: PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string,
  }),
};

DataSource.defaultProps = {
  classes: undefined,
  label: undefined,
  promise: undefined,
};

export default DataSource;
