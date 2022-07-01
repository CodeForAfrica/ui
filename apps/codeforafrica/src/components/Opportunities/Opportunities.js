import { Section } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React, { useEffect, useMemo, useRef, useState } from "react";

import ChoiceChip from "@/codeforafrica/components/ChoiceChip";
import ChoiceChipGroup from "@/codeforafrica/components/ChoiceChipGroup";
import NextPreviousPagination from "@/codeforafrica/components/NextPreviousPagination";
import OpportunityCardList from "@/codeforafrica/components/OpportunityCardList";
import SearchInput from "@/codeforafrica/components/SearchInput";

const ALL_TAGS = "All";

const OpportuniesRoot = styled("div")({
  scrollMarginTop: 32,
});

const computePagination = (all, page, pageSize) => {
  const count = Math.ceil(all.length / pageSize);
  const opportunities = all.slice((page - 1) * pageSize, page * pageSize);
  return { count, opportunities };
};

function Opportunies(props) {
  const { opportunities = [], page: pageProp = 1, pageSize = 4 } = props;
  const ref = useRef();
  const [tags] = useState(() => {
    return [ALL_TAGS, ...new Set(opportunities?.flatMap((a) => a.tags || []))];
  });
  const [selectedTag, setSelectedTag] = useState(ALL_TAGS);
  const [page, setPage] = useState(pageProp);
  const [pagination, setPagination] = useState(() => {
    return computePagination(opportunities, page, pageSize);
  });
  const filteredOpportunies = useMemo(() => {
    if (selectedTag === ALL_TAGS) {
      return opportunities;
    }
    return opportunities.filter((p) =>
      p.tags?.some(
        (tag) =>
          tag.localeCompare(selectedTag, undefined, {
            sensitivity: "accent",
          }) === 0
      )
    );
  }, [opportunities, selectedTag]);
  const handleChangeCategory = (_, value) => {
    // default to ALL_TAGS if no value is provided e.g. when deselecting
    // a chip
    const newTag = value || ALL_TAGS;
    setSelectedTag(newTag);
    // Category change should reset page to 1
    setPage(1);
  };
  const handlePageChange = (_, value) => {
    setPage(value);
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  };

  useEffect(() => {
    setPagination(computePagination(filteredOpportunies, page, pageSize));
  }, [filteredOpportunies, page, pageSize]);

  const hasOpportunities = opportunities?.length > 0;
  return (
    <OpportuniesRoot ref={ref}>
      <Section
        sx={{
          maxWidth: {
            sm: "648px",
            md: "912px",
          },
          px: { xs: 2.5, sm: 0 },
          py: { xs: 2.5, md: 8, lg: 9 },
        }}
      >
        {/* There will always be at least ALL tag */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <SearchInput
            disabled={!hasOpportunities}
            placeholder="Search opportunities"
            size="small"
            sx={{
              mb: { xs: 2.5, sm: 0 },
              minWidth: { xs: "auto", sm: "200px" },
              ml: { xs: 0, sm: 2.5 },
              order: { xs: 0, sm: 1 },
              width: { xs: "auto", sm: "200px" },
            }}
          />
          <ChoiceChipGroup
            color="default"
            onChange={handleChangeCategory}
            value={selectedTag}
            sx={{
              mb: { xs: 5, md: 10 },
              order: { xs: 1, sm: 0 },
            }}
          >
            {tags.map((tag) => (
              <ChoiceChip label={tag} value={tag} key={tag} />
            ))}
          </ChoiceChipGroup>
        </Stack>
        <OpportunityCardList opportunities={pagination.opportunities} />
      </Section>
      <NextPreviousPagination
        key={selectedTag}
        count={pagination.count}
        onChange={handlePageChange}
      />
    </OpportuniesRoot>
  );
}

export default Opportunies;
