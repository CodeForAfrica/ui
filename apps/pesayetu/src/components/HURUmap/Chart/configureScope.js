import BarChartScope from "./BarChartScope";
import DonutChartScope from "./DonutChartScope";
import LineChartScope from "./LineChartScope";
import MultiLineChartScope from "./MultiLineChartScope";
import StackedChartScope from "./StackedChartScope";
import TreemapChartScope from "./TreemapChartScope";
import VerticalBarChartScope from "./VerticalBarChartScope";
import VerticalStackedChartScope from "./VerticalStackedChartScope";

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
  const scopeOptions = [
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
  switch (chartType) {
    case "line":
      if (configuration?.stacked_field) {
        vegaSpec = MultiLineChartScope(...scopeOptions);
      } else {
        vegaSpec = LineChartScope(...scopeOptions);
      }
      break;
    case "donut":
      vegaSpec = DonutChartScope(...scopeOptions);
      break;
    case "treemap":
      vegaSpec = TreemapChartScope(...scopeOptions);
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
        vegaSpec = BarChartScope(
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
  }

  return vegaSpec;
}
