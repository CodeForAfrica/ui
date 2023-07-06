import { RichTypography } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const Partners = React.forwardRef(function Partners(props, ref) {
  const { title, list, sx } = props;
  if (!list?.length) {
    return null;
  }
  return (
    <Box sx={sx} ref={ref}>
      {list?.length ? (
        <Box sx={{ p: 2 }}>
          <RichTypography color="neutral.dark" variant="h4Small">
            {title}
          </RichTypography>
          <Box
            display="flex"
            justifyContent={{ sm: "flex-end", xs: "center" }}
            flexWrap="wrap"
            sx={{ mt: 2 }}
          >
            {list.map((item) => (
              <Box key={item.id} sx={{ width: "112px", ml: 1, mb: 2 }}>
                <Figure
                  ImageProps={{
                    alt: item?.name,
                    src: item?.logo,
                  }}
                  sx={{
                    height: 50,
                    width: "auto",
                  }}
                />
                <LineClampedRichTypography
                  textAlign="center"
                  lineClamp={1}
                  variant="p3"
                >
                  {item.name}
                </LineClampedRichTypography>
              </Box>
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
});

Partners.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  sx: PropTypes.shape({}),
};

Partners.defaultProps = {
  sx: undefined,
  list: undefined,
  title: undefined,
};

export default Partners;
