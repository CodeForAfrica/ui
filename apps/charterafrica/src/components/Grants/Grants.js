import { Typography, Box, Divider, styled } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

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
          textAlign: {
            xs: "center",
            sm: "left",
          },
        }}
      >
        {title}
      </Typography>

      {isTablet ? (
        <>
          <CardList
            title={grants[0].title}
            grants={grants[0].grants}
            key={grants[0].title}
          />
          <StyledDivider key={grants[0].title} />
        </>
      ) : (
        grants.map((grant) => {
          return (
            <>
              <CardList
                title={grant.title}
                grants={grant.grants}
                key={grant.title}
              />
              <StyledDivider key={grant.title} />
            </>
          );
        })
      )}
    </Box>
  );
});

export default Grants;
