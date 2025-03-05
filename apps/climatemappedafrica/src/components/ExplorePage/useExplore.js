import { Link } from "@commons-ui/next";
import { useReducer } from "react";

function extendProfileTags(profile, options, explorePagePath) {
  const { tags: originalTags, ...other } = profile || {};
  if (!originalTags) {
    return profile;
  }

  const tags = originalTags.map(({ code, ...otherTags }) => ({
    ...otherTags,
    code,
    component: Link,
    href: `/${explorePagePath}/${code.toLowerCase()}`,
    shallow: true,
    underline: "none",
    ...options,
  }));
  return { ...other, tags };
}

function initializer({
  explorePagePath,
  initialLocationCode,
  profiles,
  rootGeographyHasData,
  options,
}) {
  const [primary, secondary] = profiles;
  const [primaryOptions, secondaryOptions] = options;

  return {
    isPinning: false,
    isCompare: !!(primary && secondary),
    primary: extendProfileTags(primary, primaryOptions, explorePagePath),
    secondary: extendProfileTags(secondary, secondaryOptions, explorePagePath),
    explorePagePath,
    initialLocationCode,
    rootGeographyHasData,
  };
}

function reducer(state, action) {
  const { explorePagePath, initialLocationCode, rootGeographyHasData } = state;
  switch (action.type) {
    case "fetch": {
      const code = action.payload?.code;
      if (code) {
        let profileType = "primary";
        const newState = { ...state };
        newState.slug = code.toLowerCase();

        if (state.isPinning || state.isCompare) {
          profileType = "secondary";
          newState.slug =
            `${state.primary.geography.code}-vs-${code}`.toLowerCase();
          newState.isCompare = true;
        }
        newState[profileType] = {
          ...newState[profileType],
          code,
          shouldFetch: true,
        };

        return newState;
      }

      return state;
    }
    case "show": {
      const { profile, ...others } = action.payload || {};
      const code = profile?.geography?.code;
      if (action.payload && code) {
        const profileType = ["primary", "secondary"].find(
          (type) => state[type]?.code === code,
        );
        if (profileType) {
          const newState = { ...state };
          newState[profileType] = extendProfileTags(
            profile,
            {
              ...others,
              color: profileType,
            },
            explorePagePath,
          );
          return newState;
        }
      }

      return state;
    }
    case "pin":
      if (state.primary.geography.code.toLowerCase() !== initialLocationCode) {
        return { ...state, isPinning: true };
      }
      return { ...state, isPinning: rootGeographyHasData };
    case "compare": {
      const code = action.payload?.code;
      if (code) {
        const newState = { ...state };
        newState.secondary = { code, shouldFetch: true };
        newState.slug =
          `${state.primary.geography.code}-vs-${code}`.toLowerCase();
        return { ...newState, isCompare: true };
      }

      return { ...state, isCompare: true };
    }
    case "unpin": {
      const newState = { ...state, isPinning: false, isCompare: false };
      const code = action.payload?.code;
      if (state.secondary?.geography?.code === code) {
        newState.secondary = undefined;
      } else if (state.primary?.geography?.code === code && state.secondary) {
        // NOTE: need to reset color from secondary back to primary as well
        newState.primary = extendProfileTags(
          state.secondary,
          {
            color: "primary",
          },
          explorePagePath,
        );
        newState.secondary = undefined;
      }
      newState.secondary = undefined;
      newState.slug = newState.primary.geography.code.toLowerCase();

      return newState;
    }
    case "reset":
      return initializer(action.payload);
    default:
      throw new Error();
  }
}

function useExplore(initializerArg) {
  return useReducer(reducer, initializerArg, initializer);
}

export default useExplore;
