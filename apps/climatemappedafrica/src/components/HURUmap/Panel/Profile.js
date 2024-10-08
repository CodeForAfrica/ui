import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import ProfileItems from "./ProfileItems";

import Print from "@/climatemappedafrica/assets/icons/print.svg";
import LocationHeader from "@/climatemappedafrica/components/HURUmap/LocationHeader";
import PinAndCompare from "@/climatemappedafrica/components/HURUmap/PinAndCompare";
import Loading from "@/climatemappedafrica/components/Loading";
import { hurumapArgs } from "@/climatemappedafrica/config";

const useStyles = makeStyles(({ typography, breakpoints, zIndex }) => ({
  profile: {
    marginLeft: typography.pxToRem(20),
    marginRight: typography.pxToRem(20),
    marginTop: typography.pxToRem(21),
    [breakpoints.up("md")]: {
      paddingLeft: typography.pxToRem(80),
      marginRight: typography.pxToRem(80),
    },
    [breakpoints.up("lg")]: {
      marginLeft: `max(calc((100vw - 1160px)/2 + 79px), 300px)`,
      marginTop: typography.pxToRem(0),
      marginRight: 0,
      width: typography.pxToRem(800),
      minHeight: "100%",
      paddingTop: typography.pxToRem(67.7),
      paddingLeft: typography.pxToRem(17),
      paddingRight: typography.pxToRem(17),
      zIndex: zIndex.drawer,
    },
  },
}));

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
    ...props
  },
  ref,
) {
  const classes = useStyles(props);
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
    <div className={classes.profile} ref={ref}>
      {isLoading && <Loading />}
      <LocationHeader
        variant="primary"
        icon={Print}
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
    </div>
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
