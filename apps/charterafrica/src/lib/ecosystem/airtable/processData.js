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
    const { fields } = partnersData.find((item) => id === item.id);
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
  const { socialMedia: socialMediaData } = tableData;
  const mapped = socialMedia.map((id) => {
    const { fields } = socialMediaData.find((item) => item.id === id);
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
  const locales = localized ? ["en", "fr", "pt"] : ["en"];
  const theme = locales.reduce((curr, acc) => {
    acc[curr] = getValue(data, toolTableColumns.theme[curr])?.[0] ?? null;
    return acc;
  }, {});
  const description = locales.reduce((curr, acc) => {
    acc[curr] = getValue(data, toolTableColumns.description[curr]);
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
    externalId: getValue(data, toolTableColumns.slug) || " ",
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
  const locales = localized ? ["en", "fr", "pt"] : ["en"];
  const socialMedia = mapSocialMediaIdsToObjects(
    getValue(data, contributorTableColumns.socialMedia) || [],
    config,
    { partnersData, socialMediaData }
  );
  const description = locales.reduce((curr, acc) => {
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
    externalId: getValue(data, contributorTableColumns.slug),
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
  const externalId = getValue(data, organisationTableColumns.slug);
  if (!externalId) {
    const message = `Missing external ID for ${data.id}`;
    Sentry.captureMessage(message);
    return null;
  }
  const tools = getValue(data, organisationTableColumns.tools);
  if (!tools.length) {
    const message = `Organisation ${data.id} is not assigned to any tool and has been skipped`;
    Sentry.captureMessage(message);
    return null;
  }
  const locales = localized ? ["en", "fr", "pt"] : ["en"];
  const description = locales.reduce((curr, acc) => {
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