import { Section } from "@commons-ui/core";
import React, { useMemo, useState } from "react";

import ChoiceChip from "@/codeforafrica/components/ChoiceChip";
import ChoiceChipGroup from "@/codeforafrica/components/ChoiceChipGroup";
import ProjectTileList from "@/codeforafrica/components/ProjectTileList";
import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

const DEFAULT_TAG = "Products";

const FeaturedProjects = React.forwardRef(function FeaturedProjects(
  props,
  ref
) {
  const { tags = [], projects = [], slug, ...other } = props;
  const [selectedTag, setSelectedTag] = useState(DEFAULT_TAG);
  const handleChangeCategory = (_, value) => {
    const newTag = value || DEFAULT_TAG;
    setSelectedTag(newTag);
  };
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => equalsIgnoreCase(selectedTag, p.tag));
  }, [projects, selectedTag]);

  if (!projects?.length) {
    return null;
  }
  return (
    <Section
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "18px",
        px: { xs: 2.5, sm: 0 },
        py: { xs: 2.5, sm: 4.6, md: "66.8px" },
      }}
      {...other}
      ref={ref}
    >
      {tags?.length > 0 ? (
        <ChoiceChipGroup
          color="default"
          onChange={handleChangeCategory}
          value={selectedTag}
        >
          {tags.map((tag) => (
            <ChoiceChip label={tag} value={tag} key={tag} />
          ))}
        </ChoiceChipGroup>
      ) : null}
      <ProjectTileList projects={filteredProjects} />
    </Section>
  );
});

export default FeaturedProjects;
