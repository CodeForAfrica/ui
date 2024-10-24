import { Select } from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement, useMemo } from "react";
import useSWR from "swr";

const apiUrl = process.env.PAYLOAD_PUBLIC_APP_URL;
const fetcher = (url) => fetch(url).then((res) => res.json());

const getOptions = (locations) =>
  locations
    ?.filter(({ level }) => level !== "region")
    ?.map((location) => ({
      label: location.name,
      value: location.code,
    })) || [];

export async function validateLocation(value, { hasMany, required, t }) {
  const data = await fetcher(`${apiUrl}/api/hurumap/profiles`);
  const options = getOptions(data.locations);
  return select(value, { hasMany, options, required, t });
}

function LocationSelect(props) {
  const { data } = useSWR(`${apiUrl}/api/hurumap/profiles`, fetcher, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
  });

  const options = useMemo(
    () =>
      getOptions(data?.locations).sort((a, b) =>
        a.label.localeCompare(b.label),
      ),
    [data],
  );

  return createElement(Select, { ...props, options });
}

export default LocationSelect;
