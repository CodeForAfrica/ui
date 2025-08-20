import { Section } from "@commons-ui/core";
import { Box, IconButton, SvgIcon, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

import ChevronRightDoubleIcon from "@/trustlab/assets/icons/chevron-right-double.svg";
import SpotlightCard from "@/trustlab/components/SpotlightCard";

const Spotlight = React.forwardRef(function Spotlight(
  { items = [], title },
  ref,
) {
  const scrollRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  const checkScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      setShowPrev(container.scrollLeft > 0);
      setShowNext(
        container.scrollLeft < container.scrollWidth - container.clientWidth,
      );
    }
  };

  useEffect(() => {
    checkScrollButtons();
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const cardWidth = 350;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleNext = () => {
    scroll("right");
  };

  const handlePrev = () => {
    scroll("left");
  };

  return (
    <Box ref={ref} sx={{ background: "#7C7C7C" }}>
      <Section sx={{ py: 7.5, px: { xs: 2.5, md: 0 } }}>
        <Typography variant="display4" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Box
          sx={{
            width: "100%",
            position: "relative",
          }}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={0}
        >
          <IconButton
            aria-label="Next"
            onClick={handlePrev}
            disabled={!showPrev}
            sx={{
              borderRadius: "50%",
              width: 50,
              height: 50,
              display: showPrev ? "block" : "none",
              position: "absolute",
              left: 0,
              zIndex: 10,
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
          <Box
            ref={scrollRef}
            onScroll={checkScrollButtons}
            display="flex"
            gap={2}
            flex={1}
            sx={{
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {items.map((cardProps) => (
              <SpotlightCard key={cardProps.title} {...cardProps} />
            ))}
          </Box>
          <IconButton
            aria-label="Next"
            onClick={handleNext}
            disabled={!showNext}
            sx={{
              borderRadius: "50%",
              width: 50,
              height: 50,
              display: showNext ? "block" : "none",
              color: "common.white",
              position: "absolute",
              right: 0,
              zIndex: 10,
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
