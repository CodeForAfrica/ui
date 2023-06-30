import { deepmerge } from "@mui/utils";
import {
  Select,
  getSiblingData,
  useAllFormFields,
} from "payload/components/forms";
import { select } from "payload/dist/fields/validations";
import { createElement, useMemo } from "react";
import useSWR from "swr";

import fetchJson from "../../../utils/fetchJson";

const baseUrl = `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/v1/resources/documents`;

function DocumentSelect(props) {
  const [fields] = useAllFormFields();
  const document = getSiblingData(fields, "groupId");
  const documentsBlock = document.blocks.find(
    (block) => block?.blockType === "documents"
  );

  const {
    organization: { groupId },
  } = documentsBlock;

  const params = {
    q: `group:${groupId}`,
    pathname: "",
    pinnedDocuments: [],
    per_page: 1000,
  };

  const url = `${baseUrl}?${new URLSearchParams(params)}`;

  const { data } = useSWR(url, fetchJson.get);

  const options = useMemo(() => {
    return data?.documents.map((doc) => doc.title) || [];
  }, [data?.documents]);

  return createElement(Select, { ...props, hasMany: true, options });
}

const validate = (siblingData) => {
  return async function validateDocumentSelect(value, { required, t }) {
    const params = {
      q: `group:${siblingData.groupId}`,
      pathname: "",
      pinnedDocuments: [],
      per_page: 1000,
    };

    const res = await fetchJson.get(baseUrl, {
      params,
    });

    const options = res?.documents.map((doc) => doc.title) || [];

    const valid = await select(value, {
      hasMany: true,
      options,
      required,
      t,
    });
    return valid;
  };
};

function documentSelect({ groupData, ...overrides }) {
  const defaultSelect = {
    name: "document",
    label: {
      en: "Select Document",
      fr: "Sélectionner le document",
      pt: "Selecionar documento",
    },
    type: "select",
    options: ["Options Loading"],
    hasMany: true,
    required: true,
    validate: validate(groupData),
    admin: {
      components: {
        Field: DocumentSelect,
      },
    },
  };

  return deepmerge(defaultSelect, overrides);
}

export default documentSelect;
