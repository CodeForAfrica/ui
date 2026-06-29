import { useEffect, useRef } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

// Sensible defaults for the filterable list views (opportunities, reports,
// toolkits, playbooks) — callers may override any of them. By default:
//  - keepPreviousData: hold the current results in place during a refetch so
//    the list never flashes back to the unfiltered set.
//  - no focus/reconnect revalidation.
// Mount revalidation stays ON so ISR-stale pages refresh on load. `isBusy`
// reflects only fetches for a NEW key (the user changed the query); revalidating
// the current key (mount/background freshness) stays silent — SWR's isLoading
// can't make this distinction because it tracks cache presence, not whether the
// fetched key differs from the one on screen (and on mount we show fallback).
// Extra options (e.g. fallbackData) pass through to useSWR; `enabled` mirrors
// each list's skip flag.
export default function useListData(url, { enabled = true, ...options } = {}) {
  const key = enabled ? url : null;
  const { data, isValidating } = useSWR(key, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    ...options,
  });

  // Track the key whose data is currently on screen; we're "busy" only while
  // fetching a different key, not while revalidating the current one.
  const shownKey = useRef(key);
  useEffect(() => {
    if (!isValidating) {
      shownKey.current = key;
    }
  }, [isValidating, key]);

  return {
    data,
    isBusy: Boolean(key) && isValidating && shownKey.current !== key,
  };
}
