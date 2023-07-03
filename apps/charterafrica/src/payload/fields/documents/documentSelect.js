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

async function fetchDocuments(groupId, page) {
  const params = {
    q: `group:${groupId}`,
    pathname: "",
    pinnedDocuments: [],
    per_page: 1000,
    page,
  };

  const url = `${baseUrl}?${new URLSearchParams(params)}`;

  const res = await fetchJson.get(url);

  return res;
}

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

    let page = 1;
    let lastPage = 1;
    let documents = [];

    do {
      // eslint-disable-next-line no-await-in-loop
      const res = await fetchDocuments(siblingData.groupId, page);
      const { total, per_page: perPage } = res;
      documents = [...documents, ...res.documents];
      lastPage = Math.ceil(total / perPage);
      page += 1;
    } while (page <= lastPage);

    const options = documents.map((doc) => doc.title) || [];

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
