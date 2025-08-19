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
                  minHeight: "35px",
                  m: 0,
                  position: "relative",
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  mb: 2,
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
