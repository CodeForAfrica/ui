import { Grid, ButtonBase, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";

import {
  downloadSheetData,
  downloadJson,
  downloadImage,
  createImage,
} from "./utils";

const Download = React.forwardRef(function Download(
  {
    backgroundColor,
    cfalogo,
    chartSubtitle,
    chartTitle,
    chartValue,
    currentFilters,
    data,
    disableToggle,
    fileTypes,
    handleChartValueChange,
    height,
    imageTypes,
    isCompare,
    layouts,
    projectlogo,
    profileNames,
    scaleFactor,
    spec,
    source,
    title,
    values,
    view,
    ...props
  },
  ref,
) {
  const [layout, setLayout] = useState(0);

  const handleImageDownload = async (e, type) => {
    e.preventDefault();
    e.stopPropagation();

    const totalHeight = height + 300;
    const imgType = type.toLowerCase();

    const url = await createImage({
      view,
      totalHeight,
      chartTitle,
      chartSubtitle,
      source,
      projectlogo,
      cfalogo,
      backgroundColor,
      layout,
      imgType,
      scaleFactor,
    });
    downloadImage(url, title, imgType);
  };

  const handleDataDownload = async (e, type) => {
    e.preventDefault();
    e.stopPropagation();

    const fileType = type.toLowerCase();
    const fileName = `${title}.${fileType}`;

    if (fileType === "json") {
      downloadJson(data, fileName);
    } else {
      downloadSheetData(data, fileType, fileName, title);
    }
  };

  const setImageLayout = async (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setLayout(type);
  };

  return (
    <Grid container ref={ref} {...props}>
      {!disableToggle && (
        <>
          <Grid
            item
            container
            xs={12}
            sx={(theme) => ({
              height: theme.typography.pxToRem(36),
            })}
          >
            {values.map((v) => (
              <Grid
                item
                xs={6}
                key={v}
                sx={(theme) => ({
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: `1px solid ${theme.palette.background.paper}`,
                  "&:last-of-type": {
                    borderRight: 0,
                  },
                  "&:hover": {
                    background: theme.palette.background.paper,
                    border: `2px solid ${theme.palette.grey.main}`,
                  },
                  ...(chartValue === v && {
                    background: theme.palette.background.paper,
                    border: `2px solid ${theme.palette.grey.main}`,
                  }),
                })}
              >
                <ButtonBase
                  sx={(theme) => ({
                    fontSize: theme.typography.pxToRem(11),
                    lineHeight: 17 / 11,
                    color: "#666666",
                  })}
                  onClick={() => handleChartValueChange(v)}
                >
                  {v}
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            sx={(theme) => ({
              height: theme.typography.pxToRem(36),
              background: theme.palette.background.paper,
              display: "flex",
              alignItems: "center",
              paddingLeft: theme.typography.pxToRem(16),
              justifyContent: "space-between",
            })}
          >
            <Typography
              sx={(theme) => ({
                fontSize: theme.typography.pxToRem(11),
                lineHeight: 17 / 11,
                color: "#666666",
              })}
            >
              Download chart as:
            </Typography>
          </Grid>
        </>
      )}
      <Grid
        item
        container
        sx={(theme) => ({
          height: theme.typography.pxToRem(36),
        })}
      >
        {imageTypes.map((p) => (
          <Grid
            item
            xs={6}
            key={p}
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRight: `1px solid ${theme.palette.background.paper}`,
              "&:last-of-type": {
                borderRight: 0,
              },
              "&:hover": {
                background: theme.palette.background.paper,
                border: `2px solid ${theme.palette.grey.main}`,
              },
            })}
          >
            <ButtonBase
              sx={(theme) => ({
                fontSize: theme.typography.pxToRem(11),
                lineHeight: 17 / 11,
                color: "#666666",
              })}
              onClick={(e) => handleImageDownload(e, p)}
            >
              {p}
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        xs={12}
        sx={(theme) => ({
          height: theme.typography.pxToRem(36),
          display: "flex",
          alignItems: "center",
          paddingLeft: theme.typography.pxToRem(16),
          border: `1px solid ${theme.palette.grey.light}`,
        })}
      >
        <Typography
          sx={(theme) => ({
            fontSize: theme.typography.pxToRem(11),
            lineHeight: 17 / 11,
            color: "#666666",
          })}
        >
          Layout option:
        </Typography>
      </Grid>
      <Grid
        item
        container
        sx={(theme) => ({
          height: theme.typography.pxToRem(36),
        })}
      >
        {layouts.map((p, index) => (
          <Grid
            item
            xs={6}
            key={p}
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRight: `1px solid ${theme.palette.background.paper}`,
              "&:last-of-type": {
                borderRight: 0,
              },
              "&:hover": {
                background: theme.palette.background.paper,
                border: `2px solid ${theme.palette.grey.main}`,
              },
              ...(layout === index && {
                background: theme.palette.background.paper,
                border: `2px solid ${theme.palette.grey.main}`,
              }),
            })}
          >
            <IconButton
              sx={{
                padding: 0,
              }}
              onClick={(e) => {
                setImageLayout(e, index);
              }}
              size="large"
            >
              <img src={p} width={24} height={24} alt="layout" />
            </IconButton>
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        xs={12}
        sx={(theme) => ({
          height: theme.typography.pxToRem(36),
          background: theme.palette.background.paper,
          display: "flex",
          alignItems: "center",
          paddingLeft: theme.typography.pxToRem(16),
          justifyContent: "space-between",
        })}
      >
        <Typography
          sx={(theme) => ({
            fontSize: theme.typography.pxToRem(11),
            lineHeight: 17 / 11,
            color: "#666666",
          })}
        >
          Download data as:
        </Typography>
      </Grid>
      <Grid
        item
        container
        sx={(theme) => ({
          height: theme.typography.pxToRem(36),
        })}
      >
        {fileTypes.map((f) => (
          <Grid
            item
            xs={4}
            key={f}
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRight: `1px solid ${theme.palette.background.paper}`,
              "&:last-of-type": {
                borderRight: 0,
              },
              "&:hover": {
                background: theme.palette.background.paper,
                border: `2px solid ${theme.palette.grey.main}`,
              },
            })}
          >
            <ButtonBase
              sx={(theme) => ({
                fontSize: theme.typography.pxToRem(11),
                lineHeight: 17 / 11,
                color: "#666666",
              })}
              onClick={(e) => handleDataDownload(e, f)}
            >
              {f}
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
});

export default Download;
