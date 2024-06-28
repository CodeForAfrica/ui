import { Figure, RichTypography } from "@commons-ui/next";
import { Card, CardContent, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

import RichText from "@/roboshield/components/RichText";
import { Statistics } from "./Statistics";

const StatisticCardRoot = styled(Card, {
  slot: "Root",
})(({ theme: { breakpoints } }) => ({
  backgroundColor: "inherit",
  boxShadow: "none",
  width: "100%",
  [breakpoints.up("md")]: {
    width: "326px",
  },
  [breakpoints.up("lg")]: {
    width: "332px",
  },
}));
export default function StatisticCard(props: Statistics) {
  const { icon, name, value, description } = props;

  return (
    <StatisticCardRoot>
      <CardContent
        sx={{
          padding: 0,
          "&:last-child": {
            padding: 0,
          },
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid",
            borderColor: "primary.main",
            display: "flex",
            pb: "12px",
          }}
        >
          <Figure
            ImageProps={{ alt: "label", src: icon }}
            sx={{ height: "32px", width: "32px" }}
          />
          <RichTypography
            variant="h5"
            sx={{
              display: "inline",
              color: "primary.main",
              ml: "0.93rem",
            }}
          >
            {name}
          </RichTypography>
        </Box>

        <RichTypography
          variant="display1"
          sx={{
            borderBottom: "solid 1px",
            borderColor: "secondary.main",
            color: "primary.main",
            display: "block",
            py: "10px",
          }}
        >
          {value}
        </RichTypography>
        <RichText
          elements={description}
          sx={{
            display: "block",
            pt: "10px",
          }}
          typographyProps={{
            variant: "body3",
          }}
        />
      </CardContent>
    </StatisticCardRoot>
  );
}
