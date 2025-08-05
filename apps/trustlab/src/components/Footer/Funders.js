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
          pb: 1,
          div: {
            paddingBottom: "8px",
          },
          justifyContent: { xs: "center", md: "left" },
          display: "flex",
        }}
        component="div"
        variant="h1"
      >
        <Box
          sx={{
            width: 170,
            position: "relative",
            borderBottom: "2px solid",
            borderColor: "text.secondary",
          }}
          component="div"
        >
          {title}
        </Box>
      </Typography>
      <Box>
        {funders.map(({ logo, link: { href }, id }) => {
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
                  filter: "grayscale(100%)",
                  height: "100px",
                  m: 0,
                  position: "relative",
                  width: "auto",
                  "&:hover": {
                    filter: "none",
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
