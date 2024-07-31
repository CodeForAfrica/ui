import { ChartTooltip } from "@hurumap/core";
import { Source } from "@hurumap/next";
import { useMediaQuery } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState, useRef, useCallback, useEffect } from "react";
import embed from "vega-embed";

import configureScope from "./configureScope";
import Filters from "./Filters";
import { calculateTooltipPosition, idify } from "./utils";

import IndicatorTitle from "@/pesayetu/components/HURUmap/IndicatorTitle";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
  },
  chart: {
    width: "100%",
  },
}));

function Chart({
  indicator,
  indicatorTitle,
  secondaryIndicator: sI,
  title,
  geoCode,
  profileNames,
  isCompare,
  ...props
}) {
  const classes = useStyles(props);
  const chartRef = useRef();
  const tooltipRef = useRef();
  const [view, setView] = useState(null);
  const [cSpec, setCSpec] = useState(null);
  const isMobile = !useMediaQuery("(min-width:600px)");
  const [tooltipData, setTooltipData] = useState(null);
  const secondaryIndicator = sI?.indicator;

  const {
    id,
    description,
    metadata: { source, url, groups, primary_group: primaryGroup },
  } = indicator;

  const {
    disableToggle,
    defaultType,
    filter,
    stacked_field: stackedField,
    chart_type: chartType,
  } = indicator?.chart_configuration || {};

  const [chartValue, setChartValue] = useState(defaultType || "Value");

  const onChartValueChange = (value) => {
    setChartValue(value);
    view.signal("Units", value.toLowerCase()).run();
  };

  const handler = useCallback(
    (_, event, item, value) => {
      setTooltipData({ item, value, id, geoCode, event });
    },
    [id, geoCode],
  );

  useEffect(() => {
    async function renderChart() {
      const spec = configureScope(
        indicator,
        secondaryIndicator,
        profileNames,
        isCompare,
        isMobile,
      );
      setCSpec(spec);
      if (chartRef?.current) {
        try {
          const newView = await embed(chartRef.current, spec, {
            renderer: "canvas",
            actions: false,
            tooltip: handler,
          });

          setView(newView.view);
        } catch (error) {
          console.error(error);
        }
      }
    }
    renderChart();
  }, [
    indicator,
    isMobile,
    isCompare,
    profileNames,
    secondaryIndicator,
    handler,
  ]);

  // apply default filter if defined
  const defaultFilters =
    filter?.defaults
      ?.filter(({ name, value }) => {
        const filterName = idify(name);
        try {
          view?.signal(`${filterName}Filter`, true);
          view?.signal(`${filterName}FilterValue`, value);
          view?.run();
          return true;
        } catch (e) {
          return false;
        }
      })
      ?.map(({ name, value }) => {
        return {
          name,
          value,
          subindicators: groups?.find(({ name: gName }) => name === gName)
            ?.subindicators,
        };
      }) ?? [];

  const defaultFiltersNames = defaultFilters?.map(({ name }) => name);

  const filterGroups = groups
    ?.filter(({ name }) => name !== primaryGroup)
    ?.filter(({ name }) => name !== (stackedField || ""))
    ?.filter(({ name }) => !defaultFiltersNames?.includes(name))
    ?.map((g) => {
      return { ...g, slug: idify(g?.name) };
    });

  const [filterSelectProps, setFilterSelectProps] = useState([
    {
      groups: filterGroups,
      index: 0,
      selectedValue: undefined,
      selectedAttribute: "All values",
    },
  ]);

  const currentFilters = [
    ...defaultFilters,
    // eslint-disable-next-line no-unsafe-optional-chaining
    ...filterSelectProps
      ?.filter(({ selectedAttribute }) => selectedAttribute !== "All values")
      ?.map(({ selectedValue: value, selectedAttribute: name }) => {
        return {
          value,
          name,
        };
      }),
  ];

  let position = {};
  if (tooltipData?.event && tooltipRef?.current) {
    position = calculateTooltipPosition(
      tooltipData?.event,
      tooltipRef?.current?.getBoundingClientRect(),
      0,
      10,
    );
  }
  if (!indicator?.data) {
    return null;
  }

  return (
    <div className={classes.root} id={`chart-${id}-${geoCode}`}>
      <IndicatorTitle
        title={title}
        description={description}
        view={view}
        geoCode={geoCode}
        indicatorId={id}
        disableToggle={disableToggle}
        chartValue={chartValue}
        handleChartValueChange={onChartValueChange}
        spec={cSpec}
        currentFilters={currentFilters}
        source={source}
        isCompare={isCompare}
        profileNames={profileNames}
        chartType={chartType?.toLowerCase()}
      >
        {indicatorTitle}
      </IndicatorTitle>
      {!isMobile && (
        <Filters
          filterGroups={filterGroups}
          filterSelectProps={filterSelectProps}
          setFilterSelectProps={setFilterSelectProps}
          defaultFilters={defaultFilters ?? undefined}
          view={view}
        />
      )}
      <div ref={chartRef} className={classes.chart} />
      <Source
        href={url}
        sx={({ typography }) => ({
          margin: `${typography.pxToRem(20)} 0`,
        })}
      >
        {source}
      </Source>
      {tooltipData && tooltipData?.event && (
        <ChartTooltip
          id={id}
          geoCode={geoCode}
          value={tooltipData.value}
          itemColor={tooltipData.item?.fill}
          event={tooltipData?.event}
          title={tooltipData.value?.group}
          tooltipRef={tooltipRef}
          position={position}
          formattedValue={
            defaultType?.toLowerCase() === "percentage" || !disableToggle
              ? tooltipData.value?.percentage
              : undefined
          }
        />
      )}
    </div>
  );
}

export default Chart;
