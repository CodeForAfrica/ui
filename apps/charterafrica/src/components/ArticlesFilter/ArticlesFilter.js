import { Section } from "@commons-ui/core";
import { Box, Grid, Typography, Select, MenuItem, Chip } from "@mui/material";
import React, { useState } from "react";

import { neutral } from "@/charterafrica/colors";
import SearchInput from "@/charterafrica/components/SearchInput";

const ArticlesFilter = React.forwardRef((props, ref) => {
  const { tags, categories } = props;
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedTags, setSelectedTags] = useState(tags[0]);

  return (
    <Box bgcolor="#fff" ref={ref}>
      <Section
        sx={{
          py: 2.5,
        }}
      >
        <Grid container gap={5}>
          <Grid item>
            <Typography variant="h5" color={neutral[800]}>
              News
            </Typography>
          </Grid>
          <Grid item>
            <SearchInput
              placeholder="Search News"
              sx={{
                backgroundColor: "#fff",
                height: "36px",
                width: "200px",
              }}
            />
          </Grid>
          <Grid item>
            <Select
              inputProps={{ "aria-label": "Without label" }}
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{
                height: "36px",
                minWidth: "200px",
              }}
              defaultValue={selectedCategory}
            >
              {categories.map((category) => {
                return (
                  <MenuItem value={category} key={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item container xs={12} sm={6} md={4} gap={1}>
            {tags.map((tag) => {
              return (
                <Chip
                  label={tag}
                  onClick={() => setSelectedTags(tag)}
                  sx={{
                    backgroundColor:
                      selectedTags === tag ? neutral[700] : neutral[50],
                    color: selectedTags === tag ? neutral[50] : neutral[900],
                  }}
                  key={tag}
                />
              );
            })}
            {/* <Chip
              label="All"
              sx={{
                backgroundColor: neutral[700],
                color: neutral[50],
              }}
            /> */}
            {/* <Chip
              label="Africa"
              sx={{
                backgroundColor: neutral[50],
                color: neutral[900],
              }}
            /> */}
            {/* <Chip
              label="Kenya"
              sx={{
                backgroundColor: neutral[50],
                color: neutral[900],
              }}
            /> */}
            {/* <Chip
              label="Nigeria"
              sx={{
                backgroundColor: neutral[50],
                color: neutral[900],
              }}
            /> */}
            {/* <Chip
              label="Tanzania"
              sx={{
                backgroundColor: neutral[50],
                color: neutral[900],
              }}
            /> */}
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default ArticlesFilter;
