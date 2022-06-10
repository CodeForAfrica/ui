/* eslint-env browser */
import { createCustomEqual } from "fast-equals";
import React from "react";

// Because React does not do deep comparisons, we need custom hooks
// see: https://github.com/googlemaps/js-samples/issues/946

function isLatLngLiteral(obj) {
  return (
    typeof obj === "object" &&
    Number.isFinite(obj.lat) &&
    Number.isFinite(obj.lng)
  );
}

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof window.google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof window.google.maps.LatLng
  ) {
    return new window.google.maps.LatLng(a).equals(
      new window.google.maps.LatLng(b)
    );
  }

  // TODO extend to other types

  // use fast-equals for other objects
  return deepEqual(a, b);
});

export function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export function useDeepCompareEffectForMaps(callback, dependencies) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
