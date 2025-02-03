import { Section } from "@commons-ui/core";
import { Tabs } from "@hurumap/next";
import { Button, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RichData from "./RichData";

import printIcon from "@/climatemappedafrica/assets/icons/print.svg?url";
import TopIcon from "@/climatemappedafrica/assets/icons/top.svg";
import LocationHeader from "@/climatemappedafrica/components/HURUmap/LocationHeader";
import PinAndCompare from "@/climatemappedafrica/components/HURUmap/PinAndCompare";
import { hurumapArgs } from "@/climatemappedafrica/config";

// being last is necessary for style override to work

function MobilePanel({ activeType, scrollToTopLabel, sx, ...props }) {
  const { onSelectLocation, primaryProfile, dataNotAvailable } = props;
  const { geography, items } = primaryProfile;
  const theme = useTheme();

  const { pinAndCompare } = hurumapArgs;

  const activeTab = Math.max(
    items?.findIndex(({ title }) => title === activeType),
    0,
  );
  const formatedItems = items?.map((item) => {
    return {
      label: item.title,
      href: `#${item.title}`,
      children: <RichData item={item} {...props} />,
    };
  });
  const scrollToTop = () => {
    /* eslint-env browser */
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClose = (e) => {
    const code = e.nativeEvent?.target?.dataset?.value;
    if (code && onSelectLocation) {
      onSelectLocation({ code });
    }
  };

  return (
    <>
      {items?.length === 0 && (
        <Section>
          <LocationHeader
            variant="primary"
            icon={printIcon}
            title={geography.name}
            {...geography}
          />
          <PinAndCompare
            {...props}
            {...pinAndCompare}
            isMobile
            onClose={handleClose}
            currentGeographyCode={geography.code}
          />
          <Typography
            sx={({ typography }) => ({
              color: "#666666",
              fontWeight: "bold",
              fontSize: typography.pxToRem(10),
              lineHeight: 16 / 10,
              letterSpacing: typography.pxToRem(0.8),
              margin: `${typography.pxToRem(20)} 0`,
              textTransform: "uppercase",
            })}
          >
            {`${geography.name} ${dataNotAvailable}`}
          </Typography>
        </Section>
      )}
      {/* key is needed to re-render the component when prop changes e.g.
            via storybook controls */}
      <Tabs
        key={activeTab}
        name="mobilepanel"
        items={formatedItems}
        activeTab={activeTab}
        DividerProps={{
          display: "none",
        }}
        TabIndicatorProps={{
          display: "none",
        }}
        TabPanelProps={{
          marginTop: 0,
        }}
        TabsProps={{
          paddingBottom: theme.typography.pxToRem(16),
          paddingTop: theme.typography.pxToRem(16),
          paddingLeft: {
            xs: theme.typography.pxToRem(20),
            md: theme.typography.pxToRem(80),
          },
          paddingRight: {
            xs: theme.typography.pxToRem(20),
            md: theme.typography.pxToRem,
          },
          backgroundColor: theme.palette.background.paper,
          zIndex: theme.zIndex.appBar,
          width: "100%",
          position: "sticky",
          top: 66, // below navbar
        }}
        TabProps={{
          color: "#212529",
          backgroundColor: theme.palette.background.default,
          fontWeight: 500,
          fontSize: theme.typography.pxToRem(12),
          letterSpacing: theme.typography.pxToRem(1.6),
          lineHeight: 30 / 12,
          marginRight: theme.typography.pxToRem(20),
          padding: `${theme.typography.pxToRem(6)} ${theme.typography.pxToRem(20)}`,
          height: theme.typography.pxToRem(29),
          maxWidth: "unset",
          textTransform: "unset",
          "&:last-of-type": {
            marginRight: 0,
          },
          "&.Mui-selected": {
            color: theme.palette.background.default,
            backgroundColor: "#666666",
          },
          "&:hover, &:focus, &$selected": {
            color: theme.palette.background.default,
            backgroundColor: "#666666",
          },
        }}
      />
      {items?.length > 0 && (
        <Button
          href={`#${geography.name}`}
          onClick={scrollToTop}
          startIcon={
            <TopIcon
              sx={({ typography }) => ({ marginRight: typography.pxToRem(20) })}
            />
          }
          sx={({ palette, typography }) => ({
            padding: `${typography.pxToRem(58)} ${typography.pxToRem(100)} `,
            backgroundColor: palette.background.paper,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#666666",
            textTransform: "uppercase",
            "&:after": {
              display: "none",
            },
            "&:hover": {
              backgroundColor: palette.background.paper,
              fontWeight: 600,
            },
          })}
        >
          {scrollToTopLabel}
        </Button>
      )}
    </>
  );
}

MobilePanel.propTypes = {
  activeType: PropTypes.string,
  dataNotAvailable: PropTypes.string,
  onSelectLocation: PropTypes.func,
  primaryProfile: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
    geography: PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    }),
  }),
  scrollToTopLabel: PropTypes.string,
};

export default MobilePanel;
