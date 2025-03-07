import { Section } from "@commons-ui/core";
import { Carousel } from "@hurumap/core";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useRef } from "react";

import Card from "@/hurumap/next/Card";

const responsive = {
  desktop: {
    items: 4,
    partialVisibilityGutter: 30,
  },
  tablet: {
    items: 2,
    partialVisibilityGutter: 30,
  },
};

function AboutTeam({ title, members: membersProp }) {
  const membersCount = membersProp?.length ?? 0;
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const ref = useRef();

  if (!membersProp?.length) {
    return null;
  }
  const scrollToTeam = () => {
    if (ref.current && !isMdUp) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        py: { xs: 5, md: 10 },
        px: 0,
        scrollMarginTop: 40,
        scrollBehavior: "auto",
      }}
      ref={ref}
    >
      <Section>
        {title && (
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              paddingBottom: { xs: 5, md: 10 },
            }}
          >
            {title}
          </Typography>
        )}
        <Carousel
          afterChange={scrollToTeam}
          responsive={responsive}
          DotListProps={{
            sx: {
              display: {
                xs: membersCount > 2 ? "flex" : "none",
                md: membersCount > 4 ? "flex" : "none",
              },
              "& button": {
                borderColor: "#000",
                height: theme.typography.pxToRem(16),
                marginRight: theme.typography.pxToRem(12),
                width: theme.typography.pxToRem(16),
              },
              "& .react-multi-carousel-dot--active button": {
                borderColor: "#000",
              },
            },
          }}
        >
          {membersProp.map((member) => (
            <Card
              key={member.title}
              {...member}
              mediaProps={{ square: true }}
            />
          ))}
        </Carousel>
      </Section>
    </Box>
  );
}

export default AboutTeam;
