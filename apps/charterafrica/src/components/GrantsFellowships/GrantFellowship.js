import { Section } from "@commons-ui/core";
import { Typography, Box, Container, Divider } from "@mui/material";
import React from "react";

import Grants from "../Grants";

import { neutral, secondary } from "@/charterafrica/colors";

const GrantsFellowships = React.forwardRef(function GrantsFellowships(
  props,
  ref
) {
  const { sx, grants } = props;
  return (
    <Box
      sx={{
        backgroundColor: secondary[50],
        ...sx,
      }}
      ref={ref}
    >
      <Container
        sx={{
          textAlign: "center",
          backgroundColor: secondary[200],
          padding: "20px 10px 20px 10px",
        }}
      >
        <Typography variant="p1SemiBold" color="#000000">
          A list of all Chart Africa grants, fellowships and events.
        </Typography>
      </Container>
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: "74.5px" } }}>
        <Typography variant="h3" color={neutral[900]}>
          Grants and Fellowships
        </Typography>
        <Divider
          sx={{
            width: "100%",
            height: "0px",
            color: neutral[200],
            border: "1px solid",
            borderColor: neutral[200],
            marginTop: "40px",
            marginBottom: "40px",
          }}
        />
        <Grants grants={grants} />
      </Section>
    </Box>
  );
});

export default GrantsFellowships;
