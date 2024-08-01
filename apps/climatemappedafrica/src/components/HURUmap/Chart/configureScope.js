import { Scope } from "@hurumap/core";

import DonutChartScope from "./DonutChartScope";
import MultiLineChartScope from "./MultiLineChartScope";
import StackedChartScope from "./StackedChartScope";
import TreemapChartScope from "./TreemapChartScope";
import VerticalBarChartScope from "./VerticalBarChartScope";
import VerticalStackedChartScope from "./VerticalStackedChartScope";

import { hurumapArgs } from "@/climatemappedafrica/config";
import theme from "@/climatemappedafrica/theme";

const { BarChartScope, LineChartScope } = Scope;

export default function configureScope(
  indicator,
  secondaryIndicator = null,
  profileNames = { primary: "", secondary: "" },
  isCompare = false,
  isMobile = false,
) {
  const configuration = {
    ...indicator?.chart_configuration,
    parentLabel: indicator?.parentName
      ? `${indicator?.parentName} data`
      : undefined,
  };

  const showParent = configuration?.show_parent ?? false;

  let vegaSpec;
  const chartType = configuration?.chart_type?.toLowerCase();

  /**
   * @deprecated Use scopeOptions for implementing new charts
   * This will be completely removed once all charts scopes
   * are moved to Hurumap package
   */
  // eslint-disable-next-line no-underscore-dangle
  const _scopeOptions = [
    indicator?.data,
    indicator?.metadata,
    configuration,
    secondaryIndicator?.data ?? null,
    showParent ? indicator?.parentData : [{}],
    showParent ? secondaryIndicator?.parentData : [{}],
    profileNames,
    isCompare,
    isMobile,
  ];

  const scopeOptions = {
    primaryData: indicator?.data,
    metadata: indicator?.metadata,
    config: configuration,
    secondaryData: secondaryIndicator?.data ?? null,
    primaryParentData: showParent ? indicator?.parentData : [{}],
    secondaryParentData: showParent ? secondaryIndicator?.parentData : [{}],
    profileNames,
    isCompare,
    isMobile,
    theme,
    args: hurumapArgs,
  };

  switch (chartType) {
    case "line":
      if (configuration?.stacked_field) {
        vegaSpec = MultiLineChartScope(..._scopeOptions);
      } else {
        vegaSpec = LineChartScope(scopeOptions);
      }
      break;
    case "donut":
      vegaSpec = DonutChartScope(..._scopeOptions);
      break;
    case "treemap":
      vegaSpec = TreemapChartScope(..._scopeOptions);
      break;
    case "stacked":
      if (isMobile) {
        vegaSpec = VerticalStackedChartScope(
          indicator?.data,
          indicator?.metadata,
          configuration,
          secondaryIndicator?.data ?? null,
          showParent ? indicator?.parentData : null,
          showParent ? secondaryIndicator?.parentData : null,
          isCompare,
        );
      } else {
        vegaSpec = StackedChartScope(
          indicator?.data,
          indicator?.metadata,
          configuration,
          secondaryIndicator?.data ?? null,
          showParent ? indicator?.parentData : [{}],
          showParent ? secondaryIndicator?.parentData : [{}],
          profileNames,
          isCompare,
        );
      }
      break;
    default:
      if (isMobile) {
        vegaSpec = VerticalBarChartScope(
          indicator?.data,
          indicator?.metadata,
          configuration,
          secondaryIndicator?.data ?? null,
          showParent ? indicator?.parentData : null,
          showParent ? secondaryIndicator?.parentData : null,
          profileNames,
          isCompare,
        );
      } else {
        const barChartArgs = {
          primaryData: indicator?.data,
          metadata: indicator?.metadata,
          config: configuration,
          secondaryData: secondaryIndicator?.data ?? null,
          primaryParentData: showParent ? indicator?.parentData : [{}],
          secondaryParentData: showParent
            ? secondaryIndicator?.parentData
            : [{}],
          profileNames,
          isCompare,
          theme,
          args: hurumapArgs,
        };
        vegaSpec = BarChartScope(barChartArgs);
      }
      break;
  }

  return vegaSpec;
}
