import { Box, Typography, Button, Stack, Chip, SvgIcon } from "@mui/material";
import React, { useState, useMemo } from "react";

import FilterDropdown from "./FilterDropdown";

import CalendarIcon from "@/trustlab/assets/icons/calendar.svg";
import CloseIcon from "@/trustlab/assets/icons/close.svg";
import DocumentIcon from "@/trustlab/assets/icons/document.svg";

const ReportFilters = React.forwardRef(function ReportFilters(
  {
    filterByLabel,
    filters = [],
    // removed yearOptions, monthOptions props; reportOptions still comes from props
    reportOptions = [],
    applyFiltersLabel,
    clearFiltersLabel,
    onApply,
    onClear,
    // ...any other props to forward to the root container
    ...rest
  },
  ref,
) {
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);

  // Build a map for quick lookup and derive enabled types
  const { enabled, labels } = useMemo(() => {
    const map = new Map((filters || []).map((f) => [f?.type, f?.label]));
    return {
      enabled: {
        year: map.has("year"),
        month: map.has("month"),
        report: map.has("report"),
      },
      labels: {
        year: map.get("year") || "Year",
        month: map.get("month") || "Month",
        report: map.get("report") || "Report",
      },
    };
  }, [filters]);

  // Generate year options 2000 -> current year (ascending)
  const yearOpts = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const len = currentYear - 2020 + 1;
    return Array.from({ length: len }, (_, i) => 2020 + i);
  }, []);

  // Generate month options January -> December
  const monthOpts = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    [],
  );

  const handleChipDelete = (type, value) => {
    if (type === "year") {
      const toUpdate = selectedYears.filter((v) => v !== value);
      setSelectedYears(toUpdate);
      if (onApply) {
        onApply({
          years: toUpdate,
          months: selectedMonths,
          reports: selectedReports,
        });
      }
    }
    if (type === "month") {
      const toUpdate = selectedMonths.filter((v) => v !== value);
      setSelectedMonths(toUpdate);
      if (onApply) {
        onApply({
          years: selectedYears,
          months: toUpdate,
          reports: selectedReports,
        });
      }
    }
    if (type === "report") {
      const toUpdate = selectedReports.filter((v) => v !== value);
      setSelectedReports(toUpdate);
      if (onApply) {
        onApply({
          years: selectedYears,
          months: selectedMonths,
          reports: toUpdate,
        });
      }
    }
  };

  const clearAll = () => {
    setSelectedYears([]);
    setSelectedMonths([]);
    setSelectedReports([]);
    if (onClear) {
      onClear();
    }
  };

  function handleChange(action) {
    if (onApply) {
      onApply({
        years: selectedYears,
        months: selectedMonths,
        reports: selectedReports,
        ...action,
      });
    }
    if (action.years) {
      setSelectedYears(action.years);
    }
    if (action.months) {
      setSelectedMonths(action.months);
    }
    if (action.reports) {
      setSelectedReports(action.reports);
    }
  }
  const anySelected =
    selectedYears.length || selectedMonths.length || selectedReports.length;

  return (
    <Box ref={ref} display="flex" flexDirection="column" gap={2} {...rest}>
      {/* Row 1: Filter By Label */}
      {filterByLabel && (
        <Typography variant="subtitle1" fontWeight={500}>
          {filterByLabel}
        </Typography>
      )}

      {/* Row 2: Dropdown buttons */}
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {enabled.year && (
          <FilterDropdown
            label={labels.year}
            options={yearOpts}
            selected={selectedYears}
            onChange={(years) => handleChange({ years })}
            startIcon={
              <SvgIcon
                component={CalendarIcon}
                sx={{
                  fill: "none",
                }}
              />
            }
            size="small"
          />
        )}

        {enabled.month && (
          <FilterDropdown
            label={labels.month}
            options={monthOpts.map((m, i) => ({ label: m, value: i + 1 }))}
            selected={selectedMonths}
            onChange={(months) => handleChange({ months })}
            startIcon={
              <SvgIcon
                component={CalendarIcon}
                sx={{
                  fill: "none",
                  fontSize: "16px",
                }}
              />
            }
            size="small"
          />
        )}

        {enabled.report && (
          <FilterDropdown
            label={labels.report}
            options={reportOptions}
            selected={selectedReports}
            onChange={(reports) => handleChange({ reports })}
            getOptionValue={(r) => r.id}
            getOptionLabel={(r) => r.title}
            startIcon={
              <SvgIcon
                component={DocumentIcon}
                sx={{
                  fill: "none",
                }}
              />
            }
            size="small"
          />
        )}
      </Stack>

      {/* Row 3: Chips + Actions */}
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" flexWrap="wrap" gap={2} flex={1}>
          {selectedYears.map((y) => (
            <Chip
              key={`year-${y}`}
              label={y}
              size="small"
              onDelete={() => handleChipDelete("year", y)}
              sx={{
                px: 2,
                borderRadius: "10px",
                p: 0.5,
              }}
            />
          ))}
          {selectedMonths.map((m) => (
            <Chip
              key={`month-${m}`}
              label={monthOpts[m - 1]}
              size="small"
              onDelete={() => handleChipDelete("month", m)}
              sx={{
                px: 2,
                borderRadius: "10px",
                p: 0.5,
              }}
            />
          ))}
          {selectedReports.map((r) => {
            const report = reportOptions.find((opt) => opt.id === r) || {
              title: r,
            };
            return (
              <Chip
                key={`report-${r}`}
                label={report.title}
                size="small"
                onDelete={() => handleChipDelete("report", r)}
                sx={{
                  px: 2,
                  borderRadius: "10px",
                  p: 0.5,
                }}
              />
            );
          })}
          {!!anySelected && (
            <Button
              variant="text"
              onClick={clearAll}
              disabled={!anySelected}
              size="small"
              sx={{
                textTransform: "none",
                cursor: anySelected ? "pointer" : "default",
                border: "none",
                background: "transparent",
                p: 0,
                height: "20px",
                color: "#BE1F23",
                position: "relative",
                pl: 3,
              }}
            >
              <SvgIcon
                sx={{
                  fill: "none",
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-35%)",
                  left: 0,
                }}
                component={CloseIcon}
              />
              {clearFiltersLabel || "Clear Filters"}
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
});

export default ReportFilters;
