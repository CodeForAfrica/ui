import { Section } from "@commons-ui/core";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Typography, Grid } from "@mui/material";
import React, { forwardRef } from "react";

import CourseCard from "./CourseCard";

const CourseList = forwardRef(
  ({ title, description, courses, ...props }, ref) => {
    return (
      <Section ref={ref} sx={{ py: 4, px: { xs: 2.5, md: 0 } }} {...props}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          gap={{ xs: 2.5, md: 8 }}
          mb={3.75}
          sx={{
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Typography sx={{ whiteSpace: "nowrap" }} variant="h1">
            {title}
          </Typography>
          <LexicalRichText
            elements={description}
            TypographyProps={{
              gutterBottom: true,
              variant: "p2",
              sx: {
                mb: 0,
              },
            }}
          />
        </Box>
        <Grid spacing={2.5} container>
          {courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={4} md={4}>
              <CourseCard {...course} />
            </Grid>
          ))}
        </Grid>
      </Section>
    );
  },
);

export default CourseList;
