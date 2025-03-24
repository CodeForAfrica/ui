import { Location } from "@hurumap/core";
import { Map } from "@hurumap/next";
import { Box, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import useExplore from "./useExplore";
import useProfileGeography from "./useProfileGeography";

import Panel from "@/climatemappedafrica/components/HURUmap/Panel";

function initialState(
  profiles,
  onClick,
  explorePagePath,
  initialLocationCode,
  rootGeographyHasData,
) {
  return {
    profiles: Array.isArray(profiles) ? profiles : [profiles],
    options: [
      { color: "primary", onClick },
      { color: "secondary", onClick },
    ],
    explorePagePath,
    initialLocationCode,
    rootGeographyHasData,
  };
}

function ExplorePage({
  rootGeography,
  explorePagePath,
  hurumapUrl,
  panel: PanelProps = {},
  profile: profileProp,
  profileId,
  ...props
}) {
  const {
    center,
    code: initialLocationCode,
    rootGeographyHasData,
  } = rootGeography;
  const theme = useTheme();
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
      rootGeographyHasData,
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
        rootGeographyHasData,
      ),
    });
  }, [
    dispatch,
    profileProp,
    explorePagePath,
    initialLocationCode,
    rootGeographyHasData,
  ]);
  useEffect(() => {
    if (geoCode) {
      dispatch({
        type: "fetch",
        payload: { code: geoCode },
      });
    }
  }, [dispatch, geoCode]);

  const router = useRouter();
  const shouldFetch = () =>
    (state.primary.shouldFetch && state.primary.code) ||
    (state.secondary?.shouldFetch && state.secondary?.code);

  const { data, error } = useProfileGeography(
    shouldFetch,
    hurumapUrl,
    profileId,
  );
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
      // We do not need shallow routing to allow full page transitions for nested routes
      router.push(href);
    }
    // router shouldn't part of useEffect dependencies: https://nextjs.org/docs/api-reference/next/router#userouter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [explorePagePath, state.slug]);

  const handleSelectLocation = (payload) => {
    const { code } = payload;
    const newPath =
      state.isPinning || state.isCompare
        ? `${state.primary.geography.code}-vs-${code}`
        : `${code}`;
    const href = `/${explorePagePath}/${newPath.toLowerCase()}`;
    router.push(href);
    const type = state.isPinning && state.isCompare ? "compare" : "fetch";
    dispatch({ type, payload });
  };

  const handleClickMap = (_, feature) => {
    const code = feature?.properties?.code;
    setGeoCode(code);
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
        sx={({ palette, typography }) => ({
          display: {
            xs: "none",
            lg: "flex",
          },
          height: "calc(100vh - 88px)",
          position: "fixed",
          left: 0,
          right: 0,
          "& .tooltipPop": {
            background: palette.background.default,
            boxShadow: "0px 3px 6px #00000029",
            height: typography.pxToRem(36),
            width: typography.pxToRem(88),
            "& .level": {
              background: palette.primary.main,
              borderRadius: typography.pxToRem(4),
              color: palette.text.secondary,
              display: "flex",
              fontSize: typography.pxToRem(7),
              fontWeight: "bold",
              height: typography.pxToRem(17),
              justifyContent: "center",
              lineHeight: 10 / 7,
              margin: "0 auto",
              marginTop: typography.pxToRem(-15),
              paddingTop: typography.pxToRem(2),
              textTransform: "uppercase",
              width: typography.pxToRem(62),
            },
            "& .name": {
              textAlign: "center",
              fontSize: typography.pxToRem(9),
              fontWeight: "bold",
              lineHeight: 13 / 9,
              marginTop: typography.pxToRem(5),
              textTransform: "capitalize",
            },
          },
        })}
      >
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
            [theme.breakpoints.up("lg")]: {
              left: 0,
              margin: "0 auto",
              position: "absolute",
              right: 0,
              top: theme.typography.pxToRem(52),
              zIndex: theme.zIndex.appBar - 1,
            },
          }}
        />
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
  rootGeography: PropTypes.shape({
    center: PropTypes.arrayOf(PropTypes.number),
    name: PropTypes.string,
    rootGeographyHasData: PropTypes.bool,
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
  hurumapUrl: PropTypes.string,
  profileId: PropTypes.number,
};

export default ExplorePage;
