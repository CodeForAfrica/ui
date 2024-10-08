import { Scope } from "@hurumap/core";

import { hurumapArgs } from "@/climatemappedafrica/config";
import theme from "@/climatemappedafrica/theme";

const {
  BarChartScope,
  DonutChartScope,
  HeatMapScope,
  LineChartScope,
  MultiLineChartScope,
  TreemapChartScope,
  VerticalBarChartScope,
  VerticalStackedChartScope,
  StackedChartScope,
} = Scope;

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
        vegaSpec = MultiLineChartScope(scopeOptions);
      } else {
        vegaSpec = LineChartScope(scopeOptions);
      }
      break;
    case "donut":
      vegaSpec = DonutChartScope(scopeOptions);
      break;
    case "treemap":
      vegaSpec = TreemapChartScope(scopeOptions);
      break;
    case "heatmap":
      vegaSpec = HeatMapScope(scopeOptions);
      break;
    case "stacked":
      if (isMobile) {
        vegaSpec = VerticalStackedChartScope(scopeOptions);
      } else {
        vegaSpec = StackedChartScope(scopeOptions);
      }
      break;
    default:
      if (isMobile) {
        vegaSpec = VerticalBarChartScope(scopeOptions);
      } else {
        vegaSpec = BarChartScope(scopeOptions);
      }
      break;
  }

  return vegaSpec;
}
