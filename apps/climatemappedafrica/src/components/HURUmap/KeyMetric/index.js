import { Source } from "@hurumap/next";
import { Tooltip, Typography, LinearProgress, Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function KeyMetric({
  formattedValue: formattedValueProp,
  value: valueProp,
  title,
  color,
  description,
  displayFormat,
  parentName,
  parentFormattedValue,
  metadata: { source, url } = {},
  sx,
}) {
  if (!((valueProp || formattedValueProp) && title)) {
    return null;
  }
  const formattedValue = formattedValueProp ?? valueProp;
  const parentValue =
    description || parentFormattedValue
      ? `${parentFormattedValue} ${parentName}`
      : undefined;
  const value = valueProp ?? formattedValueProp;
  const tooltipTitle = `${title}: ${formattedValue}`;

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      sx={({ typography }) => ({
        width: "100%",
        marginBottom: typography.pxToRem(20),
        ...sx,
      })}
    >
      <Box
        sx={({ palette, typography }) => ({
          backgroundColor: palette.background.paper,
          padding: `${typography.pxToRem(10)} ${typography.pxToRem(
            20,
          )} ${typography.pxToRem(14)} ${typography.pxToRem(20)}`,
        })}
      >
        <Typography variant="h3">{formattedValue}</Typography>
        <Tooltip title={tooltipTitle}>
          <Typography
            variant="caption"
            sx={({ typography }) => ({
              fontSize: typography.pxToRem(11),
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              marginBottom: typography.pxToRem(8),
            })}
          >
            {title}
          </Typography>
        </Tooltip>
        {displayFormat?.localeCompare("percentage", undefined, {
          sensitivity: "accent",
        }) === 0 ? (
          <LinearProgress
            sx={({ palette }) => ({
              "&.MuiLinearProgress-determinate": {
                backgroundColor: palette.grey.main,
              },
            })}
            value={parseFloat(`${value}`.replace(",", ""))}
            color={color}
            variant="determinate"
          />
        ) : null}
      </Box>
      {parentValue && (
        <Typography
          variant="caption"
          sx={({ typography }) => ({
            fontSize: typography.pxToRem(11),
            padding: `${typography.pxToRem(6)} 0 0 ${typography.pxToRem(20)}`,
            color: "#666666",
          })}
        >
          {parentValue}
        </Typography>
      )}
      <Source
        href={url}
        sx={(theme) => ({
          marginTop: theme.typography.pxToRem(10),
        })}
      >
        {source}
      </Source>
    </Grid>
  );
}

KeyMetric.propTypes = {
  color: PropTypes.string,
  description: PropTypes.string,
  displayFormat: PropTypes.string,
  formattedValue: PropTypes.string,
  metadata: PropTypes.shape({
    source: PropTypes.string,
    url: PropTypes.string,
  }),
  title: PropTypes.string,
  value: PropTypes.number,
  parentName: PropTypes.string,
  parentFormattedValue: PropTypes.string,
};

export default KeyMetric;
