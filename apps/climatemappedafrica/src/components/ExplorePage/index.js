import { Location } from "@hurumap/core";
import { Map } from "@hurumap/next";
import { Box, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import useExplore from "./useExplore";
import useProfileGeography from "./useProfileGeography";
import useStyles from "./useStyles";

import Panel from "@/climatemappedafrica/components/HURUmap/Panel";

function initialState(
  profiles,
  onClick,
  explorePagePath,
  initialLocationCode,
  pinInitialLocation,
) {
  return {
    profiles: Array.isArray(profiles) ? profiles : [profiles],
    options: [
      { color: "primary", onClick },
      { color: "secondary", onClick },
    ],
    explorePagePath,
    initialLocationCode,
    pinInitialLocation,
  };
}

function ExplorePage({
  initialLocation,
  explorePagePath,
  panel: PanelProps = {},
  profile: profileProp,
  ...props
}) {
  const {
    center,
    name: initialLocationCode,
    pinInitialLocation,
  } = initialLocation;
  const theme = useTheme();
  const classes = useStyles(props);
  // NOTE: This setState and the corresponding useEffect are "hacks" since at
  //       this point, useReducer hasn't been called yet so we can't use
  //       dispatch directly but we need handleClickTag for initializer.
  const [geoCode, setGeoCode] = useState(null);
  const handleClickTag = (_, { code }) => {
    setGeoCode(code);
  };
  const [state, dispatch] = useExplore(
    initialState(
      profileProp,
      handleClickTag,
      explorePagePath,
      initialLocationCode,
      pinInitialLocation,
    ),
  );
  useEffect(() => {
    dispatch({
      type: "reset",
      payload: initialState(
        profileProp,
        handleClickTag,
        explorePagePath,
        initialLocationCode,
        pinInitialLocation,
      ),
    });
  }, [
    dispatch,
    profileProp,
    explorePagePath,
    initialLocationCode,
    pinInitialLocation,
  ]);
  useEffect(() => {
    if (geoCode) {
      dispatch({
        type: "fetch",
        payload: { code: geoCode, onClick: handleClickTag },
      });
    }
  }, [dispatch, geoCode]);

  const router = useRouter();
  const shouldFetch = () =>
    (state.primary.shouldFetch && state.primary.code) ||
    (state.secondary?.shouldFetch && state.secondary?.code);

  const { data, error } = useProfileGeography(shouldFetch);
  useEffect(() => {
    if (data) {
      dispatch({
        type: "show",
        payload: { profile: data, onClick: handleClickTag },
      });
    }
  }, [dispatch, data]);

  // Update URL when state.slug changes
  useEffect(() => {
    if (state.slug) {
      const href = `/${explorePagePath}/${state.slug}`;
      router.push(href, href, { shallow: true });
    }
    // router shouldn't part of useEffect dependencies: https://nextjs.org/docs/api-reference/next/router#userouter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.slug]);

  const handleSelectLocation = (payload) => {
    const { code } = payload;
    const newPath =
      state.isPinning || state.isCompare
        ? `${state.primary.geography.code}-vs-${code}`
        : `${code}`;
    const href = `/${explorePagePath}/${newPath.toLowerCase()}`;
    router.push(href, href, { shallow: true });
    const type = state.isPinning && state.isCompare ? "compare" : "fetch";
    dispatch({ type, payload });
  };

  const handleClickMap = (_, feature) => {
    return handleSelectLocation(feature.properties);
  };

  const handleClickPin = () => {
    dispatch({ type: "pin" });
  };

  const handleClickUnpin = (code) => {
    let payload;
    if (code) {
      payload = { code };
    }
    dispatch({ type: "unpin", payload });
  };

  const isLoading = shouldFetch() && !(data || error);
  const {
    geography,
    geometries,
    highlights,
    tags: primaryTags,
  } = state.primary;
  const tags = [...primaryTags];
  const { tags: secondaryTags } = state.secondary || {};
  if (secondaryTags?.length) {
    tags.push(secondaryTags[secondaryTags.length - 1]);
  }
  return (
    <>
      <Box
        sx={{
          display: {
            xs: "none",
            lg: "block",
          },
        }}
      >
        <div className={classes.root}>
          <Map
            center={center}
            geography={geography}
            secondaryGeography={state.secondary?.geography}
            geometries={geometries}
            isPinOrCompare={state.isPinning || state.isCompare}
            isPinning={state.isPinning}
            onClick={handleClickMap}
            onClickUnpin={handleClickUnpin}
            zoom={7}
            {...props}
          />
          <Location
            highlights={highlights}
            isLoading={isLoading}
            tags={tags}
            sx={{
              display: "none",
              [theme.breakpoints.up("md")]: {
                display: "flex",
                left: 0,
                margin: "0 auto",
                position: "absolute",
                right: 0,
                top: theme.typography.pxToRem(52),
                zIndex: theme.zIndex.appBar - 1,
              },
            }}
          />
        </div>
      </Box>
      <Panel
        {...props}
        isCompare={state.isCompare}
        isLoading={isLoading}
        isPinning={state.isPinning}
        onClickPin={handleClickPin}
        onClickUnpin={handleClickUnpin}
        onSelectLocation={handleSelectLocation}
        primaryProfile={state.primary}
        secondaryProfile={state.secondary}
        {...PanelProps}
      />
    </>
  );
}

ExplorePage.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  initialLocation: PropTypes.shape({
    center: PropTypes.arrayOf(PropTypes.number),
    name: PropTypes.string,
    pinInitialLocation: PropTypes.bool,
  }),
  explorePagePath: PropTypes.string,
  panel: PropTypes.shape({}),
  profile: PropTypes.oneOfType([
    PropTypes.shape({
      geography: PropTypes.shape({}),
      geometries: PropTypes.shape({}),
      highlights: PropTypes.arrayOf(PropTypes.shape({})),
      tags: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        geography: PropTypes.shape({}),
        geometries: PropTypes.shape({}),
        highlights: PropTypes.arrayOf(PropTypes.shape({})),
        tags: PropTypes.arrayOf(PropTypes.shape({})),
      }),
    ),
  ]),
};

export default ExplorePage;
