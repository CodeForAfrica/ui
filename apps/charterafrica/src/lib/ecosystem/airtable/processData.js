import * as Sentry from "@sentry/nextjs";

function getValue(data, key, defaultValue = null) {
  return data?.[key] ?? defaultValue;
}

function getSourceType(link) {
  const githubPattern = /^(https?:\/\/)?(www\.)?github\.com\//;
  const gitlabPattern = /^(https?:\/\/)?(www\.)?gitlab\.com\//;
  const bitBucketPattern = /^(https?:\/\/)?(www\.)?bitbucket\.org\//;
  if (githubPattern.test(link)) {
    return "github";
  }
  if (gitlabPattern.test(link)) {
    return "gitlab";
  }
  if (bitBucketPattern.test(link)) {
    return "bitbucket";
  }
  return "github";
}

function getRepoLink(source = "github", slug = "") {
  if (source === "github" && slug) {
    return `https://github.com/${slug}`;
  }
  return "";
}

function mapSupporterIdsToObjects(supporterIds, config, { partnersData }) {
  const {
    schema: { partnerTableColumns = {} },
  } = config;
  const { name, url, logo } = partnerTableColumns;
  const mapped = supporterIds.map((id) => {
    const { fields } = partnersData.find((item) => id === item.id) || {};

    if (!fields) {
      return null;
    }
    return {
      name: getValue(fields, name),
      website: getValue(fields, url),
      logo: getValue(fields, logo)?.[0]?.url,
    };
  });
  return mapped.filter(Boolean);
}

function mapSocialMediaColumnsToObjects(columns, data) {
  const getData = (name) => {
    const link = getValue(data, columns[name]);
    if (!link) {
      return null;
    }
    return {
      name,
      link,
    };
  };
  const SUPPORTED_SOCIAL_MEDIA =
    "twitter,facebook,youtube,slack,tiktok,linkedIn,instagram,telegram,discord,whatsapp";
  return SUPPORTED_SOCIAL_MEDIA.split(",").map(getData).filter(Boolean);
}

export function processTool(item, config, { partnersData }) {
  const {
    schema: { toolTableColumns },
    localized,
  } = config;
  const data = { ...item.fields, id: item.id };
  const externalId = getValue(data, toolTableColumns.slug)?.trim();
  if (!externalId?.length) {
    const message = `Missing externalId for Tool ${data.id}. Skipping`;
    Sentry.captureMessage(message);
    return null;
  }

  const locales = localized ? ["en", "fr", "pt"] : ["en"];
  const foundTheme = locales.reduce((acc, curr) => {
    const val = getValue(data, toolTableColumns.theme?.[curr]);
    if (val) {
      acc[curr] = val;
    }
    return acc;
  }, {});
  const theme = Object.keys(foundTheme).length ? foundTheme : null;
  const foundDescription = locales.reduce((acc, curr) => {
    const val = getValue(data, toolTableColumns.description?.[curr]);
    if (val) {
      acc[curr] = val;
    }
    return acc;
  }, {});
  const description = Object.keys(foundDescription).length
    ? foundDescription
    : null;
  const operatingCountries = getValue(
    data,
    toolTableColumns.operatingCountries,
  );
  const homeCountry = getValue(data, toolTableColumns.homeCountry);
  const partners = mapSupporterIdsToObjects(
    getValue(data, toolTableColumns.partners) || [],
    config,
    { partnersData },
  );
  const supporters = mapSupporterIdsToObjects(
    getValue(data, toolTableColumns.supporters) || [],
    config,
    { partnersData },
  );
  const socialMedia = mapSocialMediaColumnsToObjects(
    toolTableColumns.socialMediaColumns,
    data,
  );
  const source = getSourceType(getValue(data, toolTableColumns.source.url));
  return {
    airtableId: data.id,
    avatarUrl: getValue(data, toolTableColumns.avatarUrl)?.[0]?.url ?? null,
    externalId,
    repoLink: getValue(data, toolTableColumns.source.url),
    name: getValue(data, toolTableColumns.name),
    link: getValue(data, toolTableColumns.url),
    operatingCountries,
    contributors: getValue(data, toolTableColumns.contributors),
    source,
    supporters,
    partners,
    homeCountry,
    socialMedia,
    theme,
    description,
  };
}

export function processContributor(item, config) {
  const {
    schema: { contributorTableColumns },
    localized,
  } = config;
  const data = { ...item.fields, id: item.id };
  const externalId = getValue(data, contributorTableColumns.slug)?.trim();
  if (!externalId?.length) {
    const message = `Missing externalId for Contributor ${data.id}. Skipping`;
    Sentry.captureMessage(message);
    return null;
  }

  const locales = localized ? ["en", "fr", "pt"] : ["en"];
  const socialMedia = mapSocialMediaColumnsToObjects(
    contributorTableColumns.socialMediaColumns,
    data,
  );
  const foundDescription = locales.reduce((acc, curr) => {
    const val = getValue(data, contributorTableColumns.description[curr]);
    if (val) {
      acc[curr] = val;
    }
    return acc;
  }, {});
  const description = Object.keys(foundDescription).length
    ? foundDescription
    : null;
  const repoLink = getRepoLink(
    getValue(data, contributorTableColumns.source.type) || "github",
    getValue(data, contributorTableColumns.slug),
  );
  return {
    airtableId: data.id,
    externalId,
    repoLink,
    socialMedia,
    description,
  };
}

export function processOrganisation(item, config, { partnersData }) {
  const {
    schema: { organisationTableColumns },
    localized,
  } = config;
  const data = { ...item.fields, id: item.id };
  const externalId = getValue(data, organisationTableColumns.slug)?.trim();
  if (!externalId?.length) {
    const message = `Missing externalId for Organisation ${data.id}. Skipping`;
    Sentry.captureMessage(message);
    return null;
  }

  const tools = getValue(data, organisationTableColumns.tools);
  if (!tools?.length) {
    const message = `Missing tools for Organisation ${data.id}. Skipping`;
    Sentry.captureMessage(message);
    return null;
  }

  const locales = localized ? ["en", "fr", "pt"] : ["en"];
  const foundDescription = locales.reduce((acc, curr) => {
    const val = getValue(data, organisationTableColumns.description[curr]);
    if (val) {
      acc[curr] = val;
    }
    return acc;
  }, {});
  const description = Object.keys(foundDescription).length
    ? foundDescription
    : null;
  const partners = mapSupporterIdsToObjects(
    getValue(data, organisationTableColumns.partners) || [],
    config,
    { partnersData },
  );
  const supporters = mapSupporterIdsToObjects(
    getValue(data, organisationTableColumns.supporters) || [],
    config,
    { partnersData },
  );
  const socialMedia = mapSocialMediaColumnsToObjects(
    organisationTableColumns.socialMediaColumns,
    data,
  );
  const source = getSourceType(
    getValue(data, organisationTableColumns.source.url),
  );
  const commonData = {
    airtableId: data.id,
    name: getValue(data, organisationTableColumns.name),
    avatarUrl:
      getValue(data, organisationTableColumns.avatarUrl)?.[0]?.url ?? null,
    externalId,
    type: getValue(data, organisationTableColumns.type)?.replace(/&/g, "and"),
    repoLink: getValue(data, organisationTableColumns.source.url),
    supporters,
    partners,
    socialMedia,
    tools,
    description,
    source,
  };
  return commonData;
}
