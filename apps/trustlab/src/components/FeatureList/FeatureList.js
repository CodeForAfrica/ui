import { Section } from "@commons-ui/core";
import { Box, Typography } from "@mui/material";
import React, { forwardRef } from "react";

const FeatureList = forwardRef(function FeatureList(props, ref) {
  const { title, description, items } = props;

  if (!items?.length) {
    return null;
  }

  return (
    <Box sx={{ backgroundColor: "common.white" }} ref={ref}>
      <Section sx={{ py: 2, px: { xs: 2.5, md: 0 } }}>
        {title ? (
          <Typography
            sx={{
              mb: description ? 1 : 3,
              width: "100%",
              fontFamily: "Inter",
              fontSize: "26px",
              fontWeight: 700,
              lineHeight: "29px",
              color: "#252B37",
            }}
          >
            {title}
          </Typography>
        ) : null}
        {description ? (
          <Typography
            sx={{
              mb: 3,
              width: "50%",
              fontFamily: "Inter",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
              color: "#252B37",
            }}
          >
            {description}
          </Typography>
        ) : null}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {items.slice(0, 4).map((item) => (
            <Box
              key={item.id ?? item.title}
              sx={{
                flex: {
                  xs: "0 0 100%",
                  sm: "0 0 calc(50% - 8px)",
                  md: "1 1 0",
                },
                minWidth: 0,
                backgroundColor: "#F0F0F5",
                border: "1px solid #E7E9FF",
                borderRadius: "10px",
                p: 2.5,
              }}
            >
              <Typography
                sx={{
                  mb: 1,
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  color: "#252B37",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "22px",
                  color: "#252B37",
                }}
              >
                {item.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Section>
    </Box>
  );
});

export default FeatureList;
