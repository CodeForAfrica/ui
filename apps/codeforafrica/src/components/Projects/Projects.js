import { Section } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";

import NextPreviousPagination from "@/codeforafrica/components/NextPreviousPagination";
import ProjectCard from "@/codeforafrica/components/ProjectCard";

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
  const [page, setPage] = useState(pageProp);
  const handlePageChange = (_, value) => {
    setPage(value);
  };
  const [pagination, setPagination] = useState(() => {
    return computePagination(projects, page, pageSize);
  });
  useEffect(() => {
    setPagination(computePagination(projects, page, pageSize));
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }, [projects, page, pageSize]);

  return (
    <ProjectsRoot ref={ref}>
      <Section sx={{ px: { xs: 2.5, sm: 0 }, ...sx }}>
        <Stack direction="column" spacing={{ xs: 5, md: 7.5 }}>
          {pagination.projects?.map((project) => (
            <ProjectCard {...project} key={project.slug} />
          ))}
        </Stack>
      </Section>
      <NextPreviousPagination
        count={pagination.count}
        onChange={handlePageChange}
      />
    </ProjectsRoot>
  );
}

export default Projects;
