import { Section } from "@commons-ui/core";
import { Typography, Box, Divider, styled } from "@mui/material";
import React from "react";

import OpportunityCardList from "../OpportunityCardList";

import { neutral, secondary } from "@/charterafrica/colors";

const StyledDivider = styled(Divider)(() => ({
  width: "100%",
  height: "0px",
  color: neutral[200],
  border: "1px solid",
  borderColor: neutral[200],
  marginTop: "40px",
  marginBottom: "40px",
}));

const Grants = React.forwardRef(function Grants(props, ref) {
  const { grants, title, sx } = props;

  if (!grants) {
    return null;
  }

  // group grants by status
  const grantsByStatus = grants.reduce((acc, grant) => {
    const { status } = grant;
    if (acc[status]) {
      acc[status].push(grant);
    } else {
      acc[status] = [grant];
    }
    return acc;
  }, {});

  const grantsByStatusArray = Object.keys(grantsByStatus).map((key) => {
    return {
      title: `${key} calls`,
      grants: grantsByStatus[key],
    };
  });

  return (
    <Box
      sx={{
        backgroundColor: secondary[50],
        ...sx,
      }}
      ref={ref}
    >
      <Section
        sx={{
          px: { xs: 5, sm: 0 },
          paddingBottom: { xs: 5, md: "40px" },
        }}
      >
        <Typography
          variant="h3Small"
          color={neutral[900]}
          sx={{
            paddingBottom: "40px",
            textAlign: {
              xs: "center",
              sm: "left",
            },
          }}
        >
          {title}
        </Typography>
        {grantsByStatusArray.map((grant) => {
          return (
            <>
              <OpportunityCardList
                title={grant.title}
                grants={grant.grants}
                key={grant.title}
              />
              <StyledDivider />
            </>
          );
        })}
      </Section>
    </Box>
  );
});

export default Grants;
