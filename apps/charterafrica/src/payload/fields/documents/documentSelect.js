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
let allOptions = [];

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
    return (
      data?.documents.map((doc) => ({
        label: doc.title,
        value: doc.title,
      })) || []
    );
  }, [data]);

  allOptions = options;
  return createElement(Select, { ...props, hasMany: true, options });
}

async function validateDocumentSelect(value, { required, t }) {
  const valid = select(value, {
    hasMany: true,
    options: allOptions,
    required,
    t,
  });
  return valid;
}

function documentSelect(overrides) {
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
    validate: validateDocumentSelect,
    admin: {
      components: {
        Field: DocumentSelect,
      },
    },
  };

  return deepmerge(defaultSelect, overrides);
}

export default documentSelect;
