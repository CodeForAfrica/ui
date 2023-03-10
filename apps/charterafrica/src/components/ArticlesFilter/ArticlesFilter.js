import { Section } from "@commons-ui/core";
import { Box, Grid, Typography, Select, MenuItem, Chip } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import useTags from "./useTags";

import { neutral } from "@/charterafrica/colors";
import SearchInput from "@/charterafrica/components/SearchInput";
import useFilterQuery, {
  ALL_TAG,
  DEFAULT_SORTING,
} from "@/charterafrica/components/useFilterQuery";

const ArticlesFilter = React.forwardRef((props, ref) => {
  const { sorting } = props;
  const [allTags, setAllTags] = useState([ALL_TAG]);
  const [sort, setSelectedSorting] = useState(DEFAULT_SORTING);
  const [tag, setSelectedTags] = useState([ALL_TAG]);
  const [query, setQuery] = useState();
  const router = useRouter();
  const queryParams = useFilterQuery({ sort, query, tag });
  const pathname = router.asPath.split("?")[0];
  const slug = pathname.split("/").pop();

  const tags = useTags(slug);

  const handleTagChange = (tagSelection) => {
    if (tagSelection === ALL_TAG) {
      setSelectedTags([ALL_TAG]);
      return;
    }
    const filteredTags = tag.filter((singleTag) => singleTag !== ALL_TAG);
    if (tag.includes(tagSelection)) {
      setSelectedTags(tag.filter((singleTag) => singleTag !== tagSelection));
    } else {
      setSelectedTags([...filteredTags, tagSelection]);
    }
  };

  useEffect(() => {
    router.push({
      pathname,
      query: queryParams,
    });

    // We don't want to listen to router changes here since we're the ones
    // updating them
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  useEffect(() => {
    // on tags change, update allTags if new tags are added
    if (tags) {
      tags.forEach((element) => {
        if (!allTags.includes(element)) {
          setAllTags([...allTags, element]);
        }
      });
    }
  }, [tags, allTags]);

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
              onChange={(e) => setQuery(e.target.value)}
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
              value={sort ?? ""}
            >
              {sorting.map((sortItem) => {
                return (
                  <MenuItem value={sortItem} key={sortItem}>
                    {sortItem}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item container xs={12} sm={6} md={4} gap={1}>
            {allTags.map((singleTag) => {
              return (
                <Chip
                  label={singleTag}
                  onClick={() => handleTagChange(singleTag)}
                  sx={{
                    backgroundColor: tag.includes(singleTag)
                      ? neutral[700]
                      : neutral[50],
                    color: tag.includes(singleTag) ? neutral[50] : neutral[900],
                  }}
                  key={singleTag}
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
