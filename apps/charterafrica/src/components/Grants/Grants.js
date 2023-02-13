import { Typography, Box, Divider, styled } from "@mui/material";
import React from "react";

import CardList from "../CardList";

import { neutral } from "@/charterafrica/colors";

const StyledDivider = styled(Divider)(() => ({
  width: "100%",
  height: "0px",
  color: neutral[200],
  border: "1px solid",
  borderColor: neutral[200],
  marginTop: "40px",
  marginBottom: "40px",
  "&:last-child": {
    display: "none",
  },
}));

const Grants = React.forwardRef(function Grants(props, ref) {
  const { grants, title } = props;

  if (!grants) {
    return null;
  }

  return (
    <Box ref={ref}>
      <Typography
        variant="h3Small"
        color={neutral[900]}
        sx={{
          paddingBottom: "40px",
        }}
      >
        {title}
      </Typography>

      {grants.map((grant) => {
        return (
          <Box key={grant.title}>
            <CardList
              title={grant.title}
              grants={grant.grants}
              key={grant.title}
            />
            <StyledDivider key={grant.title} />
          </Box>
        );
      })}
    </Box>
  );
});

export default Grants;
