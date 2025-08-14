import { Section } from "@commons-ui/core";
import {
  Box,
  IconButton,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

import ChevronRightDoubleIcon from "@/trustlab/assets/icons/chevron-right-double.svg";
import SpotlightCard from "@/trustlab/components/SpotlightCard";

const Spotlight = React.forwardRef(function Spotlight(
  { items = [], title },
  ref,
) {
  const [section, setSection] = useState(0);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const cardsPerSection = isSmallScreen ? 1 : 3;
  const maxSection = Math.ceil(items.length / cardsPerSection) - 1;

  const handleNext = () => {
    if (section < maxSection) {
      setSection(section + 1);
    }
  };

  const handlePrev = () => {
    if (section > 0) {
      setSection(section - 1);
    }
  };

  const startIdx = section * cardsPerSection;
  const visibleCards = items.slice(startIdx, startIdx + cardsPerSection);

  return (
    <Box ref={ref} sx={{ background: "#7C7C7C" }}>
      <Section sx={{ py: 7.5, px: { xs: 2.5, md: 0 } }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Box
          ref={ref}
          sx={{
            width: "100%",
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <IconButton
            aria-label="Next"
            onClick={handlePrev}
            disabled={section === 0}
            sx={{
              borderRadius: "50%",
              width: 50,
              height: 50,
              display: section > 0 ? "block" : "none",
            }}
          >
            <SvgIcon
              sx={{
                fill: "none",
                color: "common.white",
                fontSize: "50px",
                transform: "rotate(180deg)",
              }}
              viewBox="0 0 50 50"
              component={ChevronRightDoubleIcon}
            />
          </IconButton>
          <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
            {visibleCards.map((cardProps) => (
              <SpotlightCard key={cardProps.title} {...cardProps} />
            ))}
          </Box>
          <IconButton
            aria-label="Next"
            onClick={handleNext}
            disabled={section >= maxSection}
            sx={{
              borderRadius: "50%",
              width: 50,
              height: 50,
              display: section < maxSection ? "block" : "none",
              color: "common.white",
            }}
          >
            <SvgIcon
              sx={{
                fill: "none",
                color: "common.white",
                fontSize: "50px",
              }}
              viewBox="0 0 50 50"
              component={ChevronRightDoubleIcon}
            />
          </IconButton>
        </Box>
      </Section>
    </Box>
  );
});

export default Spotlight;
