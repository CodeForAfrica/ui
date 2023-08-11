import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Avatar, AvatarGroup, Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const Contributors = React.forwardRef(function Contributors(props, ref) {
  const { list, sx, title } = props;
  if (!list?.length) {
    return null;
  }
  return (
    <Box ref={ref} sx={sx}>
      <Box sx={{ p: 2 }}>
        <RichTypography color="neutral.dark" variant="h4Small">
          {title}
        </RichTypography>
        <AvatarGroup sx={{ justifyContent: { xs: "center", sm: "right" } }}>
          {list.map((item) => (
            <Avatar
              key={item.id}
              component={Link}
              href={item.link.href}
              alt={item.name}
              src={item.avatarUrl}
            />
          ))}
        </AvatarGroup>
      </Box>
    </Box>
  );
});

Contributors.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})),
  sx: PropTypes.shape({}),
  title: PropTypes.string.isRequired,
};

Contributors.defaultProps = {
  sx: undefined,
  list: undefined,
};

export default Contributors;
