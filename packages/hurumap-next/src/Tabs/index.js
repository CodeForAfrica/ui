import { Tab, Divider, Tabs as MuiTabs, Box } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";

import TabPanel from "./TabPanel";

function a11yProps(name, index) {
  return {
    id: `${name}-tab-${index}`,
    "aria-controls": `${name}-tabpanel-${index}`,
  };
}

function Tabs({
  DividerProps,
  TabIndicatorProps,
  TabProps,
  TabsProps,
  TabPanelProps,
  activeTab = 0,
  items,
  name: nameProp,
  onChange,
  linkComponent,
}) {
  const router = useRouter();
  const [value, setValue] = useState(activeTab);
  const name = nameProp || "simple";

  const handleChange = (_event, newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(_event);
    }
  };

  if (!items?.length) {
    return null;
  }
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <MuiTabs
        value={value}
        onChange={linkComponent ? undefined : handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label={`${name} tabs`}
        sx={({ palette, typography }) => ({
          minHeight: typography.pxToRem(23),
          textTransform: "none",
          "& .MuiTabs-indicator": {
            backgroundColor: palette.primary.main,
            height: 2,
            marginBottom: 0,
            ...TabIndicatorProps,
          },
          ...TabsProps,
        })}
      >
        {items.map(({ label, href, slug }, index) => (
          <Tab
            key={label}
            label={label}
            value={slug ?? index}
            component={linkComponent}
            href={href}
            underline="none"
            onClick={
              href && !linkComponent
                ? (e) => {
                    e.preventDefault();
                    router.push(href, href, { shallow: true });
                  }
                : null
            }
            {...a11yProps(name, index)}
            disableRipple
            sx={({ typography }) => ({
              color: "#666666",
              fontWeight: 600,
              fontSize: typography.pxToRem(16),
              letterSpacing: typography.pxToRem(1.6),
              lineHeight: 25 / 16,
              marginRight: typography.pxToRem(40),
              minHeight: typography.pxToRem(23),
              minWidth: 0,
              padding: `0 0 ${typography.pxToRem(4)} 0`,
              textTransform: "uppercase",
              "&:last-of-type": {
                marginRight: 0,
              },
              ...TabProps,
            })}
          />
        ))}
      </MuiTabs>
      <Divider
        sx={({ typography }) => ({
          marginTop: typography.pxToRem(-2),
          height: typography.pxToRem(2),
          ...DividerProps,
        })}
      />
      <Box
        sx={({ typography }) => ({
          marginTop: typography.pxToRem(40),
          ...TabPanelProps,
        })}
      >
        {items.map((item, index) => (
          <TabPanel
            key={item.label}
            name={name}
            selected={value}
            value={item?.slug ?? index}
          >
            {item.children}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}

Tabs.propTypes = {
  activeTab: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  linkComponent: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      children: PropTypes.node,
    }),
  ),
  onChange: PropTypes.func,
};

export default Tabs;
