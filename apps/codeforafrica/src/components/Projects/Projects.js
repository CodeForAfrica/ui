import { Section } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React, { useEffect, useMemo, useRef, useState } from "react";

import ChoiceChip from "@/codeforafrica/components/ChoiceChip";
import ChoiceChipGroup from "@/codeforafrica/components/ChoiceChipGroup";
import NextPreviousPagination from "@/codeforafrica/components/NextPreviousPagination";
import ProjectCard from "@/codeforafrica/components/ProjectCard";
import SearchInput from "@/codeforafrica/components/SearchInput";

const ALL_CATEGORIES = "All";

const ProjectsRoot = styled("div")({
  scrollMarginTop: 32,
});

const computePagination = (allProjects, page, pageSize) => {
  const count = Math.ceil(allProjects.length / pageSize);
  const projects = allProjects.slice((page - 1) * pageSize, page * pageSize);
  return { count, projects };
};

function Projects(props) {
  const { projects = [], page: pageProp = 1, pageSize = 5, sx } = props;
  const ref = useRef();
  const [categories] = useState(() => {
    return [
      ALL_CATEGORIES,
      ...new Set(projects?.flatMap((a) => a.category || [])),
    ];
  });
  const [selectedCategory, setSelectedCateory] = useState(ALL_CATEGORIES);
  const [page, setPage] = useState(pageProp);
  const [pagination, setPagination] = useState(() => {
    return computePagination(projects, page, pageSize);
  });
  const filteredProjects = useMemo(() => {
    if (selectedCategory === ALL_CATEGORIES) {
      return projects;
    }
    return projects.filter(
      (p) =>
        selectedCategory.localeCompare(p.category, undefined, {
          sensitivity: "accent",
        }) === 0
    );
  }, [projects, selectedCategory]);
  const handleChangeCategory = (_, value) => {
    // default to ALL_CATEGORIES if no value is provided e.g. when deselecting
    // a chip
    const newCategory = value || ALL_CATEGORIES;
    setSelectedCateory(newCategory);
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
    setPagination(computePagination(filteredProjects, page, pageSize));
  }, [filteredProjects, page, pageSize]);

  const hasProjects = pagination.projects?.length > 0;
  return (
    <ProjectsRoot ref={ref}>
      <Section
        sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 2.5, md: 8, lg: 9 }, ...sx }}
      >
        {/* There will always be at least ALL category */}
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
          <ChoiceChipGroup
            color="default"
            onChange={handleChangeCategory}
            value={selectedCategory}
            sx={{
              order: { xs: 1, sm: 0 },
            }}
          >
            {categories.map((tag) => (
              <ChoiceChip label={tag} value={tag} key={tag} />
            ))}
          </ChoiceChipGroup>
        </Stack>
        {hasProjects ? (
          <Stack direction="column" spacing={{ xs: 5, md: 7.5 }}>
            {pagination.projects.map((project) => (
              <ProjectCard {...project} key={project.slug} />
            ))}
          </Stack>
        ) : null}
      </Section>
      <NextPreviousPagination
        key={selectedCategory}
        count={pagination.count}
        onChange={handlePageChange}
      />
    </ProjectsRoot>
  );
}

export default Projects;
