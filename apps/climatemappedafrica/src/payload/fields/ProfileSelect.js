import { Select } from "payload/components/forms";
import { createElement, useMemo } from "react";
import useSWR from "swr";

const apiUrl = process.env.PAYLOAD_PUBLIC_APP_URL;
const fetcher = (url) => fetch(url).then((res) => res.json());

function ProfileSelect(props) {
  const { data } = useSWR(`${apiUrl}/api/hurumap/profiles`, fetcher, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
  });

  const options = useMemo(
    () => data?.map(({ name, id }) => ({ label: name, value: id })) || [],
    [data],
  );
  return createElement(Select, { ...props, options });
}

export default ProfileSelect;
