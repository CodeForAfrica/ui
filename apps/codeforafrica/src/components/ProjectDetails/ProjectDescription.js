import { RichTypography } from "@commons-ui/next";
import { Stack } from "@mui/material";
import React from "react";

import Button from "./ProjectDescriptionButton";

import RichText from "@/codeforafrica/components/RichText";

const ProjectDescription = React.forwardRef(
  function ProjectDescription(props, ref) {
    const { description, links, sx, title, ...other } = props;

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
        <RichText
          variant="body1"
          elements={description}
          sx={{ typography: { md: "body2" } }}
        />
        {links?.length > 0 ? (
          <Stack direction="row" spacing={2.5}>
            {links.map(({ label, href, iconSlug }) => (
              <Button key={href} href={href} slug={iconSlug}>
                {label}
              </Button>
            ))}
          </Stack>
        ) : null}
      </Stack>
    );
  },
);

export default ProjectDescription;
