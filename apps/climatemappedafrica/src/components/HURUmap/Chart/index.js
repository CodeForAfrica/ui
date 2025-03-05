import { RichTypography } from "@commons-ui/next";
import { IndicatorTitle, Download, Share } from "@hurumap/core";
import { Source } from "@hurumap/next";
import { Box, GlobalStyles, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import * as vega from "vega";
import embed from "vega-embed";

import configureScope from "./configureScope";
import Filters from "./Filters";
import { idify } from "./utils";

import CopyIcon from "@/climatemappedafrica/assets/icons/copy.svg";
import DownloadIcon from "@/climatemappedafrica/assets/icons/download.svg";
import EmailIcon from "@/climatemappedafrica/assets/icons/Email.svg";
import FacebookIcon from "@/climatemappedafrica/assets/icons/Facebook.svg";
import LinkedInIcon from "@/climatemappedafrica/assets/icons/LinkedIn.svg";
import InfoIcon from "@/climatemappedafrica/assets/icons/plus.svg";
import ShareIcon from "@/climatemappedafrica/assets/icons/share.svg";
import WhatsAppIcon from "@/climatemappedafrica/assets/icons/WhatsApp.svg";
import XLogo from "@/climatemappedafrica/assets/icons/x-logo.svg";
import cfalogo from "@/climatemappedafrica/assets/logos/cfa.svg";
import projectlogo from "@/climatemappedafrica/assets/logos/projectLogo.svg";
import config, { hurumapArgs } from "@/climatemappedafrica/config";
import site from "@/climatemappedafrica/utils/site";

const inputGlobalStyles = (
  // NOTE: Global style uses default theme https://github.com/mui/material-ui/blob/5f4452348e6669e96c8d9f1c5a791a5154eaed70/packages/mui-material/src/GlobalStyles/GlobalStyles.js#L9
  <GlobalStyles
    styles={(theme) => ({
      // Default theme: https://github.com/vega/vega-tooltip/blob/6aebdc73d783432cd66b5caef4093169064cfff0/vega-tooltip.scss#L1
      "#vg-tooltip-element": {
        ...theme.typography.body2,
        backgroundColor: theme.palette.grey["900"],
        border: `1px solid ${theme.palette.grey["900"]}`,
        borderRadius: theme.typography.pxToRem(4),
        boxShadow: "0px 3px 6px #00000029",
        color: theme.palette.text.secondary,
        opacity: 0.8,
        padding: theme.typography.pxToRem(12.5),
        zIndex: theme.zIndex.tooltip,
        // In desktop, charts are rendered on a drawer
        [theme.breakpoints.up("lg")]: {
          zIndex: theme.zIndex.drawer + 1,
        },
        // HTML structure: https://github.com/vega/vega-tooltip/blob/6aebdc73d783432cd66b5caef4093169064cfff0/src/formatValue.ts#L9
        table: {
          tbody: {
            display: "flex",
            alignItems: "space-between",
            tr: {
              display: "flex",
              // flex: "50%",
              marginRight: theme.typography.pxToRem(12.5),
              "&:last-of-type": {
                marginRight: 0,
              },
              td: {
                padding: 0,
                "&.key": {
                  display: "none",
                },
                "&.value": {
                  maxHeith: undefined,
                  maxWidth: theme.typography.pxToRem(148),
                },
              },
            },
          },
        },
      },
      ".custom-theme": {
        // Extra/new styles
      },
    })}
  />
);

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
  const chartRef = useRef();
  const [view, setView] = useState(null);
  const [cSpec, setCSpec] = useState(null);
  const isMobile = !useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const [downloadView, setDownloadView] = useState(null);
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
            actions: false,
            padding: 0,
            renderer: "canvas",
            tooltip: { theme: "custom" },
          });

          setView(newView.view);
        } catch (error) {
          console.error("Error rendering chart", error);
        }
      }
    }
    renderChart();
  }, [indicator, isMobile, isCompare, profileNames, secondaryIndicator]);

  useEffect(() => {
    try {
      if (cSpec) {
        const viewProp = new vega.View(vega.parse(cSpec), { renderer: "none" });
        setDownloadView(viewProp);
      }
    } catch (error) {
      console.error("Error creating view", error);
    }
  }, [cSpec]);

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

  if (!indicator?.data) {
    return null;
  }
  const {
    indicatorTitle: {
      download: { values, layouts, imageTypes, fileTypes },
    },
  } = hurumapArgs;

  const splitString = (str) => {
    // eslint-disable-next-line prefer-regex-literals
    const regex = new RegExp(/\S.{1,42}\S(?= |$)/, "g");
    const chunks = str.match(regex);
    return chunks;
  };

  const chartTitle = splitString(title)?.slice(0, 3);
  const subtitle = currentFilters?.reduce((acc, cur) => {
    return `${acc}${cur.name}: ${cur.value},`;
  }, "");
  const secondaryName = isCompare
    ? ` vs ${profileNames?.secondary?.split("-")[0]}`
    : "";
  const chartSubtitle = `${subtitle} Location: ${profileNames?.primary}${secondaryName}`;

  const shareData = [
    {
      name: "Facebook",
      icon: FacebookIcon,
      props: { quote: title, hashtag: "#ClimateMapped.Africa" },
    },
    {
      name: "Twitter",
      icon: XLogo,
      props: { title, via: "Code4Africa", related: ["Code4Africa"] },
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      props: {
        summary: title,
        source: process.env.NEXT_PUBLIC_APP_URL,
      },
    },
    { name: "WhatsApp", icon: WhatsAppIcon, props: { quote: title } },
    { name: "Email", icon: EmailIcon, props: { subject: title } },
    { name: "CopyUrl", icon: CopyIcon, props: { subject: title } },
  ];

  const shareUrl = new URL(
    `/embed/${geoCode.toLowerCase()}/${id}`,
    site.environmentUrl,
  ).toString();

  const className = `wrapper-${geoCode}-${id}`;

  const codeData = {
    className,
    src: `${process.env.NEXT_PUBLIC_APP_URL}/embed/${geoCode.toLowerCase()}/${id}`,
  };

  const actions = [
    description && {
      id: "act-description",
      title: "Description",
      header: "Learn More",
      children: (
        <RichTypography
          sx={(theme) => ({
            fontSize: theme.typography.pxToRem(11),
            lineHeight: 17 / 11,
            color: "#666666",
            padding: `${theme.typography.pxToRem(18)} ${theme.typography.pxToRem(
              20,
            )} ${theme.typography.pxToRem(31)} ${theme.typography.pxToRem(16)}`,
            "& > p > span": {
              display: "inline-block",
            },
          })}
        >
          {description}
        </RichTypography>
      ),
      icon: <InfoIcon />,
    },
    {
      id: "act-download",
      title: "Download",
      header: disableToggle ? "Download chart as" : "Chart value as:",
      children: (
        <Download
          {...props}
          title={title}
          disableToggle={disableToggle}
          height={view?.height()}
          data={[
            ...(view?.data("primary") ?? []),
            ...(view?.data("secondary") ?? []),
          ]}
          values={values}
          imageTypes={imageTypes}
          view={downloadView}
          chartTitle={chartTitle}
          chartSubtitle={chartSubtitle}
          cfalogo={cfalogo}
          projectlogo={projectlogo}
          backgroundColor={palette.common.white}
          scaleFactor={config.images.scaleFactor}
          layouts={layouts}
          fileTypes={fileTypes}
          currentFilters={currentFilters}
        />
      ),
      icon: <DownloadIcon />,
    },
    {
      id: "act-share",
      title: "Share",
      header: "Share chart via:",
      children: (
        <Share
          title={title}
          shareData={shareData}
          url={shareUrl}
          codeData={codeData}
          {...props}
        />
      ),
      icon: <ShareIcon />,
    },
  ];

  return (
    <>
      {inputGlobalStyles}
      <Box
        id={`chart-${id}-${geoCode}`}
        sx={({ typography }) => ({
          position: "relative",
          width: "100%",
          "&:last-of-type": {
            marginBottom: typography.pxToRem(32),
          },
        })}
      >
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
          actions={actions}
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
        <Box
          ref={chartRef}
          sx={{
            width: "100%",
          }}
        />
        <RichTypography
          variant="body2"
          sx={(theme) => ({
            color: "#666666",
            fontSize: theme.typography.pxToRem(13),
            lineHeight: 20 / 13,
          })}
        >
          {description}
        </RichTypography>
        <Source
          href={url}
          sx={({ typography }) => ({
            margin: `${typography.pxToRem(20)} 0`,
          })}
        >
          {source}
        </Source>
      </Box>
    </>
  );
}

export default Chart;
