import { Section } from "@commons-ui/core";
import { Typography, Box, Divider } from "@mui/material";
import React from "react";

import OpportunityCardList from "../OpportunityCardList";

import { neutral, secondary } from "@/charterafrica/colors";

const GrantsAndFellowshipsGrid = React.forwardRef(
  function GrantsAndFellowshipsGrid(props, ref) {
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
            py: 5,
            // hide from 2nd onwards on mobile and tablet
            "& > *:nth-of-type(n+2)": {
              display: {
                xs: "none",
                md: "block",
              },
            },
          }}
        >
          <Typography
            variant="h3Small"
            color={neutral[900]}
            pb={5}
            textAlign={{
              xs: "center",
              sm: "left",
            }}
          >
            {title}
          </Typography>

          {grantsByStatusArray.map((grant) => {
            return (
              <React.Fragment key={grant.title}>
                <OpportunityCardList
                  title={grant.title}
                  grants={grant.grants}
                  key={grant.title}
                />
                <Divider
                  sx={{
                    width: "100%",
                    height: "0px",
                    color: neutral[200],
                    border: "1px solid",
                    borderColor: neutral[200],
                    marginTop: "40px",
                    marginBottom: "40px",
                  }}
                />
              </React.Fragment>
            );
          })}
        </Section>
      </Box>
    );
  }
);

export default GrantsAndFellowshipsGrid;
