import { Box, Typography, Button, Stack, Chip, SvgIcon } from "@mui/material";
import React, { useState, useMemo, useCallback } from "react";

import FilterDropdown from "./FilterDropdown";

import CalendarIcon from "@/trustlab/assets/icons/calendar.svg";
import CloseIcon from "@/trustlab/assets/icons/close.svg";
import DocumentIcon from "@/trustlab/assets/icons/document.svg";

const defaultIcons = {
  year: CalendarIcon,
  month: CalendarIcon,
  date: CalendarIcon,
  document: DocumentIcon,
  report: DocumentIcon,
};

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const len = currentYear - 2020 + 1;
  return Array.from({ length: len }, (_, i) => 2020 + i);
};

// Generate month options
const generateMonthOptions = () => [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const monthLabels = [
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
];

const Filters = React.forwardRef(function Filters(
  { filterByLabel, filters = [], clearFiltersLabel, onApply, onClear, sx },
  ref,
) {
  // Initialize selected state for all filter types
  const [selectedValues, setSelectedValues] = useState({});

  // Process filters config and build options
  const processedFilters = useMemo(() => {
    return (filters || []).map((filter) => {
      const { type, label, options, icon, getOptionValue, getOptionLabel } =
        filter;

      // Auto-generate options for known types if not provided
      let resolvedOptions = options;
      if (!resolvedOptions?.length) {
        if (type === "year") {
          resolvedOptions = generateYearOptions();
        } else if (type === "month") {
          resolvedOptions = generateMonthOptions();
        }
      }

      // Resolve icon
      const resolvedIcon = icon || defaultIcons[type] || DocumentIcon;

      return {
        type,
        label: label || type,
        options: resolvedOptions || [],
        icon: resolvedIcon,
        getOptionValue:
          getOptionValue ||
          ((opt) => (typeof opt === "object" ? (opt.value ?? opt.id) : opt)),
        getOptionLabel:
          getOptionLabel ||
          ((opt) =>
            typeof opt === "object"
              ? (opt.label ?? opt.title ?? opt.name)
              : opt),
      };
    });
  }, [filters]);

  const getChipLabel = useCallback(
    (filterType, value) => {
      const filter = processedFilters.find((f) => f.type === filterType);
      if (!filter) {
        return value;
      }

      // Special handling for month type
      if (filterType === "month" && typeof value === "number") {
        return monthLabels[value - 1] || value;
      }

      const option = filter.options.find((opt) => {
        const optValue = filter.getOptionValue(opt);
        return optValue === value;
      });

      if (option) {
        return filter.getOptionLabel(option);
      }

      return value;
    },
    [processedFilters],
  );

  const handleFilterChange = useCallback(
    (filterType, values) => {
      const newSelectedValues = {
        ...selectedValues,
        [filterType]: values,
      };
      setSelectedValues(newSelectedValues);

      if (onApply) {
        onApply(newSelectedValues);
      }
    },
    [selectedValues, onApply],
  );

  const handleChipDelete = useCallback(
    (filterType, value) => {
      const currentValues = selectedValues[filterType] || [];
      const newValues = currentValues.filter((v) => v !== value);
      handleFilterChange(filterType, newValues);
    },
    [selectedValues, handleFilterChange],
  );

  const clearAll = useCallback(() => {
    setSelectedValues({});
    if (onClear) {
      onClear();
    }
    if (onApply) {
      onApply({});
    }
  }, [onApply, onClear]);

  const anySelected = useMemo(() => {
    return Object.values(selectedValues).some((values) => values?.length > 0);
  }, [selectedValues]);

  // Collect all chips from all filter types
  const allChips = useMemo(() => {
    const chips = [];
    Object.entries(selectedValues).forEach(([filterType, values]) => {
      (values || []).forEach((value) => {
        chips.push({
          filterType,
          value,
          label: getChipLabel(filterType, value),
        });
      });
    });
    return chips;
  }, [selectedValues, getChipLabel]);

  return (
    <Box ref={ref} display="flex" flexDirection="column" gap={1} sx={sx}>
      {/* Row 1: Filter By Label */}
      {filterByLabel && (
        <Typography variant="subtitle1" fontWeight={700}>
          {filterByLabel}
        </Typography>
      )}

      {/* Row 2: Dropdown buttons */}
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        {processedFilters.map((filter) => (
          <FilterDropdown
            key={filter.type}
            label={filter.label}
            options={filter.options}
            selected={selectedValues[filter.type] || []}
            onChange={(values) => handleFilterChange(filter.type, values)}
            getOptionValue={filter.getOptionValue}
            getOptionLabel={filter.getOptionLabel}
            startIcon={
              <SvgIcon
                component={filter.icon}
                sx={{
                  fill: "none",
                  fontSize: "16px",
                }}
              />
            }
            size="small"
          />
        ))}
      </Stack>

      {/* Row 3: Chips + Actions */}
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
          flex={1}
        >
          {allChips.map((chip) => (
            <Chip
              key={`${chip.filterType}-${chip.value}`}
              label={chip.label}
              size="small"
              onDelete={() => handleChipDelete(chip.filterType, chip.value)}
              sx={{
                px: 2,
                borderRadius: "10px",
                p: 0.5,
              }}
            />
          ))}
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
              {clearFiltersLabel || "Clear Filter(s)"}
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
});

export default Filters;
