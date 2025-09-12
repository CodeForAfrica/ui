import { Figure, Link } from "@commons-ui/next";
import { Box, Typography } from "@mui/material";
import React, { forwardRef } from "react";

const Funders = forwardRef((props, ref) => {
  const { title, sx, funders } = props;
  return (
    <Box sx={sx} ref={ref}>
      <Typography
        sx={{
          mb: 2.5,
          div: {
            paddingBottom: "8px",
          },
          borderBottom: "2px solid",
          borderColor: "text.secondary",
          lineHeight: "50px",
        }}
        component="div"
        variant="h1"
      >
        {title}
      </Typography>
      <Box>
        {funders.map(({ logo, link: { href }, id, name }) => {
          const { alt } = logo;
          const Wrapper = href?.length ? Link : React.Fragment;
          const wrapperProps = href?.length ? { href } : undefined;

          return (
            <Wrapper key={id} {...wrapperProps}>
              <Figure
                ImageProps={{
                  alt,
                  src: logo.url,
                }}
                sx={{
                  /*
                  This is a hack for giz logo which has a dim background
                  and needs to be fully visible in dark mode. We could have used invert(1)
                  but that would have affected the other logos as well.
                  So we are using a specific filter for giz logo only.
                  */
                  filter:
                    name?.toLowerCase() === "giz"
                      ? "grayscale(100%) brightness(0) invert(1)"
                      : "grayscale(100%)",
                  minHeight: "35px",
                  m: 0,
                  position: "relative",
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  mb: 2,
                  transition: "filter 0.3s ease",
                  "&:hover": {
                    filter: "grayscale(0%) brightness(1) invert(0)",
                  },
                }}
              />
            </Wrapper>
          );
        })}
      </Box>
    </Box>
  );
});

export default Funders;
