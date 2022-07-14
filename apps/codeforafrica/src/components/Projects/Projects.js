/* eslint-env browser */
import { Section } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import useProjects from "./useProjects";

import ChoiceChip from "@/codeforafrica/components/ChoiceChip";
import ChoiceChipGroup from "@/codeforafrica/components/ChoiceChipGroup";
import NextPreviousPagination from "@/codeforafrica/components/NextPreviousPagination";
import ProjectCard from "@/codeforafrica/components/ProjectCard";
import SearchInput from "@/codeforafrica/components/SearchInput";

const ALL_CATEGORIES = "All";

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
  const { query } = useRouter();
  useEffect(() => {
    // if (router.isReady) {
    // const { query } = router;
    if (query) {
      const { page: initialPage, category: initialCategory } = query;
      if (initialPage) {
        setPage(Number.parseInt(initialPage, 10));
      }
      if (initialCategory) {
        setCategory(initialPage);
      }
    }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleChangeChoice = (_, value) => {
    const newValue = value || ALL_CATEGORIES;
    setCategory(newValue);
    setPage(1);
  };

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  const { data } = useProjects({ category, page });
  useEffect(() => {
    if (data) {
      const { results, pagination } = data;
      setCount(pagination.count);
      setProjects([...results]);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [data]);

  const hasProjects = projects?.length > 0;
  return (
    <>
      <Section
        sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 2.5, md: 8, lg: 9 }, ...sx }}
        ref={ref}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <SearchInput
            disabled={!hasProjects}
            placeholder="Search project"
            size="small"
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
            {categories?.map((tag) => (
              <ChoiceChip label={tag} value={tag} key={tag} />
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
        // key={selectedCategory}
        count={count}
        onChange={handleChangePage}
        page={page}
      />
    </>
  );
});

export default Projects;
