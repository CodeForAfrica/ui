import { deepmerge } from "@mui/utils";
import { Select } from "payload/components/forms";
import { createElement } from "react";
// import useSWR from "swr";

// import fetchJson from "../../../utils/fetchJson";

function DocumentSelect(props) {
  //   const { data } = useSWR(baseUrl, fetchJson.get);
  const options = [
    {
      label: "Document 1",
      value: "document1",
    },
    {
      label: "Document 2",
      value: "document2",
    },
    {
      label: "Document 3",
      value: "document3",
    },
  ];

  return createElement(Select, { ...props, hasMany: true, options });
}

function documentSelect(overrides) {
  const defaultSelect = {
    name: "document",
    label: {
      en: "Select Document",
      fr: "Sélectionner le document",
      pt: "Selecionar documento",
    },
    type: "text",
    required: true,
    admin: {
      components: {
        Field: DocumentSelect,
      },
    },
  };

  return deepmerge(defaultSelect, overrides);
}

export default documentSelect;
