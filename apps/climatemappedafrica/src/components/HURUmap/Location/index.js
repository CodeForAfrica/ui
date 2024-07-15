import { LocationTag } from "@hurumap/core";
import { Box } from "@mui/material";
import clsx from "clsx";
import PropTypes from "prop-types";

import useStyles from "./useStyles";

import LocationHighlight from "@/climatemappedafrica/components/HURUmap/LocationHighlight";

function Location({ className, highlights, isLoading, tags, ...props }) {
  const classes = useStyles(props);

  if (!tags?.length) {
    return null;
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      className={clsx(classes.root, className)}
    >
      <Box
        display="flex"
        flexWrap="nowrap"
        justifyContent="center"
        className={classes.tags}
      >
        {tags.map((tag, index) => (
          <LocationTag
            {...tag}
            active={index === tags.length - 1}
            key={`${tag.level}-${tag.name}`}
            isLoading={isLoading}
            variant="highlight"
            sx={(theme) => ({
              "&:not(:first-of-type)": {
                marginLeft: theme.typography.pxToRem(10),
              },
            })}
          />
        ))}
      </Box>
      {highlights?.length > 0 ? (
        <Box
          display="flex"
          flexWrap="nowrap"
          justifyContent="center"
          className={classes.highlights}
        >
          {highlights.map((highlight) => (
            <LocationHighlight
              key={highlight.title}
              isLoading={isLoading}
              {...highlight}
              classes={{
                root: classes.highlight,
                title: classes.highlightTitle,
                value: classes.highlightValue,
              }}
            />
          ))}
        </Box>
      ) : null}
    </Box>
  );
}

Location.propTypes = {
  className: PropTypes.string,
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      number: PropTypes.number,
    }),
  ),
  isLoading: PropTypes.bool,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      level: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
};

Location.defaultProps = {
  className: undefined,
  highlights: undefined,
  isLoading: undefined,
  tags: undefined,
};

export default Location;
