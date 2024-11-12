import {
  Select,
  useAllFormFields,
  reduceFieldsToValues,
} from "payload/components/forms";
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

function LocationSelect(props) {
  const [fields] = useAllFormFields();
  const { profile, url } = reduceFieldsToValues(fields, true);
  const { data } = useSWR(
    `${apiUrl}/api/hurumap/profiles/${profile}?BASE_URL=${url}`,
    fetcher,
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false,
    },
  );

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
