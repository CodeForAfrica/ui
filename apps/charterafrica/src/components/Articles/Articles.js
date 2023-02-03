import { Section } from "@commons-ui/core";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

import PostCard from "../Postcard";

import { secondary } from "@/charterafrica/colors";

const Articles = forwardRef((props, ref) => {
  const { sx, articles } = props;
  return (
    <Box bgcolor={secondary[50]} sx={sx} ref={ref}>
      <Section sx={{ px: { xs: "57.5px", sm: 0 } }}>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 5, md: 2.5 }}>
          {articles?.map((item) => (
            <Grid key={item.id} item xs={12} sm={6} md={4}>
              <PostCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  );
});

Articles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
      author: PropTypes.string,
      image: PropTypes.shape({}),
      href: PropTypes.string,
    })
  ),
};
Articles.defaultProps = {
  articles: undefined,
};

export default Articles;
