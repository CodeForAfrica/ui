import { Link } from "@commons-ui/next";
import { Box, Button, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import ContributeIcon from "@/charterafrica/assets/icons/Type=contribute, Size=24, Color=CurrentColor.svg";
import GithubIcon from "@/charterafrica/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";

const ContributeAndGoToRepo = React.forwardRef(function ContributeAndGoToRepo(
  props,
  ref
) {
  const { contribute, goToRepo, sx } = props;
  return (
    <Box ref={ref} sx={sx}>
      <Button
        component={contribute?.href ? Link : undefined}
        href={contribute?.href}
        variant="contained"
        target="_blank"
        sx={{ width: "100%", height: 50 }}
      >
        <SvgIcon
          inheritViewBox
          component={ContributeIcon}
          sx={{
            color: "text.secondary",
            display: "inline-flex",
            fill: "none",
            width: 16,
            height: 16,
            mr: 1,
          }}
        />
        {contribute?.label}
      </Button>
      <br />
      <Button
        component={goToRepo?.href ? Link : undefined}
        href={goToRepo?.href}
        variant="contained"
        target="_blank"
        sx={{
          mt: 1.25,
          width: "100%",
          height: 50,
        }}
      >
        <SvgIcon
          component={GithubIcon}
          sx={{
            color: "text.secondary",
            display: "inline-flex",
            fill: "none",
            width: 16,
            height: 16,
            mr: 1,
          }}
        />
        {goToRepo?.label}
      </Button>
    </Box>
  );
});

ContributeAndGoToRepo.propTypes = {
  contribute: PropTypes.shape({
    href: PropTypes.string,
    label: PropTypes.string,
  }),
  goToRepo: PropTypes.shape({
    href: PropTypes.string,
    label: PropTypes.string,
  }),
  sx: PropTypes.shape({}),
};

ContributeAndGoToRepo.defaultProps = {
  contribute: null,
  goToRepo: null,
  sx: undefined,
};

export default ContributeAndGoToRepo;
