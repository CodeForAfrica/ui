import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import Copyright from '@/promisetracker/components/Copyright';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js Setup
        </Typography>
        <Copyright />
      </Box>
    </Container>
  );
}
