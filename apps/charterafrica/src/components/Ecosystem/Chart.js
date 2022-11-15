/* eslint-env browser */
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useEffect, useState } from "react";

import { Pie, Waffle } from "@/charterafrica/components/Charts";

const Chart = React.forwardRef(function Chart(props, ref) {
  const { data, ...other } = props;
  const [windowSize, setWindowSize] = useState({
    innerHeight: 390,
    innerWidth: 390,
  });
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

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
  let chartHeight = Math.min(windowSize.innerWidth - 20, 445);
  if (isSmUp) {
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
