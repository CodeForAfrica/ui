import { Section, RichTypography } from "@commons-ui/core";
import { Box, Grid, LinearProgress } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

import DigitalDemocracyFilter from "./DigitalDemocracyFilter";
import useRouterLoading from "./routerLoading";

import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";

const DigitalDemocracyList = React.forwardRef(function Tools(props, ref) {
  const {
    sx,
    results,
    searchPlaceholder,
    pagination: { page, totalPages },
    sortOrder,
    Component,
    title,
  } = props;
  const { router, loading } = useRouterLoading();
  const [values, setValues] = useState({
    search: "",
    sort: "name",
    ...router.query,
  });

  const onFilterChange = (value) => {
    const newValues = { ...values, ...value, page: 1 };
    setValues(newValues);
    if (!value.search) {
      router.push({
        query: newValues,
      });
    }
  };

  const onQuerySearch = () => {
    router.push({
      query: values,
    });
  };

  const onPageChange = (p) => {
    onFilterChange({ page: p });
  };

  if (!results.length && !values.search) {
    return null;
  }
  return (
    <Box
      sx={{
        backgroundColor: "common.white",
        py: 2.5,
        scrollMarginTop: { xs: "56px", sm: "64", md: "114px" },
        ...sx,
      }}
      ref={ref}
    >
      <Section>
        <DigitalDemocracyFilter
          onChange={onFilterChange}
          searchPlaceholder={searchPlaceholder}
          values={values}
          sortOrder={sortOrder}
          onQuerySearch={onQuerySearch}
        />
      </Section>
      <Section sx={{ pb: 5 }}>
        <RichTypography
          textAlign={{ xs: "center", sm: "left" }}
          color="neutral.dark"
          variant="h2SemiBold"
        >
          {title}
        </RichTypography>
        {loading ? <LinearProgress color="secondary" /> : null}
        <Grid sx={{ mt: 5 }} container columnSpacing={2.5} rowSpacing={5}>
          {results.map((item) => {
            return (
              <Grid key={item.id} item xs={12} sm={4} md={3} lg={3}>
                <Component key={item.id} {...item} />
              </Grid>
            );
          })}
        </Grid>
        <NextPrevPagination
          count={totalPages}
          onChange={(_, p) => onPageChange(p)}
          page={page}
          sx={{
            backgroundColor: "common.white",
            mt: 5,
            pb: 8,
          }}
        />
      </Section>
    </Box>
  );
});

DigitalDemocracyList.propTypes = {
  sx: PropTypes.shape({}),
  results: PropTypes.arrayOf(PropTypes.shape({})),
  searchPlaceholder: PropTypes.string,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  sortOrder: PropTypes.arrayOf(PropTypes.shape({})),
  Component: PropTypes.elementType,
  title: PropTypes.string,
};

DigitalDemocracyList.defaultProps = {
  Component: undefined,
  pagination: undefined,
  results: undefined,
  searchPlaceholder: undefined,
  sortOrder: undefined,
  sx: undefined,
  title: undefined,
};
export default DigitalDemocracyList;
