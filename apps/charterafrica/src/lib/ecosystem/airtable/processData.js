import * as Sentry from "@sentry/nextjs";

function getter(data, key) {
  return key ? data?.[key] : null;
}

async function mapSupportersToFields(supporters, config, tableData) {
  const {
    schema: { partnerTableColumns },
  } = config;
  const { name, url, logo } = partnerTableColumns;
  const { partners } = tableData;
  const mapped = supporters.map((id) => {
    try {
      const { fields } = partners.find((item) => id === item.id);
      return {
        name: getter(fields, name),
        website: getter(fields, url),
        logo: getter(fields, logo),
      };
    } catch (error) {
      Sentry.captureMessage(error.message);
      return null;
    }
  });
  return mapped.filter(Boolean);
}

async function mapSocialMediaToFields(socialMedia, config, tableData) {
  const {
    schema: { socialMediaTableColumns },
  } = config;
  const { name, url } = socialMediaTableColumns;
  const { socialMedia: socialMediaData } = tableData;
  const mapped = socialMedia.map((id) => {
    try {
      const { fields } = socialMediaData.find((item) => item.id === id);
      return {
        name: getter(fields, name),
        website: getter(fields, url),
      };
    } catch (error) {
      Sentry.captureMessage(error.message);
      return null;
    }
  });
  return mapped.filter(Boolean);
}

export async function processToolFromAirtable(data, config, tableData) {
  try {
    const {
      schema: { toolTableColumns },
    } = config;
    const theme = {
      en: getter(data, toolTableColumns.theme.en)?.[0],
      pt: getter(data, toolTableColumns.theme.pt)?.[0],
      fr: getter(data, toolTableColumns.theme.fr)?.[0],
    };
    const description = {
      en: getter(data, toolTableColumns.description.en),
      pt: getter(data, toolTableColumns.description.pt),
      fr: getter(data, toolTableColumns.description.fr),
    };

    const operatingCountries = getter(
      data,
      toolTableColumns.operatingCountries
    );
    const homeCountry = getter(data, toolTableColumns.homeCountry);
    const partners = await mapSupportersToFields(
      getter(data, toolTableColumns.partners) || [],
      config,
      tableData
    );
    const supporters = await mapSupportersToFields(
      getter(data, toolTableColumns.supporters) || [],
      config,
      tableData
    );
    const socialMedia = await mapSocialMediaToFields(
      getter(data, toolTableColumns.socialMedia) || [],
      config,
      tableData
    );
    const defaultData = {
      airtableId: data.id,
      avatarUrl: getter(data, toolTableColumns.avatarUrl)?.[0]?.url,
      externalId: getter(data, toolTableColumns.slug) || " ",
      repoLink: getter(data, toolTableColumns.source.url),
      name: getter(data, toolTableColumns.name),
      link: getter(data, toolTableColumns.url),
      operatingCountries,
      contributors: getter(data, toolTableColumns.contributors),
      supporters,
      partners,
      homeCountry,
      socialMedia,
    };

    return {
      en: {
        ...defaultData,
        description: description.en,
        theme: theme.en,
      },
      fr: {
        ...defaultData,
        description: description.fr,
        theme: theme.fr,
      },
      pt: {
        ...defaultData,
        description: description.pt,
        theme: theme.pt,
      },
    };
  } catch (error) {
    Sentry.captureMessage(error.message);
    return null;
  }
}

export async function processContributorFromAirtable(data, config, tableData) {
  try {
    const {
      schema: { contributorTableColumns },
    } = config;
    const socialMedia = await mapSocialMediaToFields(
      getter(data, contributorTableColumns.socialMedia) || [],
      config,
      tableData
    );
    const description = {
      en: getter(data, contributorTableColumns.description.en),
      pt: getter(data, contributorTableColumns.description.pt),
      fr: getter(data, contributorTableColumns.description.fr),
    };
    const defaultData = {
      airtableId: data.id,
      avatarUrl: getter(data, contributorTableColumns.avatarUrl)?.[0]?.url,
      externalId: getter(data, contributorTableColumns.slug),
      repoLink: `https://github.com/${getter(
        data,
        contributorTableColumns.slug
      )}`,
      socialMedia,
    };
    return {
      en: {
        ...defaultData,
        description: description.en,
      },
      fr: {
        ...defaultData,
        description: description.fr,
      },
      pt: {
        ...defaultData,
        description: description.pt,
      },
    };
  } catch (error) {
    Sentry.captureMessage(error.message);
    return null;
  }
}

export const processOrganisationFromAirTable = async (
  data,
  config,
  tableData
) => {
  try {
    const {
      schema: { organisationTableColumns },
    } = config;
    const description = {
      en: getter(data, organisationTableColumns.description.en),
      pt: getter(data, organisationTableColumns.description.pt),
      fr: getter(data, organisationTableColumns.description.fr),
    };
    const partners = await mapSupportersToFields(
      getter(data, organisationTableColumns.partners) || [],
      config,
      tableData
    );
    const supporters = await mapSupportersToFields(
      getter(data, organisationTableColumns.supporters) || [],
      config,
      tableData
    );
    const socialMedia = await mapSocialMediaToFields(
      getter(data, organisationTableColumns.socialMedia) || [],
      config,
      tableData
    );
    const tools = getter(data, organisationTableColumns.tools);

    const commonData = {
      airtableId: data.id,
      avatarUrl: getter(data, organisationTableColumns.avatarUrl)?.[0]?.url,
      externalId: getter(data, organisationTableColumns.slug),
      type: getter(data, organisationTableColumns.type),
      repoLink: getter(data, organisationTableColumns.source.url),
      supporters,
      partners,
      socialMedia,
      tools,
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
    return {
      en: {
        ...commonData,
        description: description.en,
      },
      fr: {
        ...commonData,
        description: description.fr,
      },
      pt: {
        ...commonData,
        description: description.pt,
      },
    };
  } catch (error) {
    Sentry.captureMessage(error.message);
    return null;
  }
};
