import { StayInTouch, Link } from "@commons-ui/next";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function Menu({ children, explorePagePath, links, socialLinks, LinkProps }) {
  if (!links?.length) {
    return null;
  }
  const exploreHref = explorePagePath ? `/${explorePagePath}` : undefined;
  return (
    <Grid
      container
      alignItems={{ lg: "center" }}
      direction={{ xs: "column", lg: "row" }}
      justifyContent={{ lg: "flex-end" }}
      sx={{
        padding: {
          lg: 0,
        },
      }}
    >
      {links.map((item, index) => (
        <Grid
          item
          key={item.label}
          sx={({ typography }) => ({
            margin: {
              xs: 0,
              lg: `0 ${typography.pxToRem(12.8)}`,
            },
            order: item.href === exploreHref ? 0 : 1,
            "&:last-child": {
              margin: {
                xs: 0,
                lg: 0,
              },
              "& > a": {
                paddingRight: 0,
              },
            },
          })}
        >
          <Link
            color={index !== 0 ? "secondary" : "primary"}
            display="inline-flex"
            href={item.href}
            size="large"
            underline="none"
            variant={index !== 0 ? "text" : "outlined"}
            sx={({ palette, typography }) => ({
              borderRadius: 20,
              border: item.href === exploreHref ? "3px solid" : 0,
              color: {
                xs: palette.text.secondary,
                lg: palette.primary.main,
              },
              padding: `${typography.pxToRem(14)} ${typography.pxToRem(28)} `,
              "&:hover": {
                padding: `${typography.pxToRem(16)} ${typography.pxToRem(30)} `,
                border: "1px solid",
              },
              ...LinkProps?.sx,
            })}
          >
            <Typography
              component="span"
              variant="body1"
              sx={({ typography }) => ({
                fontWeight: 600,
                letterSpacing: "1.6px",
                fontSize: {
                  xs: typography.pxToRem(20),
                  lg: typography.pxToRem(16),
                },
                textTransform: "uppercase",
              })}
            >
              {item.label}
            </Typography>
          </Link>
        </Grid>
      ))}
      {children}
      <StayInTouch
        LinkProps={{
          component: Link,
          sx: {
            color: "text.primary",
            backgroundColor: "#EBEBEB",
            borderRadius: 50,
            width: 42,
            height: 42,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "3.2px",
            pr: 0,
          },
        }}
        alignItems={{ xs: "flex-start", lg: "center" }}
        links={socialLinks}
        sx={{
          // Ensure it's the last item
          order: links.length,
        }}
      />
    </Grid>
  );
}

Menu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      label: PropTypes.string,
      component: PropTypes.func,
    }),
  ),
  children: PropTypes.node,
};

export default Menu;
