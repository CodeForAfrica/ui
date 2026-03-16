import { Section } from "@commons-ui/core";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Typography } from "@mui/material";
import React, { forwardRef } from "react";

const HighlightList = forwardRef(function HighlightList(props, ref) {
  const { title, items } = props;

  if (!items?.length) {
    return null;
  }

  return (
    <Box sx={{ backgroundColor: "common.white" }} ref={ref}>
      <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
        <Typography
          sx={{
            mb: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: "Inter",
            fontSize: "20px",
            fontWeight: 700,
            lineHeight: "32px",
            color: "#252B37",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {items.map((item) => (
            <Box
              key={item.id}
              sx={{
                position: "relative",
                width: { xs: "100%", sm: 340, lg: 380 },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  backgroundColor: "#1020E1",
                }}
              />
              <Box
                sx={{
                  backgroundColor: "#F0F0F5",
                  borderRadius: "0 10px 10px 0",
                  px: 2.5,
                  py: 2.5,
                  height: "100%",
                }}
              >
                <LexicalRichText
                  elements={item.content}
                  TypographyProps={{
                    sx: {
                      color: "#252B37",
                      fontSize: "16px",
                      lineHeight: "24px",
                    },
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Section>
    </Box>
  );
});

export default HighlightList;
