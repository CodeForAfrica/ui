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
    try {
      const { fields } = partnersData.find((item) => id === item.id);
      return {
        name: getValue(fields, name),
        website: getValue(fields, url),
        logo: getValue(fields, logo),
      };
    } catch (error) {
      Sentry.captureMessage(error.message);
      return null;
    }
  });
  return mapped.filter(Boolean);
}

function mapSocialMediaIdsToFields(socialMedia, config, tableData) {
  const {
    schema: { socialMediaTableColumns },
  } = config;
  const { name, url } = socialMediaTableColumns;
  const { socialMedia: socialMediaData } = tableData;
  const mapped = socialMedia.map((id) => {
    try {
      const { fields } = socialMediaData.find((item) => item.id === id);
      return {
        name: getValue(fields, name),
        website: getValue(fields, url),
      };
    } catch (error) {
      Sentry.captureMessage(error.message);
      return null;
    }
  });
  return mapped.filter(Boolean);
}

export function processTool(item, config, { partnersData, socialMediaData }) {
  try {
    const {
      schema: { toolTableColumns },
      localized,
    } = config;
    const data = { ...item.fields, id: item.id };
    const locales = localized ? ["en", "fr", "pt"] : ["en"];
    const theme = locales.reduce((curr, acc) => {
      acc[curr] = getValue(data, toolTableColumns.theme[curr])?.[0];
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
    const socialMedia = mapSocialMediaIdsToFields(
      getValue(data, toolTableColumns.socialMedia) || [],
      config,
      { partnersData, socialMediaData }
    );
    return {
      airtableId: data.id,
      avatarUrl: getValue(data, toolTableColumns.avatarUrl)?.[0]?.url,
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
  } catch (error) {
    Sentry.captureMessage(error.message);
    return null;
  }
}

export function processContributor(
  item,
  config,
  { partnersData, socialMediaData }
) {
  try {
    const {
      schema: { contributorTableColumns },
      localized,
    } = config;
    const data = { ...item.fields, id: item.id };
    const locales = localized ? ["en", "fr", "pt"] : ["en"];
    const socialMedia = mapSocialMediaIdsToFields(
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
      avatarUrl: getValue(data, contributorTableColumns.avatarUrl)?.[0]?.url,
      externalId: getValue(data, contributorTableColumns.slug),
      repoLink,
      socialMedia,
      description,
    };
  } catch (error) {
    Sentry.captureMessage(error.message);
    return null;
  }
}

export function processOrganisation(
  item,
  config,
  { partnersData, socialMediaData }
) {
  try {
    const {
      schema: { organisationTableColumns },
    } = config;
    const data = { ...item.fields, id: item.id };
    const description = {
      en: getValue(data, organisationTableColumns.description.en),
      pt: getValue(data, organisationTableColumns.description.pt),
      fr: getValue(data, organisationTableColumns.description.fr),
    };
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
    const socialMedia = mapSocialMediaIdsToFields(
      getValue(data, organisationTableColumns.socialMedia) || [],
      config,
      { socialMediaData }
    );
    const tools = getValue(data, organisationTableColumns.tools);

    const commonData = {
      airtableId: data.id,
      avatarUrl: getValue(data, organisationTableColumns.avatarUrl)?.[0]?.url,
      externalId: getValue(data, organisationTableColumns.slug),
      type: getValue(data, organisationTableColumns.type),
      repoLink: getValue(data, organisationTableColumns.source.url),
      supporters,
      partners,
      socialMedia,
      tools,
      description,
    };
    if (!commonData.externalId) {
      const message = `Missing external ID for ${data.id}`;
      Sentry.captureMessage(message);
      return null;
    }
    if (!tools.length) {
      const message = `Organisation ${data.id} is not assigned to any tool and has been skipped`;
      Sentry.captureMessage(message);
      return null;
    }
    return commonData;
  } catch (error) {
    Sentry.captureMessage(error.message);
    return null;
  }
}
