import { Link, Figure } from "@commons-ui/next";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const PartnerGrid = React.forwardRef(function PartnerGrid(props, ref) {
  const {
    GridItemProps,
    FigureProps,
    partners,
    createdAt,
    updatedAt,
    ...other
  } = props;

  return (
    <Grid
      container
      alignItems={{ sm: "center" }}
      justifyContent={{ sm: "center" }}
      rowSpacing={2.5}
      sx={{
        pt: { xs: 2.5, md: 7.5 },
        ...other?.sx,
      }}
      ref={ref}
    >
      {partners.map((partner) => (
        <Grid
          key={partner.id}
          item
          xs={6}
          sm={4}
          container
          justifyContent="center"
          alignItems="center"
          {...GridItemProps}
        >
          <Link
            color="inherit"
            href={partner.link?.href}
            underline="always"
            variant="p1"
          >
            <Figure
              {...FigureProps}
              sx={(theme) => ({
                height: { xs: "66.22px", md: "136px" },
                width: {
                  xs: "calc((100vw - 80px)/2)",
                  sm: `calc(${theme.contentWidths.values.sm}px / 3)`,
                  md: `calc(${theme.contentWidths.values.md}px / 3)`,
                  lg: `calc(${theme.contentWidths.values.lg}px / 3)`,
                  xl: `calc(${theme.contentWidths.values.xl}px / 3)`,
                  ...FigureProps?.sx,
                },
              })}
              ImageProps={{
                alt: partner.name,
                src: partner.logo.url,
                sx: {
                  objectPosition: "center",
                  mixBlendMode: "luminosity",
                  "&:hover": {
                    mixBlendMode: "unset",
                  },
                },
              }}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
});

PartnerGrid.propTypes = {
  FigureProps: PropTypes.shape({}),
  GridItemProps: PropTypes.shape({}),
  partners: PropTypes.arrayOf(PropTypes.shape({})),
};

PartnerGrid.defaultProps = {
  FigureProps: undefined,
  GridItemProps: undefined,
  partners: undefined,
};

export default PartnerGrid;
