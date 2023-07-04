import * as Sentry from "@sentry/nextjs";

function getValue(data, key, defaultValue = null) {
  return data?.[key] ?? defaultValue;
}

function getRepoLink(source = "github", slug = "") {
  if (source === "github") {
    return `https://github.com/${slug}`;
  }
  return "";
}

function mapSupporterIdsToObjects(supporterIds, config, { partnersData }) {
  const {
    schema: { partnerTableColumns },
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
      logo: getValue(fields, logo),
    };
  });
  return mapped.filter(Boolean);
}

function mapSocialMediaIdsToObjects(socialMedia, config, tableData) {
  const {
    schema: { socialMediaTableColumns },
  } = config;
  const { name, url } = socialMediaTableColumns;
  const { socialMediaData = [] } = tableData;
  const mapped = socialMedia.map((id) => {
    const { fields } = socialMediaData.find((item) => item.id === id) || {};

    if (!fields) {
      return null;
    }
    return {
      name: getValue(fields, name),
      website: getValue(fields, url),
    };
  });
  return mapped.filter(Boolean);
}

export function processTool(item, config, { partnersData, socialMediaData }) {
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
  const theme = locales.reduce((acc, curr) => {
    acc[curr] = getValue(data, toolTableColumns.theme?.[curr])?.[0] ?? "";
    return acc;
  }, {});
  const description = locales.reduce((acc, curr) => {
    acc[curr] = getValue(data, toolTableColumns.description?.[curr]);
    return acc;
  }, {});
  const operatingCountries = getValue(
    data,
    toolTableColumns.operatingCountries
  );
  const homeCountry = getValue(data, toolTableColumns.homeCountry);
  const partners = mapSupporterIdsToObjects(
    getValue(data, toolTableColumns.partners) || [],
    config,
    { partnersData, socialMediaData }
  );
  const supporters = mapSupporterIdsToObjects(
    getValue(data, toolTableColumns.supporters) || [],
    config,
    { partnersData, socialMediaData }
  );
  const socialMedia = mapSocialMediaIdsToObjects(
    getValue(data, toolTableColumns.socialMedia) || [],
    config,
    { partnersData, socialMediaData }
  );
  return {
    airtableId: data.id,
    avatarUrl: getValue(data, toolTableColumns.avatarUrl)?.[0]?.url ?? null,
    externalId,
    repoLink: getValue(data, toolTableColumns.source.url),
    name: getValue(data, toolTableColumns.name),
    link: getValue(data, toolTableColumns.url),
    operatingCountries,
    contributors: getValue(data, toolTableColumns.contributors),
    supporters,
    partners,
    homeCountry,
    socialMedia,
    theme,
    description,
  };
}

export function processContributor(
  item,
  config,
  { partnersData, socialMediaData }
) {
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
  const socialMedia = mapSocialMediaIdsToObjects(
    getValue(data, contributorTableColumns.socialMedia) || [],
    config,
    { partnersData, socialMediaData }
  );
  const description = locales.reduce((acc, curr) => {
    acc[curr] = getValue(data, contributorTableColumns.description[curr]);
    return acc;
  }, {});
  const repoLink = getRepoLink(
    getValue(data, contributorTableColumns.source.type) || "github",
    getValue(data, contributorTableColumns.slug)
  );
  return {
    airtableId: data.id,
    avatarUrl:
      getValue(data, contributorTableColumns.avatarUrl)?.[0]?.url ?? null,
    externalId,
    repoLink,
    socialMedia,
    description,
  };
}

export function processOrganisation(
  item,
  config,
  { partnersData, socialMediaData }
) {
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
  const description = locales.reduce((acc, curr) => {
    acc[curr] = getValue(data, organisationTableColumns.description[curr]);
    return acc;
  }, {});
  const partners = mapSupporterIdsToObjects(
    getValue(data, organisationTableColumns.partners) || [],
    config,
    { partnersData }
  );
  const supporters = mapSupporterIdsToObjects(
    getValue(data, organisationTableColumns.supporters) || [],
    config,
    { partnersData }
  );
  const socialMedia = mapSocialMediaIdsToObjects(
    getValue(data, organisationTableColumns.socialMedia) || [],
    config,
    { socialMediaData }
  );

  const commonData = {
    airtableId: data.id,
    avatarUrl:
      getValue(data, organisationTableColumns.avatarUrl)?.[0]?.url ?? null,
    externalId,
    type: getValue(data, organisationTableColumns.type),
    repoLink: getValue(data, organisationTableColumns.source.url),
    supporters,
    partners,
    socialMedia,
    tools,
    description,
  };
  return commonData;
}
