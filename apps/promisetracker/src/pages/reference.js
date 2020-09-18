import React from "react";
import { Container, Typography, Box } from "@material-ui/core";
import TypographySetup from "@/promisetracker/components/TypographySetup";

export default function Reference() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Next.js theme setup
        </Typography>
        <TypographySetup />
      </Box>
    </Container>
  );
}
