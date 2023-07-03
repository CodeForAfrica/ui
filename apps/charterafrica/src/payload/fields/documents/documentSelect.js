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

function arrayFetcher(...urls) {
  return Promise.all(urls.map((url) => fetchJson.get(url)));
}

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
  const { per_page: perPage, total } = data || {};
  const lastPage = Math.ceil(total / perPage);

  const urls = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 2; i <= lastPage; i++) {
    urls.push(`${baseUrl}?${new URLSearchParams({ ...params, page: i })}`);
  }

  const { data: allData } = useSWR(urls, arrayFetcher);

  const options = useMemo(() => {
    const allDocs = allData?.map((d) => d.documents).flat() || [];
    const docs = data?.documents || [];
    return [...docs, ...allDocs].map((doc) => doc.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createElement(Select, { ...props, hasMany: true, options });
}

const validate = (siblingData) => {
  return async function validateDocumentSelect(value, { required, t }) {
    if (!siblingData.groupId) {
      return false;
    }

    const params = {
      q: `group:${siblingData.groupId}`,
      pathname: "",
      pinnedDocuments: [],
      per_page: 1000,
    };

    const res = await fetchJson.get(
      `${baseUrl}?${new URLSearchParams(params)}`
    );
    const { total, per_page: perPage, documents: originalDocuments } = res;
    const lastPage = Math.ceil(total / perPage);
    const urls = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 2; i <= lastPage; i++) {
      urls.push(`${baseUrl}?${new URLSearchParams({ ...params, page: i })}`);
    }

    const allData = await arrayFetcher(...urls);

    const documents = allData?.map((d) => d.documents).flat() || [];
    const allDocs = [...originalDocuments, ...documents];

    const options = allDocs.map((doc) => doc.title) || [];

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
