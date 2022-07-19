import { Section } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import useProjects from "./useProjects";

import FilterBar from "@/codeforafrica/components/FilterBar";
import NextPreviousPagination from "@/codeforafrica/components/NextPreviousPagination";
import ProjectCard from "@/codeforafrica/components/ProjectCard";
import useFilterQuery, {
  ALL_TAG,
} from "@/codeforafrica/components/useFilterQuery";
import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

const Projects = React.forwardRef(function Projects(
  {
    tags,
    projects: {
      pagination: { count: countProp, page: pageProp = 1 },
      results: resultsProp,
    },
    sx,
  },
  ref
) {
  const [count, setCount] = useState(countProp);
  const [page, setPage] = useState(pageProp);
  const [projects, setProjects] = useState(resultsProp);
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

  const { data } = useProjects({ page, q, tag });
  useEffect(() => {
    if (data) {
      const { results, pagination } = data;
      setCount(pagination.count);
      setProjects([...results]);
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
        sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 2.5, md: 8, lg: 9 }, ...sx }}
      >
        <FilterBar
          allTag={ALL_TAG}
          onChangeQ={handleChangeQ}
          onChangeTag={handleChangeTag}
          q={q}
          tag={tag}
          tags={tags}
          SearchInputProps={{
            placeholder: "Search projects",
          }}
        />
        {projects?.length > 0 ? (
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
