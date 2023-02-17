import { Section } from "@commons-ui/core";
import { Typography, Box, Divider } from "@mui/material";
import React from "react";

import { neutral, secondary } from "@/charterafrica/colors";

const GrantsFellowshipsHeader = React.forwardRef(
  function GrantsFellowshipsHeader(props, ref) {
    const { sx, title } = props;

    if (!title) {
      return null;
    }
    return (
      <Box
        sx={{
          backgroundColor: secondary[50],
          ...sx,
        }}
        ref={ref}
      >
        <Section
          sx={{
            px: { xs: 5, sm: 0 },
            paddingTop: 5,
          }}
        >
          <Typography
            variant="h3"
            color={neutral[900]}
            textAlign={{ xs: "center", sm: "left" }}
            textTransform="capitalize"
            mb={5}
          >
            {title}
          </Typography>
          <Divider
            sx={{
              width: "100%",
              height: "0px",
              color: neutral[200],
              border: "1px solid",
              borderColor: neutral[200],
            }}
          />
        </Section>
      </Box>
    );
  }
);

export default GrantsFellowshipsHeader;
