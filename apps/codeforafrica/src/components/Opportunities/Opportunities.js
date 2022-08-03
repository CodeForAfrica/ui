import { Section } from "@commons-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import useOpportunities from "./useOpportunities";

import FilterBar from "@/codeforafrica/components/FilterBar";
import NextPreviousPagination from "@/codeforafrica/components/NextPreviousPagination";
import OpportunityCardList from "@/codeforafrica/components/OpportunityCardList";
import useFilterQuery, {
  ALL_TAG,
} from "@/codeforafrica/components/useFilterQuery";
import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

const Opportunities = React.forwardRef(function Opportunities(
  {
    tags,
    opportunities: {
      pagination: { count: countProp, page: pageProp = 1 },
      results: resultsProp,
    },
    sx,
  },
  ref
) {
  const [count, setCount] = useState(countProp);
  const [page, setPage] = useState(pageProp);
  const [opportunities, setOpportunities] = useState(resultsProp);
  const [q, setQ] = useState();
  const [tag, setTag] = useState(ALL_TAG);
  const queryParams = useFilterQuery({ page, q, tag });
  const router = useRouter();

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  const handleChangeQ = (_, value) => {
    setQ(value || undefined);
  };

  const handleChangeTag = (_, value) => {
    const newValue =
      (value && tags.find((t) => equalsIgnoreCase(value, t))) || ALL_TAG;
    setTag(newValue);
    setPage(1);
  };

  const { data } = useOpportunities({ page, q, tag });
  useEffect(() => {
    if (data) {
      const { results, pagination } = data;
      setCount(pagination.count);
      setOpportunities([...results]);
    }
  }, [data]);

  useEffect(() => {
    router.push(queryParams, undefined, {
      scroll: true,
      shallow: true,
    });
    // We don't want to listen to router changes here since we're the ones
    // updating them
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return (
    <div ref={ref}>
      <Section
        sx={{
          maxWidth: {
            sm: "648px",
            md: "912px",
          },
          px: { xs: 2.5, sm: 0 },
          py: { xs: 2.5, md: 8, lg: 9 },
          ...sx,
        }}
      >
        <FilterBar
          onChangeQ={handleChangeQ}
          onChangeTag={handleChangeTag}
          q={q}
          tag={tag}
          tags={tags}
          SearchInputProps={{
            placeholder: "Search opportunities",
          }}
        />
        <OpportunityCardList
          opportunities={opportunities}
          sx={{ mt: { xs: 5, md: 10 } }}
        />
      </Section>
      <NextPreviousPagination
        count={count}
        onChange={handleChangePage}
        page={page}
      />
    </div>
  );
});

export default Opportunities;
