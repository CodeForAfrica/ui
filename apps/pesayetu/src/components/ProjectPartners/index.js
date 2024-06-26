import { Button, Grid, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import Link from "@/pesayetu/components/Link";

const useStyles = makeStyles(
  ({ breakpoints, palette, transitions, typography }) => ({
    root: {
      padding: `${typography.pxToRem(56.69)} 0`,
    },
    content: {
      justifyContent: "center",
      [breakpoints.up("md")]: {
        justifyContent: "flex-start",
      },
    },
    title: {
      textAlign: "center",
      marginBottom: typography.pxToRem(49.38),
      [breakpoints.up("md")]: {
        textAlign: "left",
      },
    },
    partner: {
      justifyContent: "center",
      transition: transitions.create("box-shadow", {
        easing: transitions.easing.easeOut,
      }),
      "&:hover": {
        boxShadow: `0px 3px 6px ${alpha(palette.common.black, 0.16)}`, // #00000029
        filter: "unset",
      },
      filter: "grayscale(1)",
      "& img": {
        transition: transitions.create("filter", {
          easing: transitions.easing.easeOut,
        }),
      },
    },
    logo: {
      margin: "0 auto ",
    },
  }),
);

function ProjectPartners({ title, partners, ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Grid container className={classes.content} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
        </Grid>
        {partners?.map(({ link, logo, name }) => (
          <Grid key={link} item md={6}>
            <Button
              component={Link}
              href={link}
              className={classes.partner}
              height="300px"
              width="300px"
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Image
                objectFit="contain"
                src={logo.url}
                fill
                alt={name}
                className={classes.logo}
              />
            </Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

ProjectPartners.propTypes = {
  title: PropTypes.string,
  partners: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      logo: PropTypes.shape({
        url: PropTypes.string,
      }),
      logoProps: PropTypes.shape({}),
      name: PropTypes.string,
    }),
  ),
};

ProjectPartners.defaultProps = {
  title: undefined,
  partners: undefined,
};
export default ProjectPartners;
