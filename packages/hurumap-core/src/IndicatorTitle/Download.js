import { ButtonBase, IconButton, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import Image from "next/image";
import Papa from "papaparse";
import React, { useState, useEffect } from "react";
import * as vega from "vega";
import * as XLSX from "xlsx";

import cfalogo from "@/hurumap/core/assets/Group4462.svg";
import projectlogo from "@/hurumap/core/assets/Group5002.svg";
import Layout1 from "@/hurumap/core/assets/Group922.svg";
import Layout2 from "@/hurumap/core/assets/Group923.svg";
import { idify } from "@/hurumap/core/utils/utils";
// import config, { hurumapArgs } from "@/pesayetu/config";

function Download({
  title,
  chartValue,
  handleChartValueChange,
  disableToggle,
  spec,
  source,
  height,
  data,
  currentFilters,
  profileNames,
  isCompare,
  ...props
}) {
  // const classes = useStyles(props);
  const [view, setView] = useState(null);
  const { palette } = useTheme();

  // const {
  //   indicatorTitle: {
  //     download: { values, layouts, imageTypes, fileTypes },
  //   },
  // } = hurumapArgs;
  const values = ["Percentage", "Value"];
  const layouts = [Layout1, Layout2];
  const imageTypes = ["PNG", "SVG"];
  const fileTypes = ["CSV", "XLSX", "JSON"];
  const [layout, setLayout] = useState(0);

  useEffect(() => {
    try {
      const viewProp = new vega.View(vega.parse(spec), { renderer: "none" });
      setView(viewProp);
    } catch (error) {
      console.error("Error creating view", error);
    }
  }, [spec]);

  const setImageLayout = async (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setLayout(type);
  };

  const splitString = (str) => {
    // eslint-disable-next-line prefer-regex-literals
    const regex = new RegExp(/\S.{1,42}\S(?= |$)/, "g");
    const chunks = str.match(regex);
    return chunks;
  };

  currentFilters?.forEach(({ name, value }) => {
    const filterName = idify(name);
    view?.signal(`${filterName}Filter`, true);
    view?.signal(`${filterName}FilterValue`, value);
  });

  const chartTitle = splitString(title)?.slice(0, 3);
  const subtitle = currentFilters?.reduce((acc, cur) => {
    return `${acc}${cur.name}: ${cur.value},`;
  }, "");
  const secondaryName = isCompare
    ? ` vs ${profileNames?.secondary?.split("-")[0]}`
    : "";
  const chartSubtitle = `${subtitle} Location: ${profileNames?.primary}${secondaryName}`;

  const handleImageDownload = async (e, type) => {
    e.preventDefault();
    e.stopPropagation();

    const totalHeight = height + 300; // chartHeight + extra space for legends, logo + title;
    view?.signal("totalHeight", totalHeight);
    view?.signal("chartTitle", chartTitle);
    view?.signal("chartSubtitle", chartSubtitle.toUpperCase());
    view?.signal("chartSource", source ? `Source: ${source}` : "");
    view?.signal("projectLogoUrl", projectlogo);
    view?.signal("logoWidth", 60);
    view?.signal("logoUrl", cfalogo);
    view?.signal("background", palette.common.white);

    if (layout === 0) {
      view?.signal("titleY", 20);
      view?.signal("titleH", 60 + (chartTitle.length - 1) * 15);
      view?.signal("chartY", 50);
      view?.signal("titleGroupY", 0);
      view?.signal("sourceGroupY", totalHeight - 80);
      view?.signal("sourceGroupH", 60);
      view?.signal("sourceY", 30);
    } else {
      view?.signal("titleY", 25);
      view?.signal("titleH", 60 + (chartTitle.length - 1) * 15);
      view?.signal("chartY", 60);
      view?.signal(
        "titleGroupY",
        totalHeight - 80 + (chartTitle.length - 1) * 15,
      );
      view?.signal("sourceGroupY", 1);
      view?.signal("sourceGroupH", 60);
      view?.signal("sourceY", 30);
    }
    await view?.runAsync();

    const imgType = type.toLowerCase();
    // const url = await view.toImageURL(imgType, config.images.scaleFactor);
    const url = await view.toImageURL(imgType, 2);

    /* eslint-env browser */
    const link = document.createElement("a");
    link.download = `${title}.${imgType}`;
    link.href = url;
    /* eslint-env browser */
    document.body.appendChild(link);
    link.click();
    /* eslint-env browser */
    document.body.removeChild(link);
  };

  const handleDataDownload = async (e, type) => {
    e.preventDefault();
    e.stopPropagation();

    const fileType = type.toLowerCase();
    const fileName = `${title}.${fileType}`;
    let href;

    if (fileType === "json") {
      href = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data),
      )}`;
    } else if (fileType === "csv") {
      href = `data:text/csv;charset=utf-8,${Papa.unparse(data)}`;
    } else {
      const table = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new(); // make Workbook of Excel
      // add Worksheet to Workbook
      XLSX.utils.book_append_sheet(wb, table, title);
      // export Excel file
      XLSX.writeFile(wb, fileName);
      return;
    }
    /* eslint-env browser */
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName;
    /* eslint-env browser */
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Grid container {...props}>
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
                // className={clsx(classes.button, {
                //   [classes.activeButton]: chartValue === v,
                // })}
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
                  // className={classes.text}
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
            // className={clsx(classes.row, classes.header)}
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
              // className={classes.text}
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
        // className={classes.row}
        sx={(theme) => ({
          height: theme.typography.pxToRem(36),
        })}
      >
        {imageTypes.map((p) => (
          <Grid
            item
            xs={6}
            key={p}
            // className={classes.button}
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
              // className={classes.text}
              sx={(theme) => ({
                fontSize: theme.typography.pxToRem(11),
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
        // className={clsx(classes.row, classes.layout)}
        sx={(theme) => ({
          height: theme.typography.pxToRem(36),
          display: "flex",
          alignItems: "center",
          paddingLeft: theme.typography.pxToRem(16),
          border: `1px solid ${theme.palette.grey.light}`,
        })}
      >
        <Typography
          // className={classes.text}
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
        // className={classes.row}
        sx={(theme) => ({
          height: theme.typography.pxToRem(36),
        })}
      >
        {layouts.map((p, index) => (
          <Grid
            item
            xs={6}
            key={p}
            // className={clsx(classes.button, {
            //   [classes.activeButton]: layout === index,
            // })}
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
              // className={classes.layoutButton}
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
        // className={clsx(classes.row, classes.header)}
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
          // className={classes.text}
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
        // className={classes.row}
        sx={(theme) => ({
          height: theme.typography.pxToRem(36),
        })}
      >
        {fileTypes.map((f) => (
          <Grid
            item
            xs={4}
            key={f}
            // className={classes.button}
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
              // className={classes.text}
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
}

export default Download;
