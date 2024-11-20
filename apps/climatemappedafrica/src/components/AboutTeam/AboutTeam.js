import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useRef } from "react";

import Card from "@/climatemappedafrica/components/Card";
import Carousel from "@/climatemappedafrica/components/Carousel";
import Section from "@/climatemappedafrica/components/Section";

// NOTE(kilemensi) useStyles uses import/definition order to determine how
//                 classes are ordered.
//                 see: https://material-ui.com/styles/advanced/#makestyles-withstyles-styled
// eslint-disable-next-line import/order
import useStyles from "./useStyles";

const responsive = {
  desktop: {
    items: 4,
    partialVisibilityGutter: 30,
  },
  tablet: {
    items: 2,
    partialVisibilityGutter: 30,
  },
};

function AboutTeam({ title, members: membersProp, ...props }) {
  const membersCount = membersProp?.length ?? 0;
  const classes = useStyles({ ...props, membersCount });
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const ref = useRef();

  if (!membersProp?.length) {
    return null;
  }
  const scrollToTeam = () => {
    if (ref.current && !isMdUp) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        py: { xs: 5, md: 10 },
        px: 0,
        scrollMarginTop: 40,
        scrollBehavior: "auto",
      }}
      ref={ref}
    >
      <Section>
        {title && (
          <Typography
            variant="h4"
            className={classes.title}
            sx={{
              textAlign: "center",
              paddingBottom: { xs: 5, md: 10 },
            }}
          >
            {title}
          </Typography>
        )}
        <Carousel
          afterChange={scrollToTeam}
          responsive={responsive}
          classes={{ dotList: classes.dotList }}
        >
          {membersProp.map((member) => (
            <Card
              key={member.title}
              {...member}
              mediaProps={{ square: true }}
            />
          ))}
        </Carousel>
      </Section>
    </Box>
  );
}

AboutTeam.propTypes = {
  title: PropTypes.string,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ),
};

export default AboutTeam;
