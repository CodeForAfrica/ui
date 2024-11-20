import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import PanelButtonGroup from "@/climatemappedafrica/components/HURUmap/PanelButtonGroup";

function PanelButtons({
  isPinning,
  isCompare,
  onClickPin,
  onClickUnpin,
  onValueChange,
  open,
  panelItems: panelItemsProp,
  primaryProfile,
  secondaryProfile,
  value,
}) {
  const [pins, setPins] = useState([]);
  const [panelItems, setPanelItems] = useState([]);

  useEffect(() => {
    if (
      (primaryProfile.items.length || secondaryProfile?.items?.length) &&
      onValueChange
    ) {
      const timeoutId = setTimeout(() => onValueChange("rich-data"), 200);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    return () => {};
  }, [onValueChange, primaryProfile.items, secondaryProfile?.items]);

  useEffect(() => {
    const pItems =
      panelItemsProp?.map((x) => {
        if (
          (x?.value === "rich-data" || x?.value === "pin") &&
          primaryProfile?.items?.length === 0
        ) {
          return {
            ...x,
            disabled: true,
          };
        }
        return x;
      }) ?? [];
    if (isCompare) {
      const foundCompare = pItems?.find(
        (item) => item.value === "secondaryPin",
      );
      if (!foundCompare) {
        const pinIndex = pItems?.findIndex((i) => i?.value === "pin");
        const secondaryPin = {
          ...pItems[pinIndex],
          value: "secondaryPin",
        };
        pItems.splice(pinIndex + 1, 0, secondaryPin);
      }
    }
    setPanelItems(pItems);
  }, [isCompare, panelItemsProp, primaryProfile.items]);

  useEffect(() => {
    if (isPinning || isCompare) {
      setPins((p) => {
        const index = p.indexOf("pin");
        if (index === -1) {
          return [...p, "pin"];
        }
        return p;
      });
    } else if (!isPinning && !isCompare) {
      setPins((p) => {
        const index = p.indexOf("pin");
        const c = [...p];
        if (index !== -1) {
          c?.splice(index, 1);
        }
        return c;
      });
    }
  }, [isPinning, isCompare]);

  if (!panelItems?.length) {
    return null;
  }

  const isPin = (current) => {
    const found = panelItems.find((item) => item.value === current);
    return !!found?.pin;
  };

  function addOrRemovePin(array, pin) {
    const newArray = [...array];
    const index = newArray.indexOf(pin);
    if (index === -1) {
      newArray.push(pin);
    } else {
      newArray.splice(index, 1);
    }
    return newArray;
  }

  const handleChange = (nextValue) => {
    if (isPin(nextValue)) {
      setPins(addOrRemovePin(pins, nextValue));
      if (!isPinning && !isCompare) {
        onClickPin();
      } else {
        onClickUnpin();
      }
    }
    if (!nextValue) {
      setPins([]);
    }

    if (onValueChange) {
      onValueChange(nextValue);
    }
  };

  return (
    <PanelButtonGroup
      onChange={handleChange}
      items={panelItems}
      value={value}
      pins={pins}
      sx={[
        ({ typography, transitions, zIndex }) => ({
          marginTop: typography.pxToRem(52),
          width: typography.pxToRem(44),
          position: "fixed",
          left: 0,
          zIndex: zIndex.drawer + 1,
          transition: transitions.create(["left"], {
            duration: transitions.duration.shorter, // average-ish of entering & leaving screen
          }),
        }),
        ({ widths }) =>
          open && {
            // must match min width of TreeView + Profile
            left: `max(calc((100vw - ${widths.values.lg}px)/2 + 79px + 800px),1099px)`,
          },
      ]}
    />
  );
}

PanelButtons.propTypes = {
  isCompare: PropTypes.bool,
  isPinning: PropTypes.bool,
  onClickPin: PropTypes.func,
  onClickUnpin: PropTypes.func,
  onValueChange: PropTypes.func,
  open: PropTypes.bool,
  panelItems: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      children: PropTypes.node,
      tree: PropTypes.shape({}),
    }),
  ),
  primaryProfile: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  secondaryProfile: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  value: PropTypes.string,
};

export default PanelButtons;
