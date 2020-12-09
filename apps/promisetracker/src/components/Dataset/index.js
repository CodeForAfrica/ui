import React from "react";
import PropTypes from "prop-types";

import { Avatar, Grid, Tooltip } from "@material-ui/core";
import { BarChart } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { A, RichTypography } from "@commons-ui/core";
import { formatDate } from "@/promisetracker/utils";

import config from "@/promisetracker/config";

const useStyles = makeStyles(({ breakpoints, palette, spacing }) => ({
  root: {
    padding: "3rem 2.5rem 3rem 2.5rem",
    margin: "4rem 0",
    background: "#F7F7F7 0% 0% no-repeat padding-box",
  },
  avatar: {
    backgroundColor: palette.primary.main,
    borderRadius: 2,
    color: palette.text.main,
    display: "inline-flex",
    fontWeight: 700,
    height: spacing(3),
    marginLeft: "0.5rem",
    width: spacing(3),
    "&:first-of-type": {
      marginLeft: "unset",
    },
  },
  format: {
    backgroundColor: palette.primary.main,
    borderRadius: 2,
    color: "#fff",
    padding: "0 1rem",
    marginRight: "0.25rem",
  },
  formats: {
    marginTop: "1rem",
    [breakpoints.up("md")]: {
      marginTop: "unset",
    },
  },
  toggleLines: {
    textTransform: "unset",
  },
  notes: {
    margin: "1rem 0",
    // ckan seem to use line-breaks & we're only concerned w/ displaying
    // these line breaks
    // see: https://stackoverflow.com/a/32351302
    whiteSpace: "pre-line",
  },
  link: {
    bottom: 16,
    position: "absolute",
    left: 16,
    "& img": {
      height: "auto",
      width: "1.5rem",
      [breakpoints.up("xl")]: {
        width: "2rem",
      },
    },
  },
  subnational: {
    borderLeft: "1px solid #D6D6D6",
    paddingLeft: "0.25rem",
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
}));

function Dataset({ dataset, ...props }) {
  const classes = useStyles(props);
  const {
    has_quickcharts: hasQuickCharts,
    metadata_modified: lastModified,
    name,
    notes,
    organization,
    resources,
    subnational,
    tags,
    title,
    total_res_downloads: totalDownloads,
  } = dataset;
  const downloads = Math.ceil((totalDownloads || 0) / 100.0) * 100;
  const formats = {};
  if (resources && resources.length) {
    resources.forEach((resource) => {
      formats[resource.format.toUpperCase()] = true;
    });
  }
  const hasHxlTags =
    tags && tags.find((tag) => tag.name.toLowerCase() === "hxl");
  return (
    <Grid container direction="column" className={classes.root}>
      <A
        href={`${config.CKAN_BACKEND_URL}/dataset/${name}`}
        underline="none"
        variant="body2"
        className={classes.title}
      >
        {title}
      </A>
      {organization && (
        <RichTypography variant="body2">{organization.title}</RichTypography>
      )}
      {notes && (
        <RichTypography variant="caption" className={classes.notes}>
          {notes}
        </RichTypography>
      )}
      <Grid item xs={12} container alignItems="center">
        {hasHxlTags && (
          <Tooltip title="Dataset has HXL tags" placement="top">
            <Avatar variant="square" className={classes.avatar}>
              H
            </Avatar>
          </Tooltip>
        )}
        {hasQuickCharts && (
          <Tooltip title="Dataset contains quick chart" placement="top">
            <Avatar variant="square" className={classes.avatar}>
              <BarChart size="small" />
            </Avatar>
          </Tooltip>
        )}
        <RichTypography variant="caption">
          {downloads > 0 ? `${downloads}+` : downloads} Downloads
        </RichTypography>
      </Grid>
      {lastModified && (
        <Grid item xs={12}>
          <RichTypography variant="overline">
            Updated: {formatDate(lastModified)}
          </RichTypography>
        </Grid>
      )}
      <Grid
        item
        xs={12}
        container
        alignItems="baseline"
        className={classes.formats}
      >
        {Object.keys(formats).map((format) => (
          <RichTypography variant="caption" className={classes.format}>
            {format}
          </RichTypography>
        ))}
        {subnational === "1" && (
          <Tooltip title="Sub-National Data" placement="top">
            <RichTypography variant="caption" className={classes.subnational}>
              SN
            </RichTypography>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
}

Dataset.propTypes = {
  dataset: PropTypes.shape({
    data_update_frequency: PropTypes.string.isRequired,
    dataset_date: PropTypes.string,
    has_quickcharts: PropTypes.bool,
    last_modified: PropTypes.string,
    metadata_modified: PropTypes.string,
    name: PropTypes.string,
    notes: PropTypes.string,
    organization: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    overdue_date: PropTypes.string.isRequired,
    resources: PropTypes.arrayOf(PropTypes.shape({})),
    subnational: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    total_res_downloads: PropTypes.number,
  }),
};

Dataset.defaultProps = {
  dataset: undefined,
};
export default Dataset;
