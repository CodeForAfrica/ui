import { RichTypography } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import React from "react";

import Button from "./ProjectDescriptionButton";

const ProjectDescription = React.forwardRef(function ProjectDescription(
  props,
  ref
) {
  const { children, links, sx, title, ...other } = props;

  if (!title?.length) {
    return null;
  }
  return (
    <Stack
      spacing={{ xs: 2.5, md: 5 }}
      sx={{ width: { xs: "100%", md: "663px" } }}
      {...other}
      ref={ref}
    >
      <RichTypography variant="h5">{title}</RichTypography>
      <RichTypography variant="body1" sx={{ typography: { md: "body2" } }}>
        {children}
      </RichTypography>
      {links?.length > 0 ? (
        <Stack direction="row" spacing={2.5}>
          {links.map(({ content, href, slug }) => (
            <Button key={slug} href={href} slug={slug}>
              {content}
            </Button>
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
});

export default ProjectDescription;
