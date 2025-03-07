import { Loading } from "@hurumap/core";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import ProfileItems from "./ProfileItems";

import printIcon from "@/climatemappedafrica/assets/icons/print.svg?url";
import LocationHeader from "@/climatemappedafrica/components/HURUmap/LocationHeader";
import PinAndCompare from "@/climatemappedafrica/components/HURUmap/PinAndCompare";
import { hurumapArgs } from "@/climatemappedafrica/config";

const Profile = forwardRef(function Profile(
  {
    categories,
    dataNotAvailable,
    isLoading,
    isPinning,
    onClickPin,
    onClickUnpin,
    onSelectLocation,
    primaryProfile,
    secondaryProfile,
    sx,
    ...props
  },
  ref,
) {
  const { pinAndCompare } = hurumapArgs;

  const handleClickPin = (e) => {
    if (onClickPin) {
      onClickPin(e);
    }
  };

  const handleClose = (e) => {
    // TODO(kilemensi): For some reason, e.target.value doesn't seem to work.
    const code = e.nativeEvent?.target?.dataset?.value;
    if (code) {
      if (onSelectLocation) {
        onSelectLocation({ code });
      }
    } else if (onClickUnpin) {
      onClickUnpin(code);
    }
  };

  const handleClick = (profile) => {
    if (primaryProfile && secondaryProfile) {
      return () => {
        if (onClickUnpin) {
          onClickUnpin(profile?.geography?.code);
        }
      };
    }
    return undefined;
  };

  const getSecondaryIndicator = (
    categoryIndex,
    subcategoryIndex,
    indicatorId,
  ) => {
    const category = secondaryProfile?.items?.[categoryIndex];
    const subCategory = category?.children?.[subcategoryIndex];
    const indicator = subCategory?.children?.find(
      ({ indicator: { id } }) => indicatorId === id,
    );
    return indicator;
  };

  const getSecondaryMetric = (categoryIndex, subcategoryIndex, metricIndex) => {
    const category = secondaryProfile?.items?.[categoryIndex];
    const subCategory = category?.children?.[subcategoryIndex];
    const metric = subCategory?.metrics?.[metricIndex];
    return metric;
  };

  let geoCode = primaryProfile?.geography?.code;
  if (secondaryProfile) {
    geoCode = `${geoCode}-vs-${secondaryProfile?.geography?.code}`;
  }

  return (
    <Box
      sx={[
        ({ palette, typography, contentWidths, zIndex }) => ({
          backgroundColor: palette.background.default,
          // must match min width of TreeView
          left: {
            lg: `max(calc((100vw - ${contentWidths.values.lg}px)/2 + 79px), 300px)`,
          },
          marginLeft: {
            xs: typography.pxToRem(20),
            md: typography.pxToRem(80),
            lg: 0,
          },
          marginRight: {
            xs: typography.pxToRem(20),
            md: typography.pxToRem(80),
            lg: 0,
          },
          marginTop: {
            xs: typography.pxToRem(21),
            lg: typography.pxToRem(0),
          },
          paddingLeft: {
            lg: typography.pxToRem(17),
          },
          paddingTop: { lg: typography.pxToRem(67.7) },
          paddingRight: { lg: typography.pxToRem(17) },
          position: { lg: "absolute" },
          top: 0,
          width: { lg: typography.pxToRem(800) },
          minHeight: { lg: "100%" },
          zIndex: { lg: zIndex.drawer },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      ref={ref}
    >
      {isLoading && <Loading />}
      <LocationHeader
        variant="primary"
        icon={printIcon}
        title={primaryProfile.geography.name}
        onClick={handleClick(primaryProfile)}
        {...primaryProfile.geography}
      />
      {secondaryProfile ? (
        <LocationHeader
          variant="secondary"
          onClick={handleClick(secondaryProfile)}
          title={secondaryProfile.geography?.name}
          {...secondaryProfile.geography}
        />
      ) : (
        <PinAndCompare
          {...props}
          {...pinAndCompare}
          currentGeographyCode={primaryProfile?.geography?.code}
          isPinning={isPinning}
          onClose={handleClose}
          onClickPin={handleClickPin}
        />
      )}
      <ProfileItems
        categories={categories}
        dataNotAvailable={dataNotAvailable}
        getSecondaryIndicator={getSecondaryIndicator}
        getSecondaryMetric={getSecondaryMetric}
        primaryProfile={primaryProfile}
        secondaryProfile={secondaryProfile}
        geoCode={geoCode}
      />
    </Box>
  );
});

Profile.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.shape({})),
      description: PropTypes.string,
      icon: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
  dataNotAvailable: PropTypes.string,
  isLoading: PropTypes.bool,
  isPinning: PropTypes.bool,
  onClickPin: PropTypes.func,
  onClickUnpin: PropTypes.func,
  onSelectLocation: PropTypes.func,
  primaryProfile: PropTypes.shape({
    geography: PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    }),
    geometries: PropTypes.shape({
      parents: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.arrayOf(
          PropTypes.shape({
            children: PropTypes.arrayOf(PropTypes.shape({})),
          }),
        ),
      }),
    ),
  }),
  secondaryProfile: PropTypes.shape({
    geography: PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
    }),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        children: PropTypes.arrayOf(
          PropTypes.shape({
            children: PropTypes.arrayOf(PropTypes.shape({})),
          }),
        ),
      }),
    ),
  }),
};

export default Profile;
