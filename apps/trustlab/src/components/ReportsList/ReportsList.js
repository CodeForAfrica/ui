import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Grid2 as Grid, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { forwardRef, useState, useEffect, useRef } from "react";

import useReports from "./useReports";

// eslint-disable-next-line import/no-unresolved
import ErrorPageIcon from "@/trustlab/assets/error-page-icon.svg?url";
import Pagination from "@/trustlab/components/Pagination";
import ReportCard from "@/trustlab/components/ReportCard";
import ReportFilters from "@/trustlab/components/ReportFilters";

const ReportsList = forwardRef(function ReportsList(props, ref) {
  const {
    reports: initialReports = [],
    condensed,
    cardActionLabel,
    hasPagination,
    hasFilters,
    pagination: p = { page: 1, count: 1 },
    reportsType,
    reportsPerPage,
    notFoundTitleLabel,
    notFoundSubtitleLabel,
    ...other
  } = props;

  const [page, setPage] = useState(p?.page);
  const [params, setParams] = useState({
    reportsType,
    limit: reportsPerPage,
  });
  const listRef = useRef(null);
  const router = useRouter();
  const { query } = router;
  const { page: initialPage } = query;
  useEffect(() => {
    if (initialPage) {
      const parsed = parseInt(initialPage, 10);
      if (parsed !== page) {
        setPage(parsed);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage]);

  const { reports = [], pagination = p } = useReports(
    page,
    params,
    initialReports,
    p?.count,
    !hasPagination,
  );

  const handlePageChange = (value) => {
    setPage(value);
    const searchParams = new URLSearchParams(window.location.search);
    if (value === 1) {
      searchParams.delete("page");
    } else {
      searchParams.set("page", value);
    }
    const queryString = searchParams.toString();
    let urlPath = window.location.pathname;
    if (queryString) {
      urlPath = `${urlPath}?${queryString}`;
    }
    router.push(urlPath, undefined, { shallow: true, scroll: false });
    if (listRef.current) {
      listRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  function handleApplyFilters(filterParams) {
    setParams((prev) => ({ ...prev, ...filterParams }));
    setPage(1);
    const urlParams = new URLSearchParams(router.query);
    Object.entries(filterParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        urlParams.set(key, value.join(","));
      } else {
        urlParams.set(key, value);
      }
    });
    urlParams.delete("page");
    router.push(
      {
        pathname: router.pathname,
        query: urlParams.toString(),
      },
      undefined,
      { shallow: true, scroll: false },
    );
  }

  console.log(notFoundSubtitleLabel);
  return (
    <Box ref={listRef}>
      {hasFilters ? (
        <Section sx={{ py: 2.5, px: { xs: 2.5, md: 0 } }}>
          <ReportFilters
            {...other}
            onApply={(filterParams) => handleApplyFilters(filterParams)}
          />
        </Section>
      ) : null}
      <Box sx={{ background: "#fff" }}>
        {reports.length ? (
          <Box sx={{ background: "#fff" }}>
            <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
              <Grid
                container
                spacing={3}
                rowSpacing={3.75}
                ref={ref}
                {...other}
              >
                {reports.map((report, index) => (
                  <Grid key={report.id ?? index} size={{ xs: 12, sm: 4 }}>
                    <ReportCard
                      condensed={condensed}
                      actionLabel={cardActionLabel}
                      {...report}
                      sx={
                        condensed && {
                          background: index % 2 === 0 ? "#E7E9FF" : "#F0F0F5",
                        }
                      }
                    />
                  </Grid>
                ))}
              </Grid>
              {hasPagination ? (
                <Box display="flex" justifyContent="flex-end" mt={4}>
                  <Pagination
                    page={pagination?.page ?? 1}
                    count={pagination?.count ?? 1}
                    onChange={handlePageChange}
                  />
                </Box>
              ) : null}
            </Section>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{
              maxWidth: 400,
              margin: "0 auto",
              pt: 5,
              pb: 10,
            }}
            gap={2.5}
          >
            <Figure
              ImageProps={{
                alt: "Error page background",
                src: ErrorPageIcon,
                sx: { objectFit: "cover", opacity: 0.3 },
              }}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                height: 150,
                width: 220,
              }}
            />
            <Typography strong variant="display4">
              {notFoundTitleLabel || "No Reports Found"}
            </Typography>
            <LexicalRichText
              elements={notFoundSubtitleLabel}
              TypographyProps={{
                gutterBottom: true,
                variant: "p2",
                sx: {
                  textAlign: "center",
                  mb: 0,
                },
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
});

export default ReportsList;
