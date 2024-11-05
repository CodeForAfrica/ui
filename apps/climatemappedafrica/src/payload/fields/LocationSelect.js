import {
  Select,
  useAllFormFields,
  reduceFieldsToValues,
} from "payload/components/forms";
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

export async function validateLocation(value, { data, hasMany, required, t }) {
  const { profile } = data;
  const res = await fetcher(`${apiUrl}/api/hurumap/profiles/${profile}`);
  const options = getOptions(res.locations);
  return select(value, { hasMany, options, required, t });
}

function LocationSelect(props) {
  const [fields] = useAllFormFields();
  const formData = reduceFieldsToValues(fields, true);
  const { data } = useSWR(
    `${apiUrl}/api/hurumap/profiles/${formData.profile}`,
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
