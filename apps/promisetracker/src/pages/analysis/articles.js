import React from "react";
import { Container, Box } from "@material-ui/core";
import Page from "@/promisetracker/components/Page";

export default function Articles() {
  return (
    <Page>
      <Container maxWidth="sm">
        <Box my={4}>Articles Page</Box>
      </Container>
    </Page>
  );
}
