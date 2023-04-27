import { Box, Grid, Typography, Chip, Button } from "@mui/material";
import React, { useState } from "react";

import { neutral } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import formatDateTime from "@/charterafrica/utils/formatDate";

const DatasetCard = React.forwardRef(function DatasetCard(props) {
  const { formats, notes, title, created, updated, author } = props;

  const [showAll, setState] = useState(false);

  const onClick = () => {
    setState(!showAll);
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: neutral[50],
        borderBottom: "none",
        p: 2.5,
        "&:last-child": {
          borderBottom: "1px solid",
          borderColor: neutral[50],
        },
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        direction={{ xs: "column", md: "row" }}
      >
        <Grid item xs={12} md={4}>
          <LineClampedRichTypography
            color="neutral.dark"
            lineClamp={1}
            order={1}
            variant="h5SmallSemiBold"
            sx={{ mb: 1 }}
          >
            {title}
          </LineClampedRichTypography>
          <Typography variant="p1" color="neutral.main" sx={{ mb: 1 }}>
            Updated {formatDateTime(updated, { includeTime: false })} | Created{" "}
            {formatDateTime(created, { includeTime: false })}
          </Typography>
          <Typography variant="p1SemiBold" color="neutral.main">
            {author}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <LineClampedRichTypography
            color="common.black"
            lineClamp={showAll ? -1 : 3}
            order={1}
            variant="p1"
            sx={{ mb: 1 }}
          >
            {notes}
          </LineClampedRichTypography>
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
              color: "neutral.dark",
              typography: "p1",
              textDecoration: "underline",
              padding: 0,
            }}
            onClick={onClick}
          >
            {showAll ? "Read Less" : "Read More"}
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          {formats.map((format) => (
            <Chip
              label={format}
              sx={(theme) => ({
                backgroundColor:
                  format === "PDF"
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                ...theme.typography.caption,
                borderRadius: "10px",
                mr: 1.75,
              })}
              key={format}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
});

export default DatasetCard;
