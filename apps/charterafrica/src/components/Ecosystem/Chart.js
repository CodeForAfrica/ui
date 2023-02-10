/* eslint-env browser */
import { Box, useTheme, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Pie, Waffle } from "@/charterafrica/components/Charts";

const Chart = React.forwardRef(function Chart(props, ref) {
  const { data, ...other } = props;
  const [windowSize, setWindowSize] = useState({
    innerHeight: 350,
    innerWidth: 350,
  });
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    function handleWindowResize() {
      const { innerWidth, innerHeight } = window;
      setWindowSize({ innerHeight, innerWidth });
    }

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (!data?.length) {
    return null;
  }
  let ChartRoot = Pie;
  let total;
  if (data.length > 3) {
    ChartRoot = Waffle;
    total = data.reduce((acc, curr) => acc + curr.value, 0);
  }
  let chartHeight = Math.min(windowSize.innerWidth - 20, 350);
  if (isMdUp) {
    chartHeight = 445;
  }
  return (
    <Box
      display="flex"
      height={chartHeight}
      width={chartHeight}
      {...other}
      ref={ref}
    >
      <ChartRoot
        data={data}
        height={chartHeight}
        total={total}
        width={chartHeight}
      />
    </Box>
  );
});

export default Chart;
