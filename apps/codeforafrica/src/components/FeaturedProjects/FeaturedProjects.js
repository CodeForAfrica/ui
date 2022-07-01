import { Section } from "@commons-ui/core";
import React, { useMemo, useState } from "react";

import ChoiceChip from "@/codeforafrica/components/ChoiceChip";
import ChoiceChipGroup from "@/codeforafrica/components/ChoiceChipGroup";
import ProjectTileList from "@/codeforafrica/components/ProjectTileList";

const DEFAULT_CATEGORY = "Products";

const FeaturedProjects = React.forwardRef(function FeaturedProjects(
  props,
  ref
) {
  const { projects = [], slug, ...other } = props;
  const [categories] = useState(() => {
    return [...new Set(projects?.flatMap((a) => a.category || []))];
  });
  const [selectedCategory, setSelectedCateory] = useState(DEFAULT_CATEGORY);
  const handleChangeCategory = (_, value) => {
    const newCategory = value || DEFAULT_CATEGORY;
    setSelectedCateory(newCategory);
  };
  const filteredProjects = useMemo(() => {
    return projects.filter(
      (p) =>
        selectedCategory.localeCompare(p.category, undefined, {
          sensitivity: "accent",
        }) === 0
    );
  }, [projects, selectedCategory]);

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
      {categories?.length > 0 ? (
        <ChoiceChipGroup
          color="default"
          onChange={handleChangeCategory}
          value={selectedCategory}
        >
          {categories.map((tag) => (
            <ChoiceChip label={tag} value={tag} key={tag} />
          ))}
        </ChoiceChipGroup>
      ) : null}
      <ProjectTileList projects={filteredProjects} />
    </Section>
  );
});

export default FeaturedProjects;
