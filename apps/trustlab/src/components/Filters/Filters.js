import {
  Box,
  Button,
  Chip,
  InputAdornment,
  InputBase,
  LinearProgress,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import FilterDropdown from "./FilterDropdown";

import CalendarIcon from "@/trustlab/assets/icons/calendar.svg";
import ChevronDownIcon from "@/trustlab/assets/icons/chevron-down.svg";
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
  return Array.from({ length: len }, (_, i) => currentYear - i);
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

function SortDropdown({ label, options = [], value, onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const selectedOption = options.find((o) => o.value === value);
  const buttonLabel = selectedOption
    ? `${label}: ${selectedOption.label}`
    : label;

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={
          <SvgIcon
            component={ChevronDownIcon}
            inheritViewBox
            sx={{ fill: "none", fontSize: 16, display: "block", mt: "-4px" }}
          />
        }
        sx={{
          textTransform: "none",
          backgroundColor: "#fff",
          borderRadius: "10px",
          border: "1px solid #C9CACB",
          display: "inline-flex",
          alignItems: "center",
          lineHeight: 1,
          "& .MuiButton-endIcon": {
            m: 0,
            display: "inline-flex",
            alignItems: "center",
          },
          "& .MuiButton-endIcon svg": {
            fontSize: 16,
            display: "block",
          },
        }}
      >
        {buttonLabel}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setAnchorEl(null)}
      >
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <MenuItem
              key={opt.value}
              onClick={() => {
                onChange?.(isSelected ? null : opt.value);
                setAnchorEl(null);
              }}
              sx={{ minWidth: 160, justifyContent: "space-between", gap: 2 }}
            >
              <ListItemText primary={opt.label} />
              {isSelected && (
                <SvgIcon
                  sx={{ fontSize: 16, fill: "none", flexShrink: 0 }}
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.5 8 L6.5 12 L13.5 4"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </SvgIcon>
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}

const SEARCH_DEBOUNCE_MS = 400;

const Filters = React.forwardRef(function Filters(
  {
    filterByLabel,
    filters = [],
    // Current control state from the parent's URL-synced params: filter
    // selections keyed by type, plus `sort` and `search`. Filters is controlled
    // by this and holds no selection state of its own.
    selectedValues = {},
    defaultSort,
    clearFiltersLabel,
    isBusy = false,
    onApply,
    onClear,
    sx,
    // Search
    searchPlaceholderLabel,
    onSearch,
    // Sort
    sortByLabel,
    sortOptions = [],
    onSortChange,
    // Atomic clear (preferred over onApply/onClear when search/sort are active)
    onClearAll,
    showProgress = true,
    // progress will take .5 height e.g. if showProgress = false, spacing should be 2.5
    spacing = { xs: 2 },
  },
  ref,
) {
  // Sort is controlled and the search box keeps a local draft for immediate
  // typing while syncing from the current controlled state.
  const sortValue = selectedValues.sort ?? null;
  const hasActiveSort = Boolean(sortValue) && sortValue !== defaultSort;
  const controlledSearchValue = selectedValues.search ?? "";
  const [searchValue, setSearchValue] = useState(controlledSearchValue);
  const searchTimerRef = useRef(null);

  useEffect(() => {
    setSearchValue(controlledSearchValue);
  }, [controlledSearchValue]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
    };
  }, []);

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

  // Reconcile the incoming selection (from the URL/params, where values are
  // strings) against each filter's options so types match for selection
  // highlighting and chip labels (e.g. year/month options are numbers).
  const normalizedSelected = useMemo(() => {
    const result = {};
    processedFilters.forEach((filter) => {
      const incoming = selectedValues?.[filter.type];
      if (incoming == null) {
        return;
      }
      const values = Array.isArray(incoming) ? incoming : [incoming];
      result[filter.type] = values.map((value) => {
        const option = filter.options.find(
          (opt) => String(filter.getOptionValue(opt)) === String(value),
        );
        return option ? filter.getOptionValue(option) : value;
      });
    });
    return result;
  }, [selectedValues, processedFilters]);

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
      // Controlled: emit the full selection and let the parent update
      // params/URL, which flows back down as `selectedValues`.
      onApply?.({ ...normalizedSelected, [filterType]: values });
    },
    [normalizedSelected, onApply],
  );

  const handleChipDelete = useCallback(
    (filterType, value) => {
      const currentValues = normalizedSelected[filterType] || [];
      const newValues = currentValues.filter((v) => v !== value);
      handleFilterChange(filterType, newValues);
    },
    [normalizedSelected, handleFilterChange],
  );

  const handleSearchChange = useCallback(
    (e) => {
      const val = e.target.value;
      setSearchValue(val);
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
      searchTimerRef.current = setTimeout(() => {
        onSearch?.(val);
      }, SEARCH_DEBOUNCE_MS);
    },
    [onSearch],
  );

  const handleSortChange = useCallback(
    (value) => {
      // Controlled: let the parent update params/URL, which flows back as sortValue.
      onSortChange?.(value);
    },
    [onSortChange],
  );

  const clearAll = useCallback(() => {
    setSearchValue("");
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
    }
    if (onClearAll) {
      // Single atomic call — parent handles state + URL in one router.push
      onClearAll();
    } else {
      // Fallback for consumers that don't use search/sort (no race risk there)
      onClear?.();
      onApply?.({});
    }
  }, [onApply, onClear, onClearAll]);

  const anySelected = useMemo(() => {
    return (
      Object.values(normalizedSelected).some((values) => values?.length > 0) ||
      !!searchValue ||
      hasActiveSort
    );
  }, [normalizedSelected, searchValue, hasActiveSort]);

  // Collect all chips from all filter types
  const allChips = useMemo(() => {
    const chips = [];
    Object.entries(normalizedSelected).forEach(([filterType, values]) => {
      (values || []).forEach((value) => {
        chips.push({
          filterType,
          value,
          label: getChipLabel(filterType, value),
        });
      });
    });
    return chips;
  }, [normalizedSelected, getChipLabel]);

  // Gate on the callback props so a stale CMS label can't accidentally re-show
  // a control whose feature flag has been disabled
  const showSearch = Boolean(onSearch);
  const showSort = Boolean(onSortChange) && sortOptions.length > 0;

  return (
    <Stack spacing={spacing} sx={sx} ref={ref}>
      <Box display="flex" flexDirection="column" gap={1}>
        {/* Filter By label sits above the controls row */}
        {filterByLabel && (
          <Typography variant="subtitle1" fontWeight={700}>
            {filterByLabel}
          </Typography>
        )}

        {/* Controls row — flat flex row that wraps.
          xs: search claims its own line (width 100%), filters + sort wrap below.
          sm+: search is capped at 50%, everything stays on one line. */}
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
          gap={2}
        >
          {showSearch && (
            <InputBase
              value={searchValue}
              onChange={handleSearchChange}
              placeholder={searchPlaceholderLabel || "Search..."}
              startAdornment={
                <InputAdornment position="start" sx={{ ml: 0.5, mr: 0.25 }}>
                  <SvgIcon
                    sx={{ fontSize: 16, fill: "none", color: "text.secondary" }}
                    viewBox="0 0 20 20"
                  >
                    <circle
                      cx="9"
                      cy="9"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="m14 14 3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </SvgIcon>
                </InputAdornment>
              }
              sx={{
                width: { xs: "100%", sm: "auto" },
                flex: { sm: 1 },
                maxWidth: { sm: "50%" },
                minWidth: 180,
                border: "1px solid #C9CACB",
                borderRadius: "10px",
                px: 1.5,
                py: 0.5,
                fontSize: "14px",
                backgroundColor: "#fff",
              }}
            />
          )}
          {processedFilters.map((filter) => (
            <FilterDropdown
              key={filter.type}
              label={filter.label}
              options={filter.options}
              selected={normalizedSelected[filter.type] || []}
              onChange={(values) => handleFilterChange(filter.type, values)}
              getOptionValue={filter.getOptionValue}
              getOptionLabel={filter.getOptionLabel}
              startIcon={
                <SvgIcon
                  component={filter.icon}
                  sx={{ fill: "none", fontSize: "16px" }}
                />
              }
              size="small"
            />
          ))}
          {/* ml:auto keeps sort at the far right of whichever line it lands on */}
          {showSort && (
            <Box sx={{ ml: "auto" }}>
              <SortDropdown
                label={sortByLabel}
                options={sortOptions}
                value={sortValue}
                onChange={handleSortChange}
              />
            </Box>
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
      {showProgress ? (
        <Box sx={{ height: 4, width: "100%" }}>
          {isBusy ? <LinearProgress /> : null}
        </Box>
      ) : null}
    </Stack>
  );
});

export default Filters;
