import { Link } from "@commons-ui/next";
import { Button, SvgIcon } from "@mui/material";
import React from "react";

import DatabaseIcon from "@/codeforafrica/assets/icons/Type=database, Size=24, Color=CurrentColor.svg";
import GitHubIcon from "@/codeforafrica/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";

const ProjectDescriptionButton = React.forwardRef(
  function ProjectDescriptionButton(props, ref) {
    const { href, type, ...other } = props;

    let Icon;
    switch (type) {
      case "data":
        Icon = DatabaseIcon;
        break;
      case "source":
        Icon = GitHubIcon;
        break;
      default:
        Icon = undefined;
        break;
    }
    let endIcon;
    if (Icon) {
      endIcon = (
        <SvgIcon
          component={Icon}
          sx={{
            color: "primary.main",
            display: "flex",
            fill: "none",
            fontSize: 16,
          }}
        />
      );
    }

    return (
      <Button
        endIcon={endIcon}
        size="small"
        variant="outlined"
        {...other}
        href={href}
        component={href ? Link : undefined}
        ref={ref}
        key={href}
      />
    );
  },
);

export default ProjectDescriptionButton;
