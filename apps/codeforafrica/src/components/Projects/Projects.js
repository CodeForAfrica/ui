/* eslint-env browser */
import { Section } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import useProjects, { ALL_CATEGORIES } from "./useProjects";

import ChoiceChip from "@/codeforafrica/components/ChoiceChip";
import ChoiceChipGroup from "@/codeforafrica/components/ChoiceChipGroup";
import NextPreviousPagination from "@/codeforafrica/components/NextPreviousPagination";
import ProjectCard from "@/codeforafrica/components/ProjectCard";
import SearchInput from "@/codeforafrica/components/SearchInput";
import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

const Projects = React.forwardRef(function Projects(
  {
    categories,
    projects: {
      pagination: { count: countProp, page: pageProp = 1 },
      results: resultsProp,
    },
    sx,
  },
  ref
) {
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [count, setCount] = useState(countProp);
  const [page, setPage] = useState(pageProp);
  const [projects, setProjects] = useState(resultsProp);
  const [q, setQ] = useState();
  const [search, setSearch] = useState();
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      const {
        category: initialCategory,
        page: initialPage,
        q: initialQ,
      } = router.query;
      if (initialCategory) {
        setCategory(initialCategory);
      }
      if (initialPage) {
        setPage(Number.parseInt(initialPage, 10));
      }
      if (initialQ) {
        setQ(initialQ);
      }
    }
    // We're only interested in initial isReady and not any subsequent
    // router.query changes e.g. due to pagination
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const handleChangeChoice = (_, value) => {
    const newValue = value || ALL_CATEGORIES;
    setCategory(newValue);
    setPage(1);
  };

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  const handleChangeQ = (_, value) => {
    setQ(value || undefined);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClickSearch = (e) => {
    handleChangeQ(e, search);
  };

  const handleKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      handleChangeQ(e, e.target.value);
    }
  };

  useEffect(() => {
    const newQuery = {};
    if (!equalsIgnoreCase(category, ALL_CATEGORIES)) {
      newQuery.category = category;
    }
    if (page > 1) {
      newQuery.page = page;
    }
    if (q) {
      newQuery.q = q;
    }
    router.push(
      {
        query: newQuery,
      },
      undefined,
      {
        scroll: true,
        shallow: true,
      }
    );
    // We don't want to listen to router changes here since we're the ones
    // updating them
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page, q]);

  const { data } = useProjects({ category, page, q });
  useEffect(() => {
    if (data) {
      const { results, pagination } = data;
      setCount(pagination.count);
      setProjects([...results]);
    }
  }, [data]);

  const hasProjects = projects?.length > 0;
  return (
    <div ref={ref}>
      <Section
        sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 2.5, md: 8, lg: 9 }, ...sx }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <SearchInput
            disabled={!hasProjects}
            onChange={handleChangeSearch}
            onClick={handleClickSearch}
            onKeyPress={handleKeyPressSearch}
            placeholder="Search project"
            size="small"
            defaultValue={q}
            sx={{
              mb: { xs: 2.5, sm: 0 },
              minWidth: { xs: "auto", sm: "200px" },
              ml: { xs: 0, sm: 2.5 },
              order: { xs: 0, sm: 1 },
              width: { xs: "auto", sm: "200px" },
            }}
          />
          {/* There will always be at least ALL category */}
          <ChoiceChipGroup
            color="default"
            onChange={handleChangeChoice}
            value={category}
            sx={{
              order: { xs: 1, sm: 0 },
            }}
          >
            {categories?.map((c) => (
              <ChoiceChip label={c} value={c} key={c} />
            ))}
          </ChoiceChipGroup>
        </Stack>
        {hasProjects ? (
          <Stack direction="column" spacing={{ xs: 5, md: 7.5 }}>
            {projects.map((project) => (
              <ProjectCard {...project} key={project.slug} />
            ))}
          </Stack>
        ) : null}
      </Section>
      <NextPreviousPagination
        count={count}
        onChange={handleChangePage}
        page={page}
      />
    </div>
  );
});

export default Projects;
