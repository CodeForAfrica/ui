import { Section } from "@commons-ui/core";
import { Box, Grid, Typography, Select, MenuItem, Chip } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { neutral } from "@/charterafrica/colors";
import SearchInput from "@/charterafrica/components/SearchInput";
import useFilterQuery, {
  ALL_TAG,
  DEFAULT_SORTING,
} from "@/charterafrica/components/useFilterQuery";

const ArticlesFilter = React.forwardRef((props, ref) => {
  const { tags, sorting } = props;
  const allTags = [ALL_TAG, ...tags];
  const [sort, setSelectedSorting] = useState(DEFAULT_SORTING);
  const [tag, setSelectedTags] = useState(ALL_TAG);
  const [q, setQ] = useState();
  const router = useRouter();
  const queryParams = useFilterQuery({ sort, q, tag });

  const handleTagChange = (t) => {
    setSelectedTags(t);
  };

  useEffect(() => {
    router.push({
      pathname: router.asPath.split("?")[0],
      query: queryParams,
    });

    // We don't want to listen to router changes here since we're the ones
    // updating them
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

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
              onChange={(e) => setQ(e.target.value)}
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
              onChange={(e) => setSelectedSorting(e.target.value)}
              sx={{
                height: "36px",
                minWidth: "200px",
              }}
              defaultValue={sort}
            >
              {sorting.map((c) => {
                return (
                  <MenuItem value={c} key={c}>
                    {c}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item container xs={12} sm={6} md={4} gap={1}>
            {allTags.map((s) => {
              return (
                <Chip
                  label={s}
                  onClick={() => handleTagChange(s)}
                  sx={{
                    backgroundColor: tag === s ? neutral[700] : neutral[50],
                    color: tag === s ? neutral[50] : neutral[900],
                  }}
                  key={s}
                />
              );
            })}
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default ArticlesFilter;
