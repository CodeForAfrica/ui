import { Section } from "@commons-ui/core";
import { Typography, Box, Divider } from "@mui/material";
import React from "react";

import { secondary } from "@/charterafrica/colors";

const GrantsFellowshipsHeader = React.forwardRef(
  function GrantsFellowshipsHeader(props, ref) {
    const { sx, title } = props;

    if (!title) {
      return null;
    }
    return (
      <Box
        ref={ref}
        sx={{
          backgroundColor: secondary[50],
          ...sx,
        }}
      >
        <Section
          sx={{
            px: { xs: 5, sm: 0 },
            paddingTop: 5,
          }}
        >
          <Typography
            color="neutral.dark"
            mb={5}
            textAlign={{ xs: "center", sm: "left" }}
            textTransform="capitalize"
            variant="h3"
          >
            {title}
          </Typography>
          <Divider
            sx={{
              border: "1px solid",
              borderColor: "neutral.light",
              color: "neutral.light",
              height: "0px",
              width: "100%",
            }}
          />
        </Section>
      </Box>
    );
  }
);

export default GrantsFellowshipsHeader;
