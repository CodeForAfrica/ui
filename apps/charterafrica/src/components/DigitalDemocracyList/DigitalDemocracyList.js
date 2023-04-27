import { Section } from "@commons-ui/core";
import { Box, Grid } from "@mui/material";
// import PropTypes from "prop-types";
import { useRouter } from "next/router";
import React, { useState } from "react";

import DigitalDemocracyFilter from "./DigitalDemocracyFilter";

import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";

const DigitalDemocracyList = React.forwardRef(function Tools(props, ref) {
  const {
    sx,
    results,
    searchPlaceholder,
    pagination: { page, totalPages },
    sortOrder,
    Component,
  } = props;
  const router = useRouter();
  const [values, setValues] = useState({
    search: "",
    sort: "",
    ...router.query,
  });

  const onFilterChange = (value) => {
    const newValues = { ...values, ...value };
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
        minHeight: 76,
        scrollMarginTop: { xs: "56px", sm: "64", md: "114px" },
        ...sx,
      }}
      ref={ref}
    >
      <DigitalDemocracyFilter
        onChange={onFilterChange}
        searchPlaceholder={searchPlaceholder}
        values={values}
        sortOrder={sortOrder}
        onQuerySearch={onQuerySearch}
      />
      <Section>
        <Grid container columnSpacing={2.5} rowSpacing={5}>
          {results.map((item) => {
            return (
              <Grid item xs={12} sm={4} md={3} lg={3}>
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

export default DigitalDemocracyList;
