import { Select } from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement, useMemo } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = process.env.PAYLOAD_PUBLIC_APP_URL;

export async function validateLocation(value, { hasMany, required, t }) {
  const response = await fetch(`${apiUrl}/api/hurumap/profiles`);
  const data = await response.json();
  const { locations } = data ?? {};
  const options =
    locations
      ?.filter(({ level }) => level !== "region")
      ?.map((location) => ({
        label: location.name,
        value: location.code,
      })) || [];
  return select(value, { hasMany, options, required, t });
}

function LocationSelect(props) {
  const url = `${apiUrl}/api/hurumap/profiles`;
  const { data } = useSWR(url, fetcher, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
  });
  const { locations } = data ?? {};
  const memoOptions = () =>
    (
      locations
        ?.filter(({ level }) => level !== "region")
        ?.map((location) => ({
          label: location.name,
          value: location.code,
        })) || []
    ).sort((a, b) => a.label.localeCompare(b.label));
  const options = useMemo(memoOptions, [locations]);
  return createElement(Select, { ...props, options });
}

export default LocationSelect;
