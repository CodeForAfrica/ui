import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import ImpactCardList from "@/codeforafrica/components/ImpactCardList";

const GetInvolved = React.forwardRef(function GetInvolved(props, ref) {
  const { impacts, action, sx } = props;

  if (!action?.href?.length) {
    return null;
  }
  return (
    <Box
      sx={{
        backgroundColor: "background.main",
        ...sx,
      }}
      ref={ref}
    >
      <Section
        sx={{
          px: { xs: 2.5, md: 0 },
          py: { xs: 5, sm: 10, md: 4, lg: 12.5 },
        }}
      >
        <ImpactCardList list={impacts} />
        <Button
          variant="contained"
          component={Link}
          href={action.href}
          sx={{
            display: "block",
            mt: 7.25,
            mx: "auto",
            textAlign: "center",
            width: { xs: "100%", sm: "fit-content" },
          }}
        >
          {action.label}
        </Button>
      </Section>
    </Box>
  );
});

GetInvolved.propTypes = {
  impacts: PropTypes.arrayOf(PropTypes.shape({})),
  action: PropTypes.shape({}),
};

GetInvolved.defaultProps = {
  impacts: undefined,
  action: undefined,
};

export default GetInvolved;
