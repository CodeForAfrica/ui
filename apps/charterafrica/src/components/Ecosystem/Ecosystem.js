import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";

import Chart from "./Chart";
import Key from "./Key";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import ToggleSwitch from "@/charterafrica/components/ToggleSwitch";

const Ecosystem = React.forwardRef(function Ecosystem(props, ref) {
  const { EndLabelProps, StartLabelProps, SwitchProps, items, sx } = props;
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (SwitchProps?.onChange) {
      SwitchProps?.onChange?.(e);
    }
  };

  if (items?.length !== 2) {
    return null;
  }
  const ToggleSwitchProps = {
    EndLabelProps,
    StartLabelProps,
    SwitchProps: {
      ...SwitchProps,
      onChange: handleChange,
    },
    endLabel: items[1].title,
    startLabel: items[0].title,
  };
  const selectedIndex = checked ? 1 : 0;
  const data = items[selectedIndex];
  // To ensure faster/smoother rendering, we'll rander all items and only
  // display the selected one.
  return (
    <Box sx={sx} ref={ref}>
      <Section sx={{ px: { xs: "5px", sm: 0 }, py: { xs: 5, md: "50px" } }}>
        {items.map((datum, i) => (
          <LineClampedRichTypography
            display={{
              xs:
                (checked && i === 1) || (!checked && i === 0) ? "flex" : "none",
              md: "none",
            }}
            lineClamp={1}
            variant="h2Small"
            typography={{ md: "h2" }}
            key={datum.title}
            mb={3.75}
          >
            {datum.title}
          </LineClampedRichTypography>
        ))}
        <Grid
          container
          justifyContent="space-between"
          spacing={{ xs: 3.75, md: 0 }}
        >
          <Grid item order={{ xs: 0, md: 1 }}>
            {items.map((datum, i) => (
              <Chart
                data={datum.data}
                sx={{
                  display:
                    (checked && i === 1) || (!checked && i === 0)
                      ? "flex"
                      : "none",
                }}
                key={datum.title}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 0 }}>
            <Box display="flex" gap={3.75} flexDirection="column">
              {items.map((datum, i) => (
                <LineClampedRichTypography
                  display={{
                    xs: "none",
                    md:
                      (checked && i === 1) || (!checked && i === 0)
                        ? "flex"
                        : "none",
                  }}
                  lineClamp={1}
                  order={1}
                  variant="h2Small"
                  typography={{ md: "h2" }}
                  key={datum.title}
                >
                  {datum.title}
                </LineClampedRichTypography>
              ))}
              <ToggleSwitch {...ToggleSwitchProps} order={{ xs: 3, md: 2 }} />
              {items.map((datum, i) => (
                <Key
                  data={data.data}
                  order={{ xs: 2, md: 3 }}
                  title="Key"
                  sx={{
                    display:
                      (checked && i === 1) || (!checked && i === 0)
                        ? "flex"
                        : "none",
                  }}
                  key={datum.title}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default Ecosystem;
