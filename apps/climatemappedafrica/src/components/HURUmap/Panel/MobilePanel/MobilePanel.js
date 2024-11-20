import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RichData from "./RichData";

import printIcon from "@/climatemappedafrica/assets/icons/print.svg?url";
import TopIcon from "@/climatemappedafrica/assets/icons/top.svg";
import LocationHeader from "@/climatemappedafrica/components/HURUmap/LocationHeader";
import PinAndCompare from "@/climatemappedafrica/components/HURUmap/PinAndCompare";
import Section from "@/climatemappedafrica/components/Section";
import Tabs from "@/climatemappedafrica/components/Tabs";
import { hurumapArgs } from "@/climatemappedafrica/config";

// being last is necessary for style override to work
// eslint-disable-next-line import/order
import useStyles from "./useStyles";

function MobilePanel({ activeType, scrollToTopLabel, sx, ...props }) {
  const classes = useStyles(props);
  const { onSelectLocation, primaryProfile, dataNotAvailable } = props;
  const { geography, items } = primaryProfile;

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
        classes={{
          divider: classes.tabsDivider,
          indicator: classes.tabIndicator,
          tabs: classes.tabs,
          tab: classes.tab,
          tabPanels: classes.tabPanels,
          tabSelected: classes.tabSelected,
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
