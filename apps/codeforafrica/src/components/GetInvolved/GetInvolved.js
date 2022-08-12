import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import React from "react";

import ImpactCardList from "@/codeforafrica/components/ImpactCardList";

const GetInvolved = React.forwardRef(function GetInvolved(props, ref) {
  const { list, action, sx } = props;

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
        <ImpactCardList list={list} />
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
          {action.content || action.href}
        </Button>
      </Section>
    </Box>
  );
});

GetInvolved.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})),
  action: PropTypes.shape({}),
};

GetInvolved.defaultProps = {
  list: undefined,
  action: undefined,
};

export default GetInvolved;
